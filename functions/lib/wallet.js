"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.refundWalletOnOrderFailure = exports.redeemWalletForOrder = exports.adminAdjustWallet = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
// Sugan Wallet — store credit. All balance changes happen here (admin SDK), so
// the browser can never forge or over-spend a balance.
//
// Collections:
//   wallets/{uid}            -> { balance, updatedAt }
//   walletTransactions/{id}  -> { uid, type, amount, balanceAfter, reason, orderId?, by, createdAt }
const db = () => admin.firestore();
const ts = () => admin.firestore.FieldValue.serverTimestamp();
const round2 = (n) => Math.round(n * 100) / 100;
async function isAdminUid(uid) {
    const snap = await db().doc(`users/${uid}`).get();
    return snap.exists && snap.data()?.isAdmin === true;
}
// ---------------------------------------------------------------------------
// adminAdjustWallet — admin-only credit (+) or debit (−) of a user's wallet.
// ---------------------------------------------------------------------------
exports.adminAdjustWallet = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Sign in required');
    }
    if (!(await isAdminUid(context.auth.uid))) {
        throw new functions.https.HttpsError('permission-denied', 'Admin only');
    }
    const uid = data?.uid;
    const amount = round2(Number(data?.amount));
    const reason = (data?.reason ? String(data.reason) : '').slice(0, 200);
    if (!uid)
        throw new functions.https.HttpsError('invalid-argument', 'uid required');
    if (!Number.isFinite(amount) || amount === 0) {
        throw new functions.https.HttpsError('invalid-argument', 'amount must be a non-zero number');
    }
    const walletRef = db().doc(`wallets/${uid}`);
    let balanceAfter = 0;
    await db().runTransaction(async (tx) => {
        const snap = await tx.get(walletRef);
        const current = snap.exists ? Number(snap.data()?.balance || 0) : 0;
        const next = round2(current + amount);
        if (next < 0) {
            throw new functions.https.HttpsError('failed-precondition', `Insufficient balance: current ₹${current}, cannot subtract ₹${Math.abs(amount)}`);
        }
        balanceAfter = next;
        tx.set(walletRef, { balance: next, updatedAt: ts() }, { merge: true });
        const txn = {
            uid,
            type: amount > 0 ? 'credit' : 'debit',
            amount,
            balanceAfter: next,
            reason: reason || (amount > 0 ? 'Admin credit' : 'Admin debit'),
            by: context.auth.uid,
            createdAt: ts(),
        };
        tx.set(db().collection('walletTransactions').doc(), txn);
    });
    return { success: true, balance: balanceAfter };
});
// ---------------------------------------------------------------------------
// redeemWalletForOrder — apply the caller's wallet credit to their own pending,
// prepaid, coupon-free order. Deducts atomically; if the credit covers the whole
// order, marks it paid (nothing left for PayU). Idempotent per order.
// ---------------------------------------------------------------------------
exports.redeemWalletForOrder = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Sign in required');
    }
    const uid = context.auth.uid;
    const orderId = data?.orderId;
    const requested = round2(Number(data?.amount));
    if (!orderId)
        throw new functions.https.HttpsError('invalid-argument', 'orderId required');
    if (!Number.isFinite(requested) || requested <= 0) {
        throw new functions.https.HttpsError('invalid-argument', 'amount must be positive');
    }
    const orderRef = db().doc(`orders/${orderId}`);
    const walletRef = db().doc(`wallets/${uid}`);
    let result = { amountApplied: 0, amountToPay: 0, fullyPaid: false, balance: 0 };
    await db().runTransaction(async (tx) => {
        const orderSnap = await tx.get(orderRef);
        if (!orderSnap.exists)
            throw new functions.https.HttpsError('not-found', 'Order not found');
        const order = orderSnap.data();
        if (order.userId !== uid) {
            throw new functions.https.HttpsError('permission-denied', 'Not your order');
        }
        // Idempotent: already redeemed (e.g. retry after a flaky network call).
        if (order.walletApplied) {
            const applied = Number(order.walletApplied);
            const toPay = Number(order.amountToPay ?? round2(Number(order.total || 0) - applied));
            result = {
                amountApplied: applied,
                amountToPay: toPay,
                fullyPaid: order.paymentStatus === 'paid',
                balance: 0,
            };
            return;
        }
        if (order.paymentStatus !== 'pending') {
            throw new functions.https.HttpsError('failed-precondition', 'Order is not awaiting payment');
        }
        if (String(order.paymentMethod || '').toUpperCase() === 'COD') {
            throw new functions.https.HttpsError('failed-precondition', 'Wallet requires prepaid payment');
        }
        if (order.couponCode) {
            throw new functions.https.HttpsError('failed-precondition', 'Wallet cannot be combined with a coupon');
        }
        const orderTotal = round2(Number(order.total || 0));
        const walletSnap = await tx.get(walletRef);
        const balance = walletSnap.exists ? Number(walletSnap.data()?.balance || 0) : 0;
        const applied = round2(Math.min(requested, balance, orderTotal));
        if (applied <= 0) {
            throw new functions.https.HttpsError('failed-precondition', 'No wallet balance available to apply');
        }
        const newBalance = round2(balance - applied);
        const amountToPay = round2(orderTotal - applied);
        const fullyPaid = amountToPay <= 0;
        tx.set(walletRef, { balance: newBalance, updatedAt: ts() }, { merge: true });
        const txn = {
            uid,
            type: 'redeem',
            amount: -applied,
            balanceAfter: newBalance,
            reason: `Applied to order ${order.orderNumber || orderId}`,
            orderId,
            by: uid,
            createdAt: ts(),
        };
        tx.set(db().collection('walletTransactions').doc(), txn);
        const orderUpdate = {
            walletApplied: applied,
            amountToPay,
            updatedAt: ts(),
        };
        if (fullyPaid) {
            orderUpdate.paymentStatus = 'paid';
            orderUpdate.paymentMethod = 'Wallet';
            orderUpdate.paidAmount = 0;
            orderUpdate.paidAt = ts();
        }
        tx.update(orderRef, orderUpdate);
        result = { amountApplied: applied, amountToPay, fullyPaid, balance: newBalance };
    });
    return { success: true, ...result };
});
// ---------------------------------------------------------------------------
// refundWalletOnOrderFailure — if a wallet-applied order's payment fails or the
// order is cancelled (and it wasn't paid), return the credit to the wallet.
// ---------------------------------------------------------------------------
exports.refundWalletOnOrderFailure = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
    const before = change.after ? change.before.data() : null;
    const after = change.after.data();
    if (!before || !after)
        return;
    const walletApplied = Number(after.walletApplied || 0);
    if (walletApplied <= 0 || after.walletRefunded === true)
        return;
    if (after.paymentStatus === 'paid')
        return; // never refund a paid order
    const failedNow = (before.paymentStatus !== 'failed' && after.paymentStatus === 'failed') ||
        (before.status !== 'cancelled' && after.status === 'cancelled');
    if (!failedNow)
        return;
    const uid = after.userId;
    if (!uid)
        return;
    const orderId = context.params.orderId;
    const walletRef = db().doc(`wallets/${uid}`);
    try {
        await db().runTransaction(async (tx) => {
            const wSnap = await tx.get(walletRef);
            const bal = wSnap.exists ? Number(wSnap.data()?.balance || 0) : 0;
            const newBal = round2(bal + walletApplied);
            tx.set(walletRef, { balance: newBal, updatedAt: ts() }, { merge: true });
            const txn = {
                uid,
                type: 'refund',
                amount: walletApplied,
                balanceAfter: newBal,
                reason: `Refund — order ${after.orderNumber || orderId} payment ${after.paymentStatus === 'failed' ? 'failed' : 'cancelled'}`,
                orderId,
                by: 'system',
                createdAt: ts(),
            };
            tx.set(db().collection('walletTransactions').doc(), txn);
            tx.update(change.after.ref, { walletRefunded: true, updatedAt: ts() });
        });
        console.log(`wallet: refunded ₹${walletApplied} to ${uid} for order ${orderId}`);
    }
    catch (err) {
        console.error(`wallet: refund failed for order ${orderId}:`, err);
    }
});
//# sourceMappingURL=wallet.js.map
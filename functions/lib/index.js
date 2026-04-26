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
exports.settleMonthlyAffiliateCommissions = exports.voidAffiliateCommission = exports.mirrorAffiliateOrderOnUpdate = exports.mirrorAffiliateOrderOnCreate = exports.sendOrderCompletedEmail = exports.sendOrderPlacedEmail = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const nodemailer = __importStar(require("nodemailer"));
admin.initializeApp();
const adminEmail = 'sac280422@gmail.com';
const fromName = 'Sugan Shop';
// Transporter reads credentials from functions.config() at invocation time
function getTransporter() {
    const cfg = functions.config();
    const user = (cfg.smtp && cfg.smtp.user) ? String(cfg.smtp.user).trim() : '';
    const rawPass = (cfg.smtp && cfg.smtp.pass) ? String(cfg.smtp.pass) : '';
    const pass = rawPass.replace(/\s+/g, '');
    console.log(`SMTP config — user set: ${!!user} (len=${user.length}), pass set: ${!!pass} (len=${pass.length})`);
    return nodemailer.createTransport({
        service: 'gmail',
        auth: user && pass ? { user, pass } : undefined,
    });
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
    }).format(amount);
}
function formatAddress(addr) {
    if (!addr)
        return 'N/A';
    const parts = [
        addr.fullName,
        addr.addressLine1,
        addr.addressLine2,
        addr.landmark,
        `${addr.city}, ${addr.state} - ${addr.pincode}`,
        `Phone: ${addr.phone}`,
    ].filter(Boolean);
    return parts.join('\n');
}
function buildItemsTable(items) {
    if (!items || items.length === 0)
        return '<p>No items</p>';
    const rows = items
        .map((item) => `
    <tr>
      <td style="padding:8px;border:1px solid #ddd;">${item.name || item.productId}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatCurrency(item.price)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `)
        .join('');
    return `
    <table style="border-collapse:collapse;width:100%;margin-top:12px;font-size:14px;">
      <thead>
        <tr style="background:#f5f5f5;">
          <th style="padding:8px;border:1px solid #ddd;text-align:left;">Product</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:center;">Qty</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:right;">Price</th>
          <th style="padding:8px;border:1px solid #ddd;text-align:right;">Total</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}
async function sendMail({ to, subject, html, }) {
    const cfg = functions.config();
    const user = (cfg.smtp && cfg.smtp.user) ? cfg.smtp.user : 'contact@sugan.shop';
    await getTransporter().sendMail({
        from: `"${fromName}" <${user}>`,
        to,
        subject,
        html,
    });
}
exports.sendOrderPlacedEmail = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
    var _a, _b;
    const orderId = context.params.orderId;
    const data = snap.data();
    const orderRef = data.orderNumber || orderId.slice(-8).toUpperCase();
    const customerName = ((_a = data.shippingAddress) === null || _a === void 0 ? void 0 : _a.fullName) || 'Customer';
    // --- Admin notification ---
    const adminSubject = `🛒 New Order Placed — ${orderRef}`;
    const adminHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
        <h2 style="color:#5D4037;">New Order Received</h2>
        <p>A new order has been placed on <strong>Sugan Shop</strong>.</p>

        <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Order ID</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${orderId}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Order Number</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${data.orderNumber || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Customer Email</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${data.userEmail || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Payment Method</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${data.paymentMethod || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Payment Status</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${data.paymentStatus || 'N/A'}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Subtotal</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${formatCurrency(data.subtotal || 0)}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Shipping</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${formatCurrency(data.shipping || 0)}</td></tr>
          <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>COD Charge</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${formatCurrency(data.codCharge || 0)}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Grand Total</strong></td><td style="padding:6px 0;"><strong>${formatCurrency(data.total || 0)}</strong></td></tr>
        </table>

        <h3 style="color:#5D4037;margin-top:24px;">Items Ordered</h3>
        ${buildItemsTable(data.items || [])}

        <h3 style="color:#5D4037;margin-top:24px;">Shipping Address</h3>
        <pre style="background:#f9f9f9;padding:12px;border-radius:6px;font-family:Arial,sans-serif;white-space:pre-wrap;">${formatAddress(data.shippingAddress)}</pre>

        <p style="margin-top:24px;font-size:12px;color:#888;">
          Order time: ${((_b = data.createdAt) === null || _b === void 0 ? void 0 : _b.toDate().toLocaleString('en-IN')) || new Date().toLocaleString('en-IN')}
        </p>
      </div>
    `;
    // --- Customer confirmation email ---
    const isCOD = (data.paymentMethod || '').toUpperCase() === 'COD';
    const customerSubject = `Your Sugan order is confirmed — ${orderRef}`;
    const customerHtml = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;background:#fffdf8;padding:32px;border-radius:12px;">

        <div style="text-align:center;margin-bottom:32px;">
          <h1 style="font-size:28px;color:#5D4037;margin:0;letter-spacing:1px;">SUGAN</h1>
          <p style="color:#9E7A5A;font-size:13px;margin:4px 0 0;">Handcrafted for your home</p>
        </div>

        <h2 style="color:#2E7D32;font-size:22px;margin-bottom:8px;">Thank you, ${customerName}!</h2>
        <p style="font-size:15px;color:#555;line-height:1.6;">
          Your order has been placed successfully and is now being processed.
          We'll ship it within <strong>2–3 business days</strong> and it will reach you in <strong>5–7 days</strong>.
        </p>

        <div style="background:#fff;border:1px solid #e8ddd0;border-radius:8px;padding:16px;margin:24px 0;">
          <p style="margin:0 0 4px;font-size:13px;color:#888;">ORDER NUMBER</p>
          <p style="margin:0;font-size:20px;font-weight:bold;color:#5D4037;letter-spacing:1px;">${orderRef}</p>
        </div>

        <h3 style="color:#5D4037;margin:24px 0 12px;">Your Items</h3>
        ${buildItemsTable(data.items || [])}

        <table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:14px;">
          <tr>
            <td style="padding:6px 0;border-bottom:1px solid #eee;color:#777;">Subtotal</td>
            <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(data.subtotal || 0)}</td>
          </tr>
          ${(data.discount || 0) > 0 ? `
          <tr>
            <td style="padding:6px 0;border-bottom:1px solid #eee;color:#2E7D32;">Discount${data.couponCode ? ` (${data.couponCode})` : ''}</td>
            <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;color:#2E7D32;">−${formatCurrency(data.discount || 0)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:6px 0;border-bottom:1px solid #eee;color:#777;">Shipping</td>
            <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">${(data.shipping || 0) === 0 ? 'FREE' : formatCurrency(data.shipping || 0)}</td>
          </tr>
          ${isCOD && (data.codCharge || 0) > 0 ? `
          <tr>
            <td style="padding:6px 0;border-bottom:1px solid #eee;color:#777;">COD Fee</td>
            <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">${formatCurrency(data.codCharge || 0)}</td>
          </tr>` : ''}
          <tr>
            <td style="padding:10px 0 0;font-weight:bold;font-size:16px;color:#5D4037;">Total</td>
            <td style="padding:10px 0 0;text-align:right;font-weight:bold;font-size:16px;color:#5D4037;">${formatCurrency(data.total || 0)}</td>
          </tr>
        </table>

        <h3 style="color:#5D4037;margin:24px 0 8px;">Delivering To</h3>
        <div style="background:#f9f9f9;padding:12px;border-radius:6px;font-size:14px;line-height:1.7;color:#555;">
          ${formatAddress(data.shippingAddress).replace(/\n/g, '<br>')}
        </div>

        ${isCOD ? `
        <div style="background:#FFF8E1;border:1px solid #FFE082;border-radius:8px;padding:14px;margin:20px 0;">
          <p style="margin:0;font-size:14px;color:#795548;">
            <strong>Cash on Delivery:</strong> Please keep ${formatCurrency(data.total || 0)} ready at the time of delivery.
          </p>
        </div>` : `
        <div style="background:#E8F5E9;border:1px solid #A5D6A7;border-radius:8px;padding:14px;margin:20px 0;">
          <p style="margin:0;font-size:14px;color:#2E7D32;">
            <strong>Payment received.</strong> Your order is confirmed and will be dispatched soon.
          </p>
        </div>`}

        <p style="font-size:14px;color:#555;line-height:1.6;margin-top:24px;">
          Questions? Reply to this email or reach us at
          <a href="mailto:contact@sugan.shop" style="color:#9E7A5A;">contact@sugan.shop</a>.
        </p>

        <hr style="border:none;border-top:1px solid #e8ddd0;margin:24px 0;">
        <p style="font-size:12px;color:#aaa;text-align:center;">
          Sugan Shop · Handcrafted in Jodhpur, Rajasthan · sugan.shop
        </p>
      </div>
    `;
    try {
        const sends = [sendMail({ to: adminEmail, subject: adminSubject, html: adminHtml })];
        if (data.userEmail) {
            sends.push(sendMail({ to: data.userEmail, subject: customerSubject, html: customerHtml }));
        }
        await Promise.all(sends);
        console.log(`Order placed emails sent for order ${orderId}`);
    }
    catch (error) {
        console.error(`Failed to send order placed email for ${orderId}:`, error);
    }
});
exports.sendOrderCompletedEmail = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
    var _a;
    const orderId = context.params.orderId;
    const before = change.before.data();
    const after = change.after.data();
    const completedStatuses = ['paid', 'cod_pending'];
    const wasPending = before.paymentStatus === 'pending';
    const isNowCompleted = completedStatuses.includes(after.paymentStatus || '');
    if (!wasPending || !isNowCompleted) {
        return;
    }
    try {
        const subject = `✅ Order Confirmed — ${after.orderNumber || orderId.slice(-8).toUpperCase()}`;
        const html = `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
          <h2 style="color:#2E7D32;">Order Payment Received</h2>
          <p>Payment for order <strong>${after.orderNumber || orderId.slice(-8).toUpperCase()}</strong> has been confirmed and is ready to ship.</p>

          <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
            <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Order ID</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${orderId}</td></tr>
            <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Order Number</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${after.orderNumber || 'N/A'}</td></tr>
            <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Customer Email</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${after.userEmail || 'N/A'}</td></tr>
            <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Payment Method</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${after.paymentMethod || 'N/A'}</td></tr>
            <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Paid Amount</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>${formatCurrency(after.total || 0)}</strong></td></tr>
            <tr><td style="padding:6px 0;"><strong>Paid At</strong></td><td style="padding:6px 0;">${((_a = after.paidAt) === null || _a === void 0 ? void 0 : _a.toDate().toLocaleString('en-IN')) || new Date().toLocaleString('en-IN')}</td></tr>
          </table>

          <h3 style="color:#5D4037;margin-top:24px;">Items Ordered</h3>
          ${buildItemsTable(after.items || [])}

          <h3 style="color:#5D4037;margin-top:24px;">Shipping Address</h3>
          <pre style="background:#f9f9f9;padding:12px;border-radius:6px;font-family:Arial,sans-serif;white-space:pre-wrap;">${formatAddress(after.shippingAddress)}</pre>

          <p style="margin-top:24px;font-size:12px;color:#888;">
            Please prepare this order for shipment.
          </p>
        </div>
      `;
        await sendMail({ to: adminEmail, subject, html });
        console.log(`Order confirmed email sent for order ${orderId}`);
    }
    catch (error) {
        console.error(`Failed to send order confirmed email for ${orderId}:`, error);
    }
});
// ============================================================================
// Affiliate / referral system
// ============================================================================
const RETURN_WINDOW_DAYS = 7;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
function commissionMonthKey(date) {
    // YYYY-MM in IST so the rollup buckets line up with calendar months locally
    const ist = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
    return `${ist.getUTCFullYear()}-${String(ist.getUTCMonth() + 1).padStart(2, '0')}`;
}
function summarizeItems(items) {
    if (!items || items.length === 0)
        return { count: 0, summary: '0 items' };
    const count = items.reduce((s, it) => s + (it.quantity || 0), 0);
    return { count, summary: `${count} item${count === 1 ? '' : 's'}` };
}
// 1. Mirror affiliate orders on create — also bumps the code's totals
exports.mirrorAffiliateOrderOnCreate = functions.firestore
    .document('orders/{orderId}')
    .onCreate(async (snap, context) => {
    const orderId = context.params.orderId;
    const data = snap.data();
    if (!data.affiliateCode || !data.affiliateEmail)
        return;
    const code = String(data.affiliateCode).toUpperCase();
    const commission = Number(data.affiliateCommissionAmount || 0);
    const { count, summary } = summarizeItems(data.items);
    const mirrorRef = admin.firestore().doc(`affiliateOrders/${orderId}`);
    const codeRef = admin.firestore().doc(`affiliateCodes/${code}`);
    await admin.firestore().runTransaction(async (tx) => {
        tx.set(mirrorRef, {
            orderId,
            orderNumber: data.orderNumber || orderId.slice(-8).toUpperCase(),
            affiliateCode: code,
            affiliateEmail: data.affiliateEmail,
            status: data.status || 'pending',
            paymentStatus: data.paymentStatus || 'pending',
            itemCount: count,
            itemsSummary: summary,
            commissionAmount: commission,
            commissionVoided: false,
            eligibilityDate: null,
            commissionMonth: null,
            deliveredAt: null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        tx.set(codeRef, {
            totalOrders: admin.firestore.FieldValue.increment(1),
            totalCommissionAccrued: admin.firestore.FieldValue.increment(commission),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    });
    console.log(`affiliate: mirrored new order ${orderId} for ${code}`);
});
// 2. Mirror affiliate orders on update — keeps status/payment/delivery in sync
exports.mirrorAffiliateOrderOnUpdate = functions.firestore
    .document('orders/{orderId}')
    .onUpdate(async (change, context) => {
    const orderId = context.params.orderId;
    const before = change.before.data();
    const after = change.after.data();
    if (!after.affiliateCode || !after.affiliateEmail)
        return;
    const mirrorRef = admin.firestore().doc(`affiliateOrders/${orderId}`);
    const updates = {
        status: after.status || 'pending',
        paymentStatus: after.paymentStatus || 'pending',
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };
    // First-time delivery → stamp deliveredAt + compute eligibility/month
    const becameDelivered = before.status !== 'delivered' && after.status === 'delivered';
    if (becameDelivered && !after.deliveredAt) {
        const now = new Date();
        const eligibility = new Date(now.getTime() + RETURN_WINDOW_DAYS * MS_PER_DAY);
        updates.deliveredAt = admin.firestore.Timestamp.fromDate(now);
        updates.eligibilityDate = admin.firestore.Timestamp.fromDate(eligibility);
        updates.commissionMonth = commissionMonthKey(eligibility);
        // Also stamp on the source order so it's queryable
        await change.after.ref.update({
            deliveredAt: admin.firestore.Timestamp.fromDate(now),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }
    else if (after.deliveredAt && (!before.deliveredAt || becameDelivered)) {
        // Backfill if deliveredAt is on the order but not yet on the mirror
        const deliveredDate = after.deliveredAt.toDate();
        const eligibility = new Date(deliveredDate.getTime() + RETURN_WINDOW_DAYS * MS_PER_DAY);
        updates.deliveredAt = after.deliveredAt;
        updates.eligibilityDate = admin.firestore.Timestamp.fromDate(eligibility);
        updates.commissionMonth = commissionMonthKey(eligibility);
    }
    await mirrorRef.set(updates, { merge: true });
});
// 3. voidAffiliateCommission — admin-only callable
exports.voidAffiliateCommission = functions.https.onCall(async (data, context) => {
    var _a;
    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'Sign in required');
    }
    const callerSnap = await admin.firestore().doc(`users/${context.auth.uid}`).get();
    if (!callerSnap.exists || ((_a = callerSnap.data()) === null || _a === void 0 ? void 0 : _a.isAdmin) !== true) {
        throw new functions.https.HttpsError('permission-denied', 'Admin only');
    }
    const orderId = data === null || data === void 0 ? void 0 : data.orderId;
    const reason = (data === null || data === void 0 ? void 0 : data.reason) || '';
    if (!orderId)
        throw new functions.https.HttpsError('invalid-argument', 'orderId required');
    const mirrorRef = admin.firestore().doc(`affiliateOrders/${orderId}`);
    const mirrorSnap = await mirrorRef.get();
    if (!mirrorSnap.exists) {
        throw new functions.https.HttpsError('not-found', 'Affiliate order not found');
    }
    const mirror = mirrorSnap.data();
    if (mirror.commissionVoided === true) {
        return { success: true, alreadyVoided: true };
    }
    const code = String(mirror.affiliateCode).toUpperCase();
    const amount = Number(mirror.commissionAmount || 0);
    await admin.firestore().runTransaction(async (tx) => {
        tx.update(mirrorRef, {
            commissionVoided: true,
            voidReason: reason,
            voidedAt: admin.firestore.FieldValue.serverTimestamp(),
            voidedBy: context.auth.uid,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        tx.set(admin.firestore().doc(`affiliateCodes/${code}`), {
            totalCommissionAccrued: admin.firestore.FieldValue.increment(-amount),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
    });
    // If the rollup for this commissionMonth already exists, recompute it.
    if (mirror.commissionMonth && mirror.affiliateEmail) {
        await recomputeMonthlyRollup(mirror.affiliateEmail, mirror.commissionMonth);
    }
    return { success: true };
});
async function recomputeMonthlyRollup(email, month) {
    const monthlyRef = admin.firestore()
        .doc(`affiliateMonthly/${email}/months/${month}`);
    const existing = await monthlyRef.get();
    if (!existing.exists)
        return; // not yet settled — settlement function will compute later
    const snap = await admin.firestore()
        .collection('affiliateOrders')
        .where('affiliateEmail', '==', email)
        .where('commissionMonth', '==', month)
        .get();
    let ordersDelivered = 0;
    let ordersSuccessful = 0;
    let commissionTotal = 0;
    for (const d of snap.docs) {
        const o = d.data();
        if (o.status === 'delivered')
            ordersDelivered += 1;
        if (!o.commissionVoided) {
            ordersSuccessful += 1;
            commissionTotal += Number(o.commissionAmount || 0);
        }
    }
    await monthlyRef.set({
        ordersDelivered,
        ordersSuccessful,
        commissionTotal,
        netPayable: commissionTotal,
        recomputedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
}
// 4. settleMonthlyAffiliateCommissions — runs on the 1st of each month at 00:05 IST
exports.settleMonthlyAffiliateCommissions = functions.pubsub
    .schedule('5 0 1 * *')
    .timeZone('Asia/Kolkata')
    .onRun(async () => {
    // Compute the previous month's key (in IST)
    const now = new Date();
    const istNow = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    const prevMonth = new Date(Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth() - 1, 1));
    const monthKey = `${prevMonth.getUTCFullYear()}-${String(prevMonth.getUTCMonth() + 1).padStart(2, '0')}`;
    const snap = await admin.firestore()
        .collection('affiliateOrders')
        .where('commissionMonth', '==', monthKey)
        .get();
    // Group by affiliate email
    const byEmail = {};
    for (const d of snap.docs) {
        const o = d.data();
        const email = o.affiliateEmail;
        if (!email)
            continue;
        if (!byEmail[email]) {
            byEmail[email] = { ordersDelivered: 0, ordersSuccessful: 0, commissionTotal: 0 };
        }
        if (o.status === 'delivered')
            byEmail[email].ordersDelivered += 1;
        if (!o.commissionVoided) {
            byEmail[email].ordersSuccessful += 1;
            byEmail[email].commissionTotal += Number(o.commissionAmount || 0);
        }
    }
    const writes = [];
    for (const [email, totals] of Object.entries(byEmail)) {
        const ref = admin.firestore().doc(`affiliateMonthly/${email}/months/${monthKey}`);
        writes.push(ref.set({
            email,
            month: monthKey,
            ordersDelivered: totals.ordersDelivered,
            ordersSuccessful: totals.ordersSuccessful,
            commissionTotal: totals.commissionTotal,
            netPayable: totals.commissionTotal,
            status: 'pending',
            settledAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true }));
        // Notify admin and the affiliate
        writes.push(sendMail({
            to: adminEmail,
            subject: `Affiliate payout due — ${email} — ${monthKey}`,
            html: `
          <p>Settlement for <strong>${email}</strong> for <strong>${monthKey}</strong>:</p>
          <ul>
            <li>Successful orders: ${totals.ordersSuccessful}</li>
            <li>Commission total: ${formatCurrency(totals.commissionTotal)}</li>
          </ul>
          <p>Mark as paid in the Admin → Affiliates panel after the transfer.</p>
        `,
        }).catch((e) => console.error('admin payout email failed:', e)));
        writes.push(sendMail({
            to: email,
            subject: `Your Sugan affiliate earnings — ${monthKey}`,
            html: `
          <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#333;">
            <h2 style="color:#5D4037;">Your ${monthKey} earnings are ready</h2>
            <p>Hi! Here's your settlement summary for ${monthKey}:</p>
            <ul>
              <li>Successful orders (delivered + return window passed): <strong>${totals.ordersSuccessful}</strong></li>
              <li>Total commission: <strong>${formatCurrency(totals.commissionTotal)}</strong></li>
            </ul>
            <p>You'll receive your payout from us shortly. View live numbers anytime at
            <a href="https://sugan.shop/affiliate">sugan.shop/affiliate</a>.</p>
            <p style="color:#888;font-size:12px;">Sugan Shop · Handcrafted in Jodhpur</p>
          </div>
        `,
        }).catch((e) => console.error(`affiliate payout email to ${email} failed:`, e)));
    }
    await Promise.all(writes);
    console.log(`affiliate: settled ${Object.keys(byEmail).length} affiliates for ${monthKey}`);
    return null;
});
//# sourceMappingURL=index.js.map
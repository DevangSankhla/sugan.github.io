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
exports.sendOrderCompletedEmail = exports.sendOrderPlacedEmail = void 0;
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
    var _a;
    const orderId = context.params.orderId;
    const data = snap.data();
    try {
        const subject = `🛒 New Order Placed — ${data.orderNumber || orderId.slice(-8).toUpperCase()}`;
        const html = `
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
            Order time: ${((_a = data.createdAt) === null || _a === void 0 ? void 0 : _a.toDate().toLocaleString('en-IN')) || new Date().toLocaleString('en-IN')}
          </p>
        </div>
      `;
        await sendMail({ to: adminEmail, subject, html });
        console.log(`Order placed email sent for order ${orderId}`);
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
//# sourceMappingURL=index.js.map
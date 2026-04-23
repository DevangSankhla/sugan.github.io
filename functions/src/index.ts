import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER || '';
const smtpPass = process.env.SMTP_PASS || '';
const adminEmail = process.env.ADMIN_EMAIL || 'sac280422@gmail.com';
const fromName = process.env.FROM_NAME || 'Sugan Shop';
const fromEmail = process.env.FROM_EMAIL || smtpUser || 'contact@sugan.shop';

const transporter = nodemailer.createTransport({
  host: smtpHost,
  port: smtpPort,
  secure: smtpSecure,
  auth: smtpUser && smtpPass ? { user: smtpUser, pass: smtpPass } : undefined,
});

transporter.verify().catch((err) => {
  console.error('SMTP verification failed:', err.message);
});

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
}

function formatAddress(addr: any): string {
  if (!addr) return 'N/A';
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

function buildItemsTable(items: any[]): string {
  if (!items || items.length === 0) return '<p>No items</p>';

  const rows = items
    .map(
      (item) => `
    <tr>
      <td style="padding:8px;border:1px solid #ddd;">${item.name || item.productId}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:center;">${item.quantity}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatCurrency(item.price)}</td>
      <td style="padding:8px;border:1px solid #ddd;text-align:right;">${formatCurrency(item.price * item.quantity)}</td>
    </tr>
  `
    )
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

interface OrderData {
  orderNumber?: string;
  userEmail?: string;
  userId?: string;
  items?: any[];
  subtotal?: number;
  shipping?: number;
  codCharge?: number;
  total?: number;
  paymentMethod?: string;
  paymentStatus?: string;
  shippingAddress?: any;
  txnid?: string | null;
  createdAt?: admin.firestore.Timestamp;
  paidAt?: admin.firestore.Timestamp;
}

async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
  });
}

export const sendOrderPlacedEmail = functions
  .runWith({ secrets: ['SMTP_USER', 'SMTP_PASS'] })
  .firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const orderId = context.params.orderId;
    const data = snap.data() as OrderData;

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
            Order time: ${data.createdAt?.toDate().toLocaleString('en-IN') || new Date().toLocaleString('en-IN')}
          </p>
        </div>
      `;

      await sendMail({ to: adminEmail, subject, html });
      console.log(`Order placed email sent for order ${orderId}`);
    } catch (error) {
      console.error(`Failed to send order placed email for ${orderId}:`, error);
    }
  });

export const sendOrderCompletedEmail = functions
  .runWith({ secrets: ['SMTP_USER', 'SMTP_PASS'] })
  .firestore
  .document('orders/{orderId}')
  .onUpdate(async (change, context) => {
    const orderId = context.params.orderId;
    const before = change.before.data() as OrderData;
    const after = change.after.data() as OrderData;

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
            <tr><td style="padding:6px 0;"><strong>Paid At</strong></td><td style="padding:6px 0;">${after.paidAt?.toDate().toLocaleString('en-IN') || new Date().toLocaleString('en-IN')}</td></tr>
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
    } catch (error) {
      console.error(`Failed to send order confirmed email for ${orderId}:`, error);
    }
  });

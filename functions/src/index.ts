import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

const adminEmail = 'sac280422@gmail.com';
const fromName = 'Sugan Shop';

// Transporter reads credentials from functions.config() at invocation time
function getTransporter() {
  const cfg = functions.config();
  const user: string = (cfg.smtp && cfg.smtp.user) ? String(cfg.smtp.user).trim() : '';
  const rawPass: string = (cfg.smtp && cfg.smtp.pass) ? String(cfg.smtp.pass) : '';
  const pass = rawPass.replace(/\s+/g, '');
  console.log(`SMTP config — user set: ${!!user} (len=${user.length}), pass set: ${!!pass} (len=${pass.length})`);
  return nodemailer.createTransport({
    service: 'gmail',
    auth: user && pass ? { user, pass } : undefined,
  });
}

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
  discount?: number;
  couponCode?: string;
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
  const cfg = functions.config();
  const user: string = (cfg.smtp && cfg.smtp.user) ? cfg.smtp.user : 'contact@sugan.shop';
  await getTransporter().sendMail({
    from: `"${fromName}" <${user}>`,
    to,
    subject,
    html,
  });
}

export const sendOrderPlacedEmail = functions.firestore
  .document('orders/{orderId}')
  .onCreate(async (snap, context) => {
    const orderId = context.params.orderId;
    const data = snap.data() as OrderData;
    const orderRef = data.orderNumber || orderId.slice(-8).toUpperCase();
    const customerName = data.shippingAddress?.fullName || 'Customer';

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
          Order time: ${data.createdAt?.toDate().toLocaleString('en-IN') || new Date().toLocaleString('en-IN')}
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
      const sends: Promise<void>[] = [sendMail({ to: adminEmail, subject: adminSubject, html: adminHtml })];
      if (data.userEmail) {
        sends.push(sendMail({ to: data.userEmail, subject: customerSubject, html: customerHtml }));
      }
      await Promise.all(sends);
      console.log(`Order placed emails sent for order ${orderId}`);
    } catch (error) {
      console.error(`Failed to send order placed email for ${orderId}:`, error);
    }
  });

export const sendOrderCompletedEmail = functions.firestore
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

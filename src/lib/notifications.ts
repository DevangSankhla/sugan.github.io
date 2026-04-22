const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

interface OrderNotificationData {
  to: string;
  orderId: string;
  orderNumber?: string;
  customerName: string;
  total: number;
  items: { name: string; price: number; quantity: number }[];
  paymentMethod: string;
}

export async function sendOrderEmail(data: OrderNotificationData): Promise<void> {
  if (!API_BASE_URL) {
    console.log('API_BASE_URL not set, skipping email notification');
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/notify/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    if (!result.success) {
      console.error('Email notification failed:', result.message);
    }
  } catch (err) {
    console.error('Failed to send email notification:', err);
  }
}

export function getWhatsAppOrderLink(orderId: string, customerName: string, userEmail?: string | null): string {
  const text = `Hi, I just placed an order on Sugan. Please confirm my order status.%0A%0AOrder ID: ${orderId.slice(-8).toUpperCase()}%0AName: ${customerName}%0AEmail: ${userEmail || ''}`;
  return `https://wa.me/916367677255?text=${text}`;
}

// PayU Payment Gateway Integration
// Documentation: https://devguide.payu.in/

import { db } from './firebase';
import { doc, updateDoc, getDoc, collection, serverTimestamp, runTransaction } from 'firebase/firestore';
import SHA512 from 'crypto-js/sha512';

const PAYU_KEY = import.meta.env.VITE_PAYU_MERCHANT_KEY || 'zvbkji';
const PAYU_SALT = import.meta.env.VITE_PAYU_SALT || 'tdqgzgOQZ5HlWxVa0AL7FVs06pammfvC';
const PAYU_BASE_URL = import.meta.env.VITE_PAYU_BASE_URL || 'https://secure.payu.in/_payment';

interface PayUTransaction {
  key: string;
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  phone: string;
  surl: string; // Success URL
  furl: string; // Failure URL
  curl: string; // Cancel URL
  hash: string;
  udf1?: string; // Custom field - orderId
  udf2?: string; // Custom field - userId
}

interface PayUResponse {
  status: 'success' | 'failure' | 'pending';
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  hash: string;
  udf1?: string;
  udf2?: string;
  udf3?: string;
  udf4?: string;
  udf5?: string;
  error?: string;
  error_Message?: string;
}

// Generate unique transaction ID
export function generateTxnId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `TXN${timestamp}${random}`.toUpperCase();
}

// Generate PayU hash
// Hash sequence: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
export function generateHash(params: {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
  udf1?: string;
  udf2?: string;
}): string {
  const hashString = [
    PAYU_KEY,
    params.txnid,
    params.amount,
    params.productinfo,
    params.firstname,
    params.email,
    params.udf1 || '',
    params.udf2 || '',
    '', // udf3
    '', // udf4
    '', // udf5
    '', // udf6
    '', // udf7
    '', // udf8
    '', // udf9
    '', // udf10
    PAYU_SALT
  ].join('|');

  // Generate SHA512 hash as required by PayU
  return SHA512(hashString).toString();
}

// Verify PayU response hash
export function verifyResponseHash(response: PayUResponse): boolean {
  const hashString = [
    PAYU_SALT,
    response.status,
    '', // Additional charge (optional)
    response.udf1 || '',
    response.udf2 || '',
    response.udf3 || '',
    response.udf4 || '',
    response.udf5 || '',
    '', // udf6
    '', // udf7
    '', // udf8
    '', // udf9
    '', // udf10
    response.email,
    response.firstname,
    response.productinfo,
    response.amount,
    response.txnid,
    PAYU_KEY
  ].join('|');

  const calculatedHash = SHA512(hashString).toString();
  return calculatedHash === response.hash;
}

// Prepare PayU form data
export function preparePayUForm(orderData: {
  orderId: string;
  userId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  productInfo: string;
}): PayUTransaction {
  const txnid = generateTxnId();
  
  const formData = {
    key: PAYU_KEY,
    txnid,
    amount: orderData.amount.toFixed(2),
    productinfo: orderData.productInfo,
    firstname: orderData.customerName,
    email: orderData.customerEmail,
    phone: orderData.customerPhone,
    surl: `${window.location.origin}/payment/success?orderId=${orderData.orderId}`,
    furl: `${window.location.origin}/payment/failure?orderId=${orderData.orderId}`,
    curl: `${window.location.origin}/payment/cancel`,
    udf1: orderData.orderId,
    udf2: orderData.userId,
    hash: '' // Will be generated
  };

  formData.hash = generateHash({
    txnid,
    amount: formData.amount,
    productinfo: formData.productinfo,
    firstname: formData.firstname,
    email: formData.email,
    udf1: formData.udf1,
    udf2: formData.udf2
  });

  return formData;
}

// Submit payment to PayU
export function submitPayUPayment(formData: PayUTransaction): void {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = PAYU_BASE_URL;
  form.style.display = 'none';

  Object.entries(formData).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    }
  });

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
}

// Process Cash on Delivery
export async function processCOD(orderId: string): Promise<void> {
  const orderRef = doc(db, 'orders', orderId);
  await updateDoc(orderRef, {
    paymentStatus: 'cod_pending',
    paymentMethod: 'COD',
    updatedAt: serverTimestamp()
  });
}

// Handle payment success
export async function handlePaymentSuccess(response: PayUResponse): Promise<boolean> {
  try {
    const orderId = response.udf1;
    if (!orderId) return false;

    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      paymentStatus: 'paid',
      paymentMethod: 'PayU',
      txnid: response.txnid,
      paidAmount: parseFloat(response.amount),
      paidAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return true;
  } catch (error) {
    console.error('Payment success handling error:', error);
    return false;
  }
}

// Handle payment failure
export async function handlePaymentFailure(response: PayUResponse): Promise<void> {
  try {
    const orderId = response.udf1;
    if (!orderId) return;

    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      paymentStatus: 'failed',
      paymentMethod: 'PayU',
      txnid: response.txnid,
      errorMessage: response.error_Message || response.error,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Payment failure handling error:', error);
  }
}

// Get order details
export async function getOrderDetails(orderId: string) {
  const orderRef = doc(db, 'orders', orderId);
  const orderSnap = await getDoc(orderRef);
  
  if (orderSnap.exists()) {
    return { id: orderSnap.id, ...orderSnap.data() };
  }
  return null;
}

// Create order in Firestore with sequential SO# order number
export async function createOrder(orderData: any): Promise<string> {
  const counterRef = doc(db, 'counters', 'orders');
  const newOrderRef = doc(collection(db, 'orders'));

  await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);
    const nextCount = (counterSnap.exists() ? (counterSnap.data().count as number) : 0) + 1;
    transaction.set(counterRef, { count: nextCount }, { merge: true });
    transaction.set(newOrderRef, {
      ...orderData,
      orderNumber: `SO#${nextCount}`,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });

  return newOrderRef.id;
}

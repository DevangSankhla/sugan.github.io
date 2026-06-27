// Client helpers for the Sugan Wallet. Balances are read-only on the client;
// all mutations go through Cloud Functions (see functions/src/wallet.ts).

import { httpsCallable } from 'firebase/functions';
import {
  doc,
  onSnapshot,
  collection,
  query,
  where,
  orderBy,
  limit as fbLimit,
} from 'firebase/firestore';
import { functions, db } from './firebase';
import type { FirestoreTimestamp } from '@/types';

export interface WalletTransaction {
  id: string;
  uid: string;
  type: 'credit' | 'debit' | 'redeem' | 'refund';
  amount: number;
  balanceAfter: number;
  reason: string;
  by: string;
  orderId?: string;
  createdAt?: FirestoreTimestamp;
}

export interface RedeemResult {
  success: boolean;
  amountApplied: number;
  amountToPay: number;
  fullyPaid: boolean;
  balance: number;
}

// Admin-only: credit (+) or debit (−) a user's wallet.
export const adminAdjustWallet = httpsCallable<
  { uid: string; amount: number; reason: string },
  { success: boolean; balance: number }
>(functions, 'adminAdjustWallet');

// Apply the caller's wallet credit to their own pending prepaid order.
export const redeemWalletForOrder = httpsCallable<
  { orderId: string; amount: number },
  RedeemResult
>(functions, 'redeemWalletForOrder');

/** Subscribe to a user's wallet balance. Returns an unsubscribe function. */
export function subscribeWalletBalance(uid: string, cb: (balance: number) => void): () => void {
  return onSnapshot(
    doc(db, 'wallets', uid),
    (snap) => cb(snap.exists() ? Number(snap.data().balance || 0) : 0),
    () => cb(0),
  );
}

/** Subscribe to a user's recent wallet transactions (newest first). */
export function subscribeWalletTransactions(
  uid: string,
  cb: (txns: WalletTransaction[]) => void,
  max = 15,
): () => void {
  const q = query(
    collection(db, 'walletTransactions'),
    where('uid', '==', uid),
    orderBy('createdAt', 'desc'),
    fbLimit(max),
  );
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<WalletTransaction, 'id'>) }))),
    () => cb([]),
  );
}

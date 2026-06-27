import { useEffect, useState } from 'react';
import { Wallet, Plus, Minus } from 'lucide-react';
import { subscribeWalletBalance, adminAdjustWallet } from '@/lib/wallet';
import { getErrorMessage } from '@/lib/utils';

// Admin-only control to view and adjust a user's Sugan Wallet balance.
// All changes go through the adminAdjustWallet Cloud Function.
export default function AdminWalletControl({ uid }: { uid: string }) {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  useEffect(() => subscribeWalletBalance(uid, setBalance), [uid]);

  const adjust = async (sign: 1 | -1) => {
    const amt = Math.round(Number(amount) * 100) / 100;
    if (!Number.isFinite(amt) || amt <= 0) {
      setMsg({ type: 'err', text: 'Enter a positive amount' });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      await adminAdjustWallet({ uid, amount: sign * amt, reason: reason.trim() });
      setAmount('');
      setReason('');
      setMsg({ type: 'ok', text: `${sign > 0 ? 'Added' : 'Subtracted'} ₹${amt.toLocaleString('en-IN')}` });
    } catch (err) {
      setMsg({ type: 'err', text: getErrorMessage(err, 'Could not update wallet') });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 pt-3 border-t border-sugan-ink/10">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-sm font-body text-sugan-ink/70">
          <Wallet className="w-4 h-4 text-sugan-gold" /> Wallet
        </span>
        <span className="font-body font-medium text-sugan-ink tabular-nums">
          ₹{balance.toLocaleString('en-IN')}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="number"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="w-full sm:w-28 px-3 py-2 border border-sugan-ink/20 rounded-lg font-body text-sm focus:outline-none focus:border-sugan-gold tabular-nums"
        />
        <input
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
          className="flex-1 px-3 py-2 border border-sugan-ink/20 rounded-lg font-body text-sm focus:outline-none focus:border-sugan-gold"
        />
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => adjust(1)}
            className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg font-body text-sm hover:bg-green-700 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
          <button
            type="button"
            disabled={busy}
            onClick={() => adjust(-1)}
            className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg font-body text-sm hover:bg-red-700 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" /> Subtract
          </button>
        </div>
      </div>
      {msg && (
        <p className={`text-xs font-body mt-2 ${msg.type === 'ok' ? 'text-green-600' : 'text-red-600'}`}>
          {msg.text}
        </p>
      )}
    </div>
  );
}

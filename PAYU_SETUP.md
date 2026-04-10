# PayU Payment Gateway Setup Guide

## Step 1: Get PayU Credentials

1. Go to https://dashboard.payu.in and sign up/login
2. Complete your KYC verification (required for live payments)
3. Navigate to **Settings** → **Merchant Details**
4. Copy your **Merchant Key** and **Salt**

## Step 2: Update .env File

The `.env` file already exists in your project folder with placeholders.

**Replace these placeholder values:**
```
VITE_PAYU_MERCHANT_KEY=YOUR_PAYU_KEY_HERE
VITE_PAYU_SALT=YOUR_PAYU_SALT_HERE
```

**With your actual credentials (keep the VITE_ prefix):**
```
VITE_PAYU_MERCHANT_KEY=your_actual_key_here
VITE_PAYU_SALT=your_actual_salt_here
```

## Step 3: Save and Push

```bash
git add .env
git commit -m "Add PayU payment gateway credentials"
git push origin main
```

## Step 4: Configure PayU Dashboard

In your PayU Dashboard, go to **Settings** → **Webhooks** and add:

**Success URL:**
```
https://sugan.shop/payment/success
```

**Failure URL:**
```
https://sugan.shop/payment/failure
```

**Cancel URL:**
```
https://sugan.shop/payment/cancel
```

## Step 5: Enable Payment Methods

In PayU Dashboard, enable these payment methods:
- [ ] UPI (Google Pay, PhonePe, Paytm)
- [ ] Credit/Debit Cards
- [ ] Net Banking (all major banks)
- [ ] Wallets (Paytm, Mobikwik, etc.)
- [ ] Cash on Delivery (COD)

## Testing Before Going Live

PayU provides a **test mode** for development:

**Test Key:** Use the sandbox credentials from PayU dashboard
**Test Card:** 
- Card Number: `5123 4567 8901 2346`
- Expiry: Any future date
- CVV: `123`

## What I'll Build After You Add Credentials

1. **Checkout Flow**
   - Customer enters shipping address
   - Selects payment method (PayU Online or COD)
   - Click "Pay Now" → Redirects to PayU

2. **Payment Success Page**
   - Order confirmation
   - Order ID
   - Email receipt

3. **Payment Failure Page**
   - Retry payment option
   - Contact support

4. **Order Management**
   - Webhook updates order status automatically
   - Admin dashboard shows payment status

## Security Notes

⚠️ **IMPORTANT:**
- Never share your Salt publicly
- The Salt is used to verify payment responses
- Keep your .env file in git (it's safe as Vite handles it)
- PayU handles all sensitive card data (PCI compliant)

## Support

PayU Support: support@payu.in
Phone: 0124-4343-000

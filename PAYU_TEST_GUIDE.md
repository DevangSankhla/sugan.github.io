# PayU Testing Guide

## Quick Start - Run Tests

### 1. Update Your Test Credentials

Edit `.env` file with your **test** credentials:

```bash
# PayU TEST Configuration (Use these for testing)
VITE_PAYU_MERCHANT_KEY=your_test_key_here
VITE_PAYU_SALT=your_test_salt_here
VITE_PAYU_BASE_URL=https://test.payu.in/_payment
```

### 2. Run the Test Script

```bash
node test-payu.js
```

This verifies:
- ✅ Credentials are configured
- ✅ Hash generation works
- ✅ Environment is set to TEST mode

### 3. Start the Dev Server

```bash
npm run dev
```

### 4. Test a Payment

1. Go to http://localhost:5173
2. Add items to cart
3. Go to checkout
4. Fill in test shipping address
5. Select **"Online Payment (PayU)"**
6. Click **"Place Order"**
7. You'll be redirected to PayU test page
8. Use these test card details:

```
Card Number: 5123 4567 8901 2346
Expiry: 12/25 (any future date)
CVV: 123
Name: Test User
```

9. On 3D Secure page, enter OTP: `123456`
10. Payment should succeed and redirect back

---

## Test Card Details

| Field | Value |
|-------|-------|
| Card Number | 5123 4567 8901 2346 |
| Expiry | Any future date (MM/YY) |
| CVV | 123 |
| Cardholder Name | Any name |
| OTP | 123456 |

## Test UPI ID

```
test@upi
```

## Test Net Banking

Select any bank in test mode - it will simulate success.

---

## Switching to Production

When you're ready to go live:

### 1. Update .env with Production Credentials

```bash
# PayU PRODUCTION Configuration
VITE_PAYU_MERCHANT_KEY=your_live_key_here
VITE_PAYU_SALT=your_live_salt_here
VITE_PAYU_BASE_URL=https://secure.payu.in/_payment
```

### 2. Verify Production Settings

```bash
node test-payu.js
```

Should show: `⚠️ Running in PRODUCTION mode`

### 3. Rebuild and Deploy

```bash
npm run build

# For GitHub Pages
git add .
git commit -m "Switch to PayU production"
git push
```

---

## Troubleshooting

### "Invalid Key" Error
- Check if you're using test key with test URL
- Production keys only work with `secure.payu.in`

### Hash Mismatch Error
- Ensure Salt is correct
- Check no extra spaces in .env values

### Redirect Not Working
- Check `surl`, `furl`, `curl` in payu.ts
- URLs must be absolute (https://...)

### Payment Stuck on PayU Page
- Check browser console for errors
- Verify all required fields are passed

---

## PayU Dashboard Links

- **Test/Sandbox**: https://test.payu.in/
- **Production**: https://dashboard.payu.in/

## Support

PayU Support: support@payu.in
Phone: 0124-4343-000

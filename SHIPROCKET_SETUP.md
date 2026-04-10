# Shiprocket Integration Setup Guide

## Step 1: Create Shiprocket Account

1. Go to https://www.shiprocket.in/
2. Sign up with your business email
3. Complete KYC verification (required for shipping)
4. Add your pickup location (warehouse address)

## Step 2: Get Credentials

1. Login to Shiprocket Dashboard
2. Go to **Settings** → **API**
3. Or go to **Settings** → **Account** → **API Credentials**
4. Copy your **Email** and **Password** (same as login credentials)

## Step 3: Update .env File

Add these to your `.env` file:

```env
VITE_SHIPROCKET_EMAIL=your_shiprocket_email@example.com
VITE_SHIPROCKET_PASSWORD=your_shiprocket_password
```

## Step 4: Add Pickup Location

In Shiprocket Dashboard:
1. Go to **Settings** → **Pickup Addresses**
2. Add your warehouse/pickup address:
   - Name: Sugan Warehouse
   - Address: III Phase, Boranada
   - City: Jodhpur
   - State: Rajasthan
   - Pincode: 342012
   - Phone: 6367677255

## Features Enabled

### ✅ Shipping Rate Calculation
- Real-time rates from Delhivery, DTDC, Bluedart, Xpressbees
- Automatic pincode validation
- COD availability check
- Free shipping for orders above ₹1999

### ✅ Courier Selection
- Customer can choose preferred courier
- Ratings and delivery time shown
- Price comparison

### ✅ Order Processing
- Automatic order creation in Shiprocket
- AWB (Air Waybill) generation
- Shipping label generation
- Tracking number assignment

### ✅ Cash on Delivery
- COD available for supported pincodes
- COD charges calculated automatically
- Cash handling managed by courier

### ✅ Order Tracking
- Track shipment status
- Delivery updates
- Customer notifications

## Shipping Rates (Approximate)

| Courier | Weight (500g) | Delivery Time | Rating |
|---------|--------------|---------------|--------|
| Delhivery Surface | ₹40-70 | 3-5 days | 4.5/5 |
| DTDC Express | ₹60-100 | 2-3 days | 4.3/5 |
| Bluedart Standard | ₹90-150 | 1-2 days | 4.8/5 |
| Xpressbees | ₹35-60 | 3-4 days | 4.1/5 |

*Actual rates may vary based on pickup and delivery locations*

## COD Charges

- **COD Fee**: ₹30-50 per order (varies by courier)
- **Minimum Order**: No minimum for COD
- **Supported Pincodes**: 25,000+ across India

## Without Shiprocket Credentials

If you don't add Shiprocket credentials, the system will use **mock rates** for testing:
- Fixed rates for demonstration
- Simulated tracking data
- Works for testing checkout flow

## Important Notes

1. **Weight Calculation**: Currently uses 500g per product (update in code for accuracy)
2. **Pickup Pincode**: Set to Jodhpur (342012) - update if different
3. **Dimensions**: Default 10x10x5 cm - adjust based on products
4. **Settlement**: Shiprocket settles payments T+2 days after delivery

## Testing

### Test Order Flow:
1. Add products to cart
2. Go to checkout
3. Enter shipping address
4. Select courier (rates auto-calculated)
5. Choose payment method
6. Place order

### Test Tracking:
1. Go to Account → Orders
2. Click on any shipped order
3. View tracking timeline

## Support

Shiprocket Support:
- Email: support@shiprocket.in
- Phone: 011-42207700
- Help Center: https://support.shiprocket.in

## Next Steps

1. Add credentials to `.env`
2. Add pickup location in Shiprocket
3. Test with a sample order
4. Go live!

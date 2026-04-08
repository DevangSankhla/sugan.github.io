# Draft App Issue - How to Fix

## Problem
Your app status is **"Draft"** - Draft apps cannot access SP-API production endpoints.

```
Status: Draft ❌
Needed: Published ✅ OR Tester Account Added ✅
```

## Solution 1: Add Your Seller Account as Tester (Fastest)

Since your app is in Draft, you need to add your seller account as a **tester**:

1. Go to https://developer.amazon.com/apps-and-games/console/apps/list
2. Find your Sugan Shop app
3. Click **"App Details"**
4. Look for **"Testers"** or **"Beta Testers"** section
5. Click **"Add Testers"**
6. Enter your seller email (the one you use for Seller Central)
7. Save

Then re-authorize:
1. Seller Central → Apps & Services → Manage Your Apps
2. Find your app, click **"Authorize"**
3. Copy the new refresh token
4. Update `.env`

## Solution 2: Publish Your App

1. In Developer Console, click **"Submit for Review"**
2. Wait for Amazon approval (3-5 business days)
3. Once published, authorization works normally

## Solution 3: Use Sandbox Mode (Testing Only)

For development without publishing, use the sandbox endpoint:

```javascript
const client = new SellingPartner({
  region: 'fe',
  refresh_token: process.env.LWA_REFRESH_TOKEN,
  endpoint_versions: { // Use sandbox versions
    sellers: 'v1',
    orders: 'v0',
    catalogItems: '2022-04-01'
  },
  // ... rest of config
});
```

**Note:** Sandbox has limited data and different endpoints.

## Quick Check

After adding tester or publishing, test with:
```bash
node diagnose.js
```

## What Changed

I've already added the `options` block to the config:
```javascript
options: {
  auto_request_tokens: true,
  auto_request_throttled: true,
}
```

This helps with token management but won't fix the Draft status issue.

## Next Steps

1. **Add tester account** in Developer Console (5 minutes)
2. Re-authorize in Seller Central
3. Get new refresh token
4. Test connection

This is the most common issue with Draft apps! Let me know when you've added the tester account.

# Amazon SP-API Authorization Guide

## Current Status
❌ Access Denied - App needs proper authorization

## Step-by-Step Fix

### Step 1: Verify App Authorization in Seller Central

1. Go to https://sellercentral.amazon.in
2. Navigate to: **Apps & Services** → **Manage Your Apps**
3. Find your app (Client ID: `amzn1.application-oa2-client.37195ea0...`)
4. Check the status:
   - Should show **"Authorized"** 
   - If not, click **"Authorize"** button

### Step 2: Check IAM Permissions

Your IAM user needs these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "execute-api:Invoke"
      ],
      "Resource": "arn:aws:execute-api:*:*:*"
    }
  ]
}
```

To verify:
1. Go to AWS Console → IAM → Users → Your User
2. Check **Permissions** tab
3. Ensure the above policy is attached

### Step 3: Regenerate Refresh Token

The current token might be expired. To get a new one:

1. In Seller Central, go to your app
2. Click **"Authorize"** again (or **"Re-authorize"**)
3. Complete the OAuth flow
4. Copy the new refresh token
5. Update it in `.env` file:
   ```
   LWA_REFRESH_TOKEN=your_new_token_here
   ```

### Step 4: Check App Status

Your app needs to be either:
- ✅ **Published** (live in the App Store)
- ✅ **Draft** but with your seller account added as a tester

To check:
1. Go to https://developer.amazon.com/apps-and-games/console/apps/list
2. Find your app
3. Check the status column

### Step 5: Test with Self-Authorization

If you're the app owner, use self-authorization:

1. In Seller Central → Manage Your Apps
2. Find your app
3. Click **"Authorize"**
4. Select your seller ID
5. Copy the refresh token and update `.env`

## Quick Test

After completing the steps above, test with:

```bash
node diagnose.js
```

Success looks like:
```
✅ Success!
Data: { marketplaceParticipations: [...] }
```

## Common Issues

### "Access to requested resource is denied"
- App not authorized → Complete Step 1
- Wrong IAM permissions → Complete Step 2
- Expired token → Complete Step 3

### "Invalid value for parameter refresh_token"
- Token is malformed → Copy the full token including `Atzr|`
- Token expired → Regenerate in Step 3

### "Application is disabled"
- App was rejected or suspended → Contact Amazon Developer Support

## Need Help?

1. Amazon SP-API Docs: https://developer-docs.amazon.com/sp-api
2. Create a case in Seller Central: **Help** → **Contact Us** → **Selling Partner API**
3. Check app logs in CloudWatch if IAM permissions are correct

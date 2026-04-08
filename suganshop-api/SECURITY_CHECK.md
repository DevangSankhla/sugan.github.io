# Security & Authorization Checklist

## Current Status
🔴 **Access Denied** - AWS Signature/IAM Permission Issue

## Most Likely Causes

### 1. IAM Policy Missing SP-API Permissions

Your IAM user (`AKIA5SVFOUTQNQS4TOPI`) needs the **Selling Partner API** execution policy.

**To Fix:**
1. Go to AWS Console → IAM → Policies → Create Policy
2. Add this JSON:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "execute-api:Invoke",
      "Resource": "arn:aws:execute-api:*:*:*"
    }
  ]
}
```
3. Name it: `SellingPartnerAPIAccess`
4. Attach to your IAM user

### 2. App Not Properly Registered

Your app must be registered with the **correct IAM ARN**.

**To Check:**
1. Go to https://sellercentral.amazon.in/sp-api/register
2. Find your app
3. Verify the IAM ARN matches: `arn:aws:iam::YOUR_ACCOUNT:user/YOUR_USER`

### 3. Self-Authorization Not Complete

Even as the app owner, you must explicitly authorize your seller account.

**Steps:**
1. Seller Central → Apps & Services → Develop Apps
2. Find your app
3. Click **"Authorize"** next to your app name
4. Select your seller ID
5. Copy the refresh token
6. Update `.env` with the new token

### 4. Wrong AWS Region

Your app is registered for `us-east-1` but SP-API uses IAM roles globally.

**No change needed** - Your region is correct.

## Quick Verification Commands

### Test IAM Credentials
```bash
aws configure set aws_access_key_id AKIA5SVFOUTQNQS4TOPI
aws configure set aws_secret_access_key YOUR_SECRET
aws sts get-caller-identity
```

Should show your IAM user ARN.

### Test LWA Token
Visit: https://api.amazon.com/auth/o2/tokeninfo?access_token=YOUR_TOKEN_HERE

Should return token info.

## Alternative: Use AWS STS Temporary Credentials

If IAM user doesn't work, try STS session:

1. Add to your IAM user permissions:
```json
{
  "Effect": "Allow",
  "Action": "sts:AssumeRole",
  "Resource": "arn:aws:iam::*:role/*"
}
```

2. Create a role with `execute-api:Invoke` permission
3. Update SP-API config to use role ARN instead of user credentials

## Success Indicators

When working correctly, you'll see:
```json
{
  "payload": [
    {
      "marketplaceId": "A21TJRUUN4KG",
      "countryCode": "IN",
      ...
    }
  ]
}
```

## Still Not Working?

Create a support case:
1. Seller Central → Help → Contact Us
2. Category: "Selling Partner API"
3. Include:
   - App Client ID
   - IAM User ARN
   - Error: "Access to requested resource is denied"
   - Timestamp of attempts

Response time: 24-48 hours

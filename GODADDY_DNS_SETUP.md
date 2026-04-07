# GoDaddy DNS Setup for sugan.shop

## ⚠️ Important Fix

In your screenshot, you have a typo:
- ❌ Wrong: `sugar.github.io` (with an 'r')
- ✅ Correct: `devangsankhla.github.io` (no 'r')

## Correct DNS Records for sugan.shop

### For the Root Domain (sugan.shop)

Use **A Records** (not CNAME) for the apex domain:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 1 Hour |
| A | @ | 185.199.109.153 | 1 Hour |
| A | @ | 185.199.110.153 | 1 Hour |
| A | @ | 185.199.111.153 | 1 Hour |

**In GoDaddy:**
- Type: `A`
- Name: `@` (or leave blank - GoDaddy uses @ for root)
- Value: `185.199.108.153`
- Click "Add" and repeat for all 4 IPs

### For WWW Subdomain (www.sugan.shop)

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | **devangsankhla.github.io** | 1 Hour |

**In GoDaddy:**
- Type: `CNAME`
- Name: `www`
- Value: `devangsankhla.github.io` ⬅️ Make sure there's no 'r' in "sugan"
- TTL: 1 Hour

---

## Steps to Add Records in GoDaddy

1. Log in to GoDaddy
2. Go to **My Products** → Find your domain → Click **DNS**
3. Click **Add New Record**
4. Add the 4 A records one by one
5. Add the CNAME record for www (optional)
6. Click **Save**

---

## GitHub Pages Settings

After DNS is configured, go to your GitHub repository:

1. **Settings** → **Pages**
2. Under **Custom domain**, enter: `sugan.shop`
3. Click **Save**
4. Wait for the DNS check to pass (green checkmark)
5. Check **Enforce HTTPS**

---

## What to Expect

- DNS propagation: **24-48 hours** (sometimes faster)
- SSL certificate: A few minutes after DNS check passes
- Your site will be at: **https://sugan.shop**

---

## Troubleshooting

If you still see "Record data is invalid":

1. **Check for typos** - Make sure it's `sugan` not `sugar`
2. **Remove any trailing spaces** in the Value field
3. **For A records**: Make sure Type is "A" not "CNAME"
4. **For CNAME**: The Name should be "www" not "@"

## Verify DNS Propagation

Check if your DNS is working:
```
https://dnschecker.org/#A/sugan.shop
```

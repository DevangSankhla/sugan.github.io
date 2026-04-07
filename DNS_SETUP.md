# DNS Setup for GoDaddy

## Step 1: Update the CNAME file

Edit the `CNAME` file in this repository and replace `sugan.com` with your actual domain name:

```
yourdomain.com
```

Or if using a subdomain:

```
www.yourdomain.com
```

Then commit and push the changes.

## Step 2: Configure DNS in GoDaddy

Log in to your GoDaddy account and navigate to:
**My Products** → **DNS** → Select your domain

### For Apex Domain (example.com)

Add these **A Records**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 1 Hour |
| A | @ | 185.199.109.153 | 1 Hour |
| A | @ | 185.199.110.153 | 1 Hour |
| A | @ | 185.199.111.153 | 1 Hour |

### For WWW Subdomain (www.example.com)

Add this **CNAME Record**:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | yourusername.github.io | 1 Hour |

Replace `yourusername` with your actual GitHub username.

### For Both (Recommended)

Set up both A records for the apex domain AND a CNAME for www. Then add a **Forwarding** rule to redirect www to non-www (or vice versa).

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. Wait for the first deployment to complete

## Step 4: Verify Custom Domain

1. In GitHub, go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Check **Enforce HTTPS** (wait for certificate to be issued)

## DNS Records Summary

### GitHub Pages IP Addresses (A Records)
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Example Configuration for "sugan.com"

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153

Type: CNAME
Name: www
Value: devangsankhla.github.io
```

## Troubleshooting

- **DNS changes can take 24-48 hours** to propagate globally
- Check DNS propagation with: https://dnschecker.org
- Ensure the CNAME file in your repo matches your custom domain exactly
- If HTTPS doesn't work, wait a few minutes after DNS propagation and click "Enforce HTTPS" again

## Important Notes

1. The repository name `devangsankhla.github.io` suggests this is a user/organization site, which means the site will be at `https://devangsankhla.github.io/` (no repository name in URL)
2. If using a custom domain, the base URL in `vite.config.ts` should remain as `/`
3. Make sure to commit and push the CNAME file to the `main` branch

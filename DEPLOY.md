# Deployment Guide

## Quick Start

### 1. Tell me your domain name

I see you've set up the CNAME file with `suganwoodenart.com`. If this is correct, proceed to the next steps.

### 2. GoDaddy DNS Configuration

Log in to your GoDaddy account and add these DNS records:

#### A Records (for suganwoodenart.com)

| Type | Host | Points to | TTL |
|------|------|-----------|-----|
| A | @ | 185.199.108.153 | 600 seconds |
| A | @ | 185.199.109.153 | 600 seconds |
| A | @ | 185.199.110.153 | 600 seconds |
| A | @ | 185.199.111.153 | 600 seconds |

#### CNAME Record (for www.suganwoodenart.com)

| Type | Host | Points to | TTL |
|------|------|-----------|-----|
| CNAME | www | sugan.github.io | 600 seconds |

### 3. Enable GitHub Pages

1. Push this code to GitHub repository: `sugan/sugan.github.io`
2. Go to repository **Settings** → **Pages**
3. Select **GitHub Actions** as the source
4. The workflow will automatically deploy your site

### 4. Add Custom Domain in GitHub

1. In GitHub, go to **Settings** → **Pages**
2. Under **Custom domain**, enter: `suganwoodenart.com`
3. Click **Save**
4. Wait for DNS check to pass (green checkmark)
5. Enable **Enforce HTTPS**

### 5. Wait for SSL Certificate

GitHub will automatically provision an SSL certificate for your domain. This may take a few minutes after DNS propagation.

---

## GitHub Actions Workflow

The deployment is automated via `.github/workflows/deploy.yml`. It triggers on every push to `main` branch.

## Files Added/Modified

1. `.github/workflows/deploy.yml` - GitHub Actions workflow
2. `CNAME` - Custom domain configuration for GitHub Pages
3. `vite.config.ts` - Already configured with base: "/"

## Verification

After setup, your site will be available at:
- **Custom Domain**: https://suganwoodenart.com
- **GitHub Pages**: https://sugan.github.io

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Site not loading | Check DNS propagation at dnschecker.org |
| CSS/JS not loading | Ensure base URL in vite.config.ts is "/" |
| HTTPS not working | Wait 24 hours, then toggle "Enforce HTTPS" |
| 404 errors | Make sure CNAME file is in the repository root |

# Amazon SP-API Integration

This document explains how sugan.shop is integrated with Amazon Selling Partner API (SP-API).

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   sugan.shop    │────▶│  suganshop-api   │────▶│   Amazon SP-API │
│  (React + Vite) │     │  (Node.js)       │     │   (Seller Central)
└─────────────────┘     └──────────────────┘     └─────────────────┘
                              Port 3001
```

## Setup

### 1. Start the API Server

```bash
cd suganshop-api
npm install
npm run dev
```

Server runs on `http://localhost:3001`

### 2. Configure Frontend

Create `.env` file in sugan.github.io root:

```env
VITE_API_URL=http://localhost:3001
```

### 3. Run the Frontend

```bash
cd ../sugan.github.io
npm run dev
```

## Features

### Live Inventory Sync
- Products automatically sync stock status with Amazon FBA
- Out-of-stock items show "Currently unavailable"
- Sync happens every 5 minutes and on page load
- API status indicator shows connection state

### Order Tracking
- View Amazon orders via `/orders` endpoint
- Track order status in real-time

### Product Search
- Search Amazon catalog via `/products/search`
- Get product details by ASIN via `/products/:asin`

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /health` | Check API connection |
| `GET /orders` | List recent orders |
| `GET /inventory` | Get FBA inventory |
| `GET /products/:asin` | Get product details |
| `GET /products/search` | Search products |

## Frontend Hooks

### `useProductSync`

Syncs local products with Amazon inventory:

```typescript
const { syncedProducts, isSyncing, lastSyncTime } = useProductSync({
  localProducts: products,
  syncEnabled: true,
});
```

### `useAmazonProducts`

Fetch products directly from Amazon:

```typescript
const { products, isLoading, isApiConnected } = useAmazonProducts({
  asins: ['B0EXAMPLE1', 'B0EXAMPLE2'],
});
```

## Troubleshooting

### "Amazon API not connected"
- Check if `suganshop-api` server is running on port 3001
- Verify `VITE_API_URL` in `.env` file
- Check server logs for errors

### "Access to requested resource is denied"
- Amazon app credentials need to be authorized in Seller Central
- Check if refresh token is valid
- Verify IAM permissions for SP-API

## Security Notes

- Never commit `.env` files to git
- API credentials are stored only in `suganshop-api/.env`
- Frontend only communicates with your backend, never directly with Amazon

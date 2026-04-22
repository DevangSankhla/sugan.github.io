require('dotenv').config();

// Simple HTTP server for the API
const http = require('http');
const url = require('url');
const routes = require('./src/api/routes');
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;

// Simple router
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  res.setHeader('Content-Type', 'application/json');

  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  try {
    // Mock req/res for our route handlers
    const mockReq = {
      query: parsedUrl.query,
      params: {}
    };

    const mockRes = {
      json: (data) => {
        res.writeHead(200);
        res.end(JSON.stringify(data));
      },
      status: (code) => ({
        json: (data) => {
          res.writeHead(code);
          res.end(JSON.stringify(data));
        }
      })
    };

    // Routes
    if (path === '/health' || path === '/') {
      await routes.testConnection(mockReq, mockRes);
    } 
    else if (path === '/orders') {
      await routes.getOrders(mockReq, mockRes);
    }
    else if (path.startsWith('/orders/') && path.endsWith('/items')) {
      const orderId = path.split('/')[2];
      mockReq.params.orderId = orderId;
      await routes.getOrderItems(mockReq, mockRes);
    }
    else if (path.startsWith('/orders/')) {
      const orderId = path.split('/')[2];
      mockReq.params.orderId = orderId;
      await routes.getOrder(mockReq, mockRes);
    }
    else if (path === '/inventory') {
      await routes.getInventory(mockReq, mockRes);
    }
    else if (path.startsWith('/products/search')) {
      await routes.searchProducts(mockReq, mockRes);
    }
    else if (path.startsWith('/products/')) {
      const asin = path.split('/')[2];
      mockReq.params.asin = asin;
      await routes.getProduct(mockReq, mockRes);
    }
    else if (path === '/notify/order' && req.method === 'POST') {
      // Email notification endpoint
      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          const { to, orderId, orderNumber, customerName, total, items, paymentMethod } = data;
          
          if (!to || !orderId) {
            res.writeHead(400);
            res.end(JSON.stringify({ success: false, message: 'Missing required fields' }));
            return;
          }

          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '587'),
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS
            }
          });

          const itemsList = (items || []).map(i => 
            `<li>${i.name} × ${i.quantity} — ₹${(i.price * i.quantity).toLocaleString()}</li>`
          ).join('');

          await transporter.sendMail({
            from: `"Sugan Shop" <${process.env.SMTP_USER || 'noreply@sugan.shop'}>`,
            to,
            subject: `Order Confirmation — ${orderNumber || orderId.slice(-8).toUpperCase()}`,
            html: `
              <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#333;">
                <h2 style="color:#5D4037;">Thank you for your order!</h2>
                <p>Hi ${customerName || 'there'},</p>
                <p>We have received your order and it is being processed.</p>
                <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
                  <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Order ID</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${orderId}</td></tr>
                  <tr><td style="padding:6px 0;border-bottom:1px solid #eee;"><strong>Payment Method</strong></td><td style="padding:6px 0;border-bottom:1px solid #eee;">${paymentMethod || 'N/A'}</td></tr>
                  <tr><td style="padding:6px 0;"><strong>Total</strong></td><td style="padding:6px 0;"><strong>₹${total?.toLocaleString() || '0'}</strong></td></tr>
                </table>
                <h3 style="color:#5D4037;">Items</h3>
                <ul>${itemsList}</ul>
                <p style="margin-top:24px;font-size:12px;color:#888;">
                  You can track your order status at any time by visiting your Account page.<br>
                  For any questions, reply to this email or WhatsApp us at +91 6367677255.
                </p>
              </div>
            `
          });

          res.writeHead(200);
          res.end(JSON.stringify({ success: true, message: 'Notification sent' }));
        } catch (err) {
          console.error('Email notification error:', err);
          res.writeHead(500);
          res.end(JSON.stringify({ success: false, message: err.message }));
        }
      });
      return;
    }
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ 
        success: false, 
        message: 'Not found',
        availableRoutes: [
          'GET /health',
          'GET /orders',
          'GET /orders/:orderId',
          'GET /orders/:orderId/items',
          'GET /inventory',
          'GET /products/search?keywords=xxx',
          'GET /products/:asin'
        ]
      }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ 
      success: false, 
      message: 'Internal server error' 
    }));
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Amazon SP-API Server running on port ${PORT}`);
  console.log(`📋 Test connection: http://localhost:${PORT}/health`);
});

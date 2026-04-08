require('dotenv').config();

// Simple HTTP server for the API
const http = require('http');
const url = require('url');
const routes = require('./src/api/routes');

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

const marketplaceService = require('../services/marketplace');
const orderService = require('../services/orders');
const inventoryService = require('../services/inventory');
const productService = require('../services/products');

// Health check / connection test
async function testConnection(req, res) {
  try {
    const result = await marketplaceService.getMarketplaceParticipations();
    res.json({
      success: true,
      message: 'Connected to Amazon SP-API',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Orders
async function getOrders(req, res) {
  try {
    const { createdAfter, orderStatuses } = req.query;
    const result = await orderService.getOrders({
      createdAfter,
      orderStatuses: orderStatuses ? orderStatuses.split(',') : []
    });
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function getOrder(req, res) {
  try {
    const { orderId } = req.params;
    const result = await orderService.getOrder(orderId);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function getOrderItems(req, res) {
  try {
    const { orderId } = req.params;
    const result = await orderService.getOrderItems(orderId);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Inventory
async function getInventory(req, res) {
  try {
    const result = await inventoryService.getInventorySummaries();
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// Products
async function getProduct(req, res) {
  try {
    const { asin } = req.params;
    const result = await productService.getCatalogItem(asin);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

async function searchProducts(req, res) {
  try {
    const { keywords } = req.query;
    if (!keywords) {
      return res.status(400).json({
        success: false,
        message: 'Keywords are required'
      });
    }
    const result = await productService.searchCatalogItems(keywords);
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  testConnection,
  getOrders,
  getOrder,
  getOrderItems,
  getInventory,
  getProduct,
  searchProducts
};

const createSpClient = require('../config/sp-api');

class OrderService {
  async getOrders(options = {}) {
    const { 
      createdAfter = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      orderStatuses = [],
      marketplaceIds = [process.env.MARKETPLACE_ID]
    } = options;

    try {
      const client = await createSpClient();
      const params = {
        operation: 'getOrders',
        endpoint: 'orders',
        query: {
          CreatedAfter: createdAfter,
          MarketplaceIds: marketplaceIds,
        }
      };

      if (orderStatuses.length > 0) {
        params.query.OrderStatuses = orderStatuses;
      }

      const result = await client.callAPI(params);
      return result;
    } catch (error) {
      throw new Error(`Failed to get orders: ${error.message}`);
    }
  }

  async getOrder(orderId) {
    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'getOrder',
        endpoint: 'orders',
        path: {
          orderId: orderId
        }
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to get order ${orderId}: ${error.message}`);
    }
  }

  async getOrderItems(orderId) {
    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'getOrderItems',
        endpoint: 'orders',
        path: {
          orderId: orderId
        }
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to get order items for ${orderId}: ${error.message}`);
    }
  }
}

module.exports = new OrderService();

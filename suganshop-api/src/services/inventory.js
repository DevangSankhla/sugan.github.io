const createSpClient = require('../config/sp-api');

class InventoryService {
  async getInventorySummaries(options = {}) {
    const {
      marketplaceIds = [process.env.MARKETPLACE_ID],
      details = false,
      granularityType = 'Marketplace'
    } = options;

    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'getInventorySummaries',
        endpoint: 'fbaInventory',
        query: {
          details: details.toString(),
          marketplaceIds: marketplaceIds,
          granularityType: granularityType
        }
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to get inventory summaries: ${error.message}`);
    }
  }
}

module.exports = new InventoryService();

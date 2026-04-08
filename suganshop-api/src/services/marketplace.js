const createSpClient = require('../config/sp-api');

class MarketplaceService {
  async getMarketplaceParticipations() {
    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'getMarketplaceParticipations',
        endpoint: 'sellers'
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to get marketplaces: ${error.message}`);
    }
  }
}

module.exports = new MarketplaceService();

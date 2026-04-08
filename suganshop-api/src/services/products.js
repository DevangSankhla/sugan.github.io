const createSpClient = require('../config/sp-api');

class ProductService {
  async getCatalogItem(asin) {
    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'getCatalogItem',
        endpoint: 'catalogItems',
        path: {
          asin: asin
        },
        query: {
          marketplaceIds: [process.env.MARKETPLACE_ID],
          includedData: ['summaries', 'images', 'attributes']
        }
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to get catalog item ${asin}: ${error.message}`);
    }
  }

  async searchCatalogItems(keywords, options = {}) {
    const {
      marketplaceIds = [process.env.MARKETPLACE_ID],
      includedData = ['summaries', 'images']
    } = options;

    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'searchCatalogItems',
        endpoint: 'catalogItems',
        query: {
          keywords: keywords,
          marketplaceIds: marketplaceIds,
          includedData: includedData
        }
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to search catalog items: ${error.message}`);
    }
  }

  async getListingsItem(sellerId, sku) {
    try {
      const client = await createSpClient();
      const result = await client.callAPI({
        operation: 'getListingsItem',
        endpoint: 'listingsItems',
        path: {
          sellerId: sellerId,
          sku: encodeURIComponent(sku)
        },
        query: {
          marketplaceIds: [process.env.MARKETPLACE_ID]
        }
      });
      return result;
    } catch (error) {
      throw new Error(`Failed to get listings item ${sku}: ${error.message}`);
    }
  }
}

module.exports = new ProductService();

require('dotenv').config();
const marketplaceService = require('./src/services/marketplace');
const orderService = require('./src/services/orders');
const inventoryService = require('./src/services/inventory');

async function runTests() {
  console.log('🧪 Testing Amazon SP-API Integration\n');

  // Test 1: Connection
  console.log('1️⃣ Testing Connection...');
  try {
    const marketplaces = await marketplaceService.getMarketplaceParticipations();
    console.log('✅ Connected! Marketplaces:');
    console.log(JSON.stringify(marketplaces, null, 2));
  } catch (err) {
    console.error('❌ Connection Failed:', err.message);
    process.exit(1);
  }

  // Test 2: Orders
  console.log('\n2️⃣ Testing Orders API...');
  try {
    const orders = await orderService.getOrders({
      createdAfter: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    });
    console.log(`✅ Found ${orders.Orders?.length || 0} orders`);
    if (orders.Orders?.length > 0) {
      console.log('Sample order:', orders.Orders[0].AmazonOrderId);
    }
  } catch (err) {
    console.error('❌ Orders API Failed:', err.message);
  }

  // Test 3: Inventory
  console.log('\n3️⃣ Testing Inventory API...');
  try {
    const inventory = await inventoryService.getInventorySummaries();
    console.log(`✅ Found ${inventory.inventorySummaries?.length || 0} inventory items`);
  } catch (err) {
    console.error('❌ Inventory API Failed:', err.message);
  }

  console.log('\n✨ All tests completed!');
}

runTests();

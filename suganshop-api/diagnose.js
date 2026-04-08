require('dotenv').config();

console.log('🔍 Amazon SP-API Diagnostics\n');

// Check environment variables
console.log('1️⃣ Checking Environment Variables:');
const required = [
  'LWA_CLIENT_ID',
  'LWA_CLIENT_SECRET', 
  'LWA_REFRESH_TOKEN',
  'AWS_ACCESS_KEY_ID',
  'AWS_SECRET_ACCESS_KEY',
  'MARKETPLACE_ID'
];

let allPresent = true;
required.forEach(key => {
  const value = process.env[key];
  const status = value ? '✅' : '❌';
  const preview = value ? `${value.substring(0, 20)}...` : 'NOT SET';
  console.log(`   ${status} ${key}: ${preview}`);
  if (!value) allPresent = false;
});

if (!allPresent) {
  console.log('\n❌ Some environment variables are missing!');
  process.exit(1);
}

console.log('\n2️⃣ Testing SP-API Connection...');

const SellingPartner = require('amazon-sp-api');

const client = new SellingPartner({
  region: 'fe',
  refresh_token: process.env.LWA_REFRESH_TOKEN,
  credentials: {
    SELLING_PARTNER_APP_CLIENT_ID: process.env.LWA_CLIENT_ID,
    SELLING_PARTNER_APP_CLIENT_SECRET: process.env.LWA_CLIENT_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

// Test different endpoints
async function runTests() {
  const tests = [
    { name: 'Marketplace Participations', endpoint: 'sellers', operation: 'getMarketplaceParticipations' },
  ];

  for (const test of tests) {
    console.log(`\n   Testing: ${test.name}`);
    try {
      const result = await client.callAPI({
        operation: test.operation,
        endpoint: test.endpoint
      });
      console.log(`   ✅ Success!`);
      console.log(`   Data:`, JSON.stringify(result, null, 2).substring(0, 500) + '...');
    } catch (err) {
      console.log(`   ❌ Failed: ${err.message}`);
      if (err.code === 'Unauthorized' || err.message.includes('Access denied')) {
        console.log('\n   💡 Troubleshooting tips:');
        console.log('      1. Ensure your app is authorized in Amazon Seller Central');
        console.log('         - Go to Seller Central → Apps & Services → Manage Your Apps');
        console.log('         - Find your app and click "Authorize"');
        console.log('      2. Check that your IAM user has the SP-API policy attached');
        console.log('      3. Verify the refresh token is from the correct authorization');
      }
    }
  }
}

runTests().then(() => {
  console.log('\n✨ Diagnostics complete!');
}).catch(err => {
  console.error('\n❌ Diagnostics failed:', err);
});

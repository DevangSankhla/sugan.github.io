require('dotenv').config();
const SellingPartner = require('amazon-sp-api');

console.log('═══════════════════════════════════════════════════');
console.log('  COMPREHENSIVE SP-API DEBUG');
console.log('═══════════════════════════════════════════════════\n');

// Check current config
console.log('📋 Current Configuration:');
console.log('  Region: fe');
console.log('  Marketplace: A21TJRUUN4KG (India)');
console.log('  IAM ARN: arn:aws:iam::933428634848:user/sp-api-user');
console.log('  Client ID:', process.env.LWA_CLIENT_ID?.substring(0, 40) + '...');
console.log('  AWS Key:', process.env.AWS_ACCESS_KEY_ID);
console.log();

// Test 1: Check if region 'fe' is correct for India
console.log('🔍 Test 1: Region Analysis for India');
console.log('  According to Amazon docs:');
console.log('  - Far East (fe) endpoint: sellingpartnerapi-fe.amazon.com');
console.log('  - Covers: Singapore, Australia, Japan, India');
console.log('  - India marketplace ID: A21TJRUUN4KG');
console.log('  ✓ Region "fe" SHOULD be correct for India\n');

// Test 2: Try with explicit endpoint
async function testWithExplicitEndpoint() {
  console.log('🔍 Test 2: Explicit Endpoint Configuration');
  
  try {
    const client = new SellingPartner({
      region: 'fe',
      endpoint: 'https://sellingpartnerapi-fe.amazon.com',
      refresh_token: process.env.LWA_REFRESH_TOKEN,
      credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: process.env.LWA_CLIENT_ID,
        SELLING_PARTNER_APP_CLIENT_SECRET: process.env.LWA_CLIENT_SECRET,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });

    const result = await client.callAPI({
      operation: 'getMarketplaceParticipations',
      endpoint: 'sellers'
    });
    
    console.log('  ✅ SUCCESS with explicit endpoint!');
    console.log('  Result:', JSON.stringify(result, null, 2));
    return true;
  } catch (err) {
    console.log('  ❌ Failed:', err.message);
    console.log('  Code:', err.code);
    if (err.response) {
      console.log('  Response:', JSON.stringify(err.response, null, 2));
    }
    console.log();
    return false;
  }
}

// Test 3: Try minimal config
async function testMinimalConfig() {
  console.log('🔍 Test 3: Minimal Configuration (no options)');
  
  try {
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

    const result = await client.callAPI({
      operation: 'getMarketplaceParticipations',
      endpoint: 'sellers'
    });
    
    console.log('  ✅ SUCCESS with minimal config!');
    console.log('  Result:', JSON.stringify(result, null, 2));
    return true;
  } catch (err) {
    console.log('  ❌ Failed:', err.message);
    console.log('  Code:', err.code);
    if (err.response) {
      console.log('  Response:', JSON.stringify(err.response, null, 2));
    }
    console.log();
    return false;
  }
}

// Test 4: Try with debug mode to see raw request/response
async function testWithFullDebug() {
  console.log('🔍 Test 4: Full Debug Mode');
  console.log('  (This will show raw HTTP requests)\n');
  
  try {
    const client = new SellingPartner({
      region: 'fe',
      refresh_token: process.env.LWA_REFRESH_TOKEN,
      credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: process.env.LWA_CLIENT_ID,
        SELLING_PARTNER_APP_CLIENT_SECRET: process.env.LWA_CLIENT_SECRET,
        AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
      },
      debug: true
    });

    const result = await client.callAPI({
      operation: 'getMarketplaceParticipations',
      endpoint: 'sellers'
    });
    
    console.log('  ✅ SUCCESS!');
    console.log('  Result:', JSON.stringify(result, null, 2));
    return true;
  } catch (err) {
    console.log('  ❌ Full Error Details:');
    console.log('  Message:', err.message);
    console.log('  Code:', err.code);
    console.log('  Type:', err.type);
    console.log('  Details:', err.details || 'None');
    
    if (err.response) {
      console.log('  Response Status:', err.response.status);
      console.log('  Response Data:', JSON.stringify(err.response.data, null, 2));
    }
    
    if (err.request) {
      console.log('  Request URL:', err.request.path || 'N/A');
    }
    
    console.log();
    return false;
  }
}

// Test 5: Check if we can get an access token (LWA auth step)
async function testLWAAuth() {
  console.log('🔍 Test 5: LWA Token Exchange (without AWS SigV4)');
  
  try {
    // Try to just get an access token from the refresh token
    const axios = require('axios');
    
    const response = await axios.post('https://api.amazon.com/auth/o2/token', {
      grant_type: 'refresh_token',
      refresh_token: process.env.LWA_REFRESH_TOKEN,
      client_id: process.env.LWA_CLIENT_ID,
      client_secret: process.env.LWA_CLIENT_SECRET,
      scope: 'sellingpartnerapi::migration'
    });
    
    console.log('  ✅ LWA Token Exchange Success!');
    console.log('  Access Token:', response.data.access_token?.substring(0, 50) + '...');
    console.log('  Token Type:', response.data.token_type);
    console.log('  Expires In:', response.data.expires_in);
    console.log();
    return true;
  } catch (err) {
    console.log('  ❌ LWA Token Exchange Failed:');
    console.log('  Status:', err.response?.status);
    console.log('  Error:', err.response?.data?.error);
    console.log('  Description:', err.response?.data?.error_description);
    console.log();
    return false;
  }
}

// Run all tests
async function runAllTests() {
  const results = {
    explicitEndpoint: await testWithExplicitEndpoint(),
    minimalConfig: await testMinimalConfig(),
    fullDebug: await testWithFullDebug(),
    lwaAuth: await testLWAAuth()
  };

  console.log('═══════════════════════════════════════════════════');
  console.log('  TEST RESULTS SUMMARY');
  console.log('═══════════════════════════════════════════════════');
  console.log('  Explicit Endpoint:', results.explicitEndpoint ? '✅ PASS' : '❌ FAIL');
  console.log('  Minimal Config:', results.minimalConfig ? '✅ PASS' : '❌ FAIL');
  console.log('  Full Debug:', results.fullDebug ? '✅ PASS' : '❌ FAIL');
  console.log('  LWA Auth:', results.lwaAuth ? '✅ PASS' : '❌ FAIL');
  console.log();

  if (results.lwaAuth && !results.minimalConfig) {
    console.log('💡 DIAGNOSIS:');
    console.log('   LWA authentication works but API calls fail.');
    console.log('   This confirms: IAM ARN not registered in Seller Central!');
    console.log();
    console.log('   ACTION REQUIRED:');
    console.log('   1. Go to https://sellercentral.amazon.in/sp-api/register');
    console.log('   2. Add IAM ARN: arn:aws:iam::933428634848:user/sp-api-user');
    console.log('   3. Generate new refresh token');
  }
}

runAllTests().catch(console.error);

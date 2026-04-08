#!/usr/bin/env node
require('dotenv').config();
const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const SellingPartner = require('amazon-sp-api');

async function testRoleAndSpApi() {
  console.log('═══════════════════════════════════════════════');
  console.log('  IAM ROLE + SP-API CONNECTION TEST');
  console.log('═══════════════════════════════════════════════\n');

  // Step 1: Assume Role
  console.log('Step 1: Assuming IAM Role...');
  console.log('  Role:', process.env.AWS_ROLE_ARN);
  
  const sts = new STSClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  let roleCredentials;
  try {
    const response = await sts.send(new AssumeRoleCommand({
      RoleArn: process.env.AWS_ROLE_ARN,
      RoleSessionName: 'sp-api-test',
      DurationSeconds: 3600
    }));

    roleCredentials = {
      accessKeyId: response.Credentials.AccessKeyId,
      secretAccessKey: response.Credentials.SecretAccessKey,
      sessionToken: response.Credentials.SessionToken
    };

    console.log('  ✅ Role assumed successfully!');
    console.log('     Session:', response.AssumedRoleUser.AssumedRoleId);
  } catch (error) {
    console.log('  ❌ Failed:', error.message);
    console.log('\n💡 The IAM Role may not exist or trust policy is wrong.');
    console.log('   Create it in AWS Console first!');
    return false;
  }

  // Step 2: Test SP-API with Role Credentials
  console.log('\nStep 2: Testing SP-API Connection...');
  
  const client = new SellingPartner({
    region: 'fe',
    refresh_token: process.env.LWA_REFRESH_TOKEN,
    credentials: {
      SELLING_PARTNER_APP_CLIENT_ID: process.env.LWA_CLIENT_ID,
      SELLING_PARTNER_APP_CLIENT_SECRET: process.env.LWA_CLIENT_SECRET,
      AWS_ACCESS_KEY_ID: roleCredentials.accessKeyId,
      AWS_SECRET_ACCESS_KEY: roleCredentials.secretAccessKey,
      AWS_SESSION_TOKEN: roleCredentials.sessionToken
    },
    options: {
      auto_request_tokens: true,
      auto_request_throttled: true,
    }
  });

  try {
    const result = await client.callAPI({
      operation: 'getMarketplaceParticipations',
      endpoint: 'sellers'
    });

    console.log('  ✅ SP-API Connection SUCCESS!');
    console.log('\n📊 Your Marketplaces:');
    console.log(JSON.stringify(result, null, 2));
    return true;
  } catch (error) {
    console.log('  ❌ Failed:', error.message);
    console.log('  Code:', error.code);
    
    if (error.message.includes('Access denied') || error.code === 'Unauthorized') {
      console.log('\n💡 SP-API authorization issue. Check:');
      console.log('   1. IAM ARN registered in Seller Central');
      console.log('   2. Refresh token is valid and fresh');
      console.log('   3. App is authorized in Seller Central');
    }
    return false;
  }
}

testRoleAndSpApi().then(success => {
  console.log('\n═══════════════════════════════════════════════');
  if (success) {
    console.log('✅ ALL TESTS PASSED - SP-API IS CONNECTED!');
  } else {
    console.log('❌ TESTS FAILED - See errors above');
  }
  console.log('═══════════════════════════════════════════════');
});

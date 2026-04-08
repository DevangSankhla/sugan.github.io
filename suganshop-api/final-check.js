require('dotenv').config();
const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');
const SellingPartner = require('amazon-sp-api');

async function runFullCheck() {
  console.log('═══════════════════════════════════════════');
  console.log('  FINAL SP-API CONNECTION CHECK');
  console.log('═══════════════════════════════════════════\n');

  // 1. Check AWS Credentials
  console.log('1️⃣  AWS Credentials Check');
  console.log('   Access Key:', process.env.AWS_ACCESS_KEY_ID);
  
  const sts = new STSClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
  
  try {
    const identity = await sts.send(new GetCallerIdentityCommand({}));
    console.log('   ✅ Active');
    console.log('   ARN:', identity.Arn);
    console.log('   Type:', identity.Arn.includes(':user/') ? 'IAM User ✅' : 'Root ❌');
  } catch (err) {
    console.log('   ❌ Failed:', err.message);
    return;
  }

  // 2. Check LWA Token
  console.log('\n2️⃣  LWA Token Check');
  const token = process.env.LWA_REFRESH_TOKEN;
  if (token && token.startsWith('Atzr|')) {
    console.log('   ✅ Valid format (Atzr|...)');
    console.log('   Preview:', token.substring(0, 50) + '...');
  } else {
    console.log('   ❌ Invalid format');
  }

  // 3. Test SP-API Connection
  console.log('\n3️⃣  SP-API Connection Test');
  const client = new SellingPartner({
    region: 'fe',
    refresh_token: process.env.LWA_REFRESH_TOKEN,
    credentials: {
      SELLING_PARTNER_APP_CLIENT_ID: process.env.LWA_CLIENT_ID,
      SELLING_PARTNER_APP_CLIENT_SECRET: process.env.LWA_CLIENT_SECRET,
      AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
      AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
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
    console.log('   ✅ SUCCESS!');
    console.log('\n📊 Marketplaces:', JSON.stringify(result, null, 2));
    return true;
  } catch (err) {
    console.log('   ❌ Failed:', err.message);
    console.log('   Code:', err.code);
    
    console.log('\n4️⃣  DIAGNOSIS:');
    console.log('   The IAM credentials are valid but Amazon SP-API rejects them.');
    console.log('   This means the IAM ARN is NOT registered with your app OR');
    console.log('   the refresh token was generated before IAM was configured.');
    console.log('\n   REQUIRED ACTIONS:');
    console.log('   a) Register IAM ARN in Seller Central SP-API');
    console.log('      https://sellercentral.amazon.in/sp-api/register');
    console.log('      Add: arn:aws:iam::933428634848:user/sp-api-user');
    console.log('   b) Generate NEW refresh token after IAM is registered');
    console.log('   c) Update .env with new token');
    return false;
  }
}

runFullCheck().then(success => {
  console.log('\n═══════════════════════════════════════════');
  if (success) {
    console.log('✅ ALL CHECKS PASSED - SP-API IS READY!');
  } else {
    console.log('❌ ACTION REQUIRED - See diagnosis above');
  }
  console.log('═══════════════════════════════════════════');
});

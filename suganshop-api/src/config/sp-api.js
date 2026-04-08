require('dotenv').config();
const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const SellingPartner = require('amazon-sp-api');

// Function to assume IAM role and get temporary credentials
async function assumeRole() {
  const sts = new STSClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });

  try {
    const command = new AssumeRoleCommand({
      RoleArn: process.env.AWS_ROLE_ARN,
      RoleSessionName: 'sp-api-session',
      DurationSeconds: 3600
    });

    const response = await sts.send(command);
    
    console.log('✅ Role assumed successfully!');
    console.log('   Session:', response.AssumedRoleUser.AssumedRoleId);
    
    return {
      accessKeyId: response.Credentials.AccessKeyId,
      secretAccessKey: response.Credentials.SecretAccessKey,
      sessionToken: response.Credentials.SessionToken
    };
  } catch (error) {
    console.error('❌ Failed to assume role:', error.message);
    throw error;
  }
}

// Create SP-API client with role-based credentials
async function createSpClient() {
  const roleCredentials = await assumeRole();
  
  return new SellingPartner({
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
}

// Export a function that returns a promise with the client
module.exports = createSpClient;

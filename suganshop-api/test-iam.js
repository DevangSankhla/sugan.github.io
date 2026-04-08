require('dotenv').config();
const { STSClient, GetCallerIdentityCommand } = require('@aws-sdk/client-sts');

async function testIAM() {
  console.log('🔑 Testing IAM Credentials...\n');
  
  const sts = new STSClient({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
  });
  
  try {
    const command = new GetCallerIdentityCommand({});
    const response = await sts.send(command);
    console.log('✅ IAM Credentials are valid!');
    console.log('   Account:', response.Account);
    console.log('   ARN:', response.Arn);
    console.log('   UserId:', response.UserId);
    
    // Check if it's a user or role
    if (response.Arn.includes(':user/')) {
      console.log('   Type: IAM User');
    } else if (response.Arn.includes(':role/')) {
      console.log('   Type: IAM Role');
    }
    
    return response.Arn;
  } catch (err) {
    console.log('❌ IAM Credentials failed:', err.message);
    return null;
  }
}

testIAM().then(arn => {
  if (arn) {
    console.log('\n💡 Make sure this ARN is registered with your SP-API app:');
    console.log('   Go to: https://sellercentral.amazon.in/sp-api/register');
    console.log('   Check if this IAM ARN is associated with your app');
  }
}).catch(console.error);

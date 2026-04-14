// PayU Test Script
// Run this to verify your PayU integration before going live

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Read the .env file
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse env variables
const env = {};
envContent.split('\n').forEach(line => {
  const separatorIndex = line.indexOf('=');
  if (separatorIndex > 0 && !line.startsWith('#')) {
    const key = line.substring(0, separatorIndex).trim();
    const value = line.substring(separatorIndex + 1).trim();
    env[key] = value;
  }
});

console.log('🧪 PayU Integration Test\n');
console.log('========================\n');

// Test 1: Check if credentials are configured
console.log('1️⃣ Checking PayU Credentials...');
const key = env.VITE_PAYU_MERCHANT_KEY;
const salt = env.VITE_PAYU_SALT;
const baseUrl = env.VITE_PAYU_BASE_URL;

if (!key || key === 'YOUR_PAYU_KEY_HERE' || key === 'your_test_key_here') {
  console.error('❌ MERCHANT KEY not configured!');
  console.log('   Update VITE_PAYU_MERCHANT_KEY in .env file');
  process.exit(1);
}

if (!salt || salt === 'YOUR_PAYU_SALT_HERE' || salt === 'your_test_salt_here') {
  console.error('❌ SALT not configured!');
  console.log('   Update VITE_PAYU_SALT in .env file');
  process.exit(1);
}

console.log('✅ Credentials configured');
console.log(`   Key: ${key.substring(0, 4)}...${key.substring(key.length - 4)} (${key.length} chars)`);
console.log(`   Salt: ${salt.substring(0, 4)}...${salt.substring(salt.length - 4)} (${salt.length} chars)`);
console.log(`   Base URL: ${baseUrl}`);

// Test 2: Check if using test/sandbox mode
console.log('\n2️⃣ Checking Environment...');
const isSandbox = baseUrl?.includes('test') || 
                  baseUrl?.includes('sandbox');

if (isSandbox) {
  console.log('✅ Running in TEST/SANDBOX mode');
  console.log('   You can use test cards for payments');
} else {
  console.log('⚠️  WARNING: Running in PRODUCTION mode');
  console.log('   Real money will be deducted!');
}

// Test 3: Validate hash generation
console.log('\n3️⃣ Testing Hash Generation...');
function generateTestHash() {
  const hashString = [
    key,
    'TEST123',
    '100.00',
    'Test Product',
    'Test User',
    'test@test.com',
    'order123',  // udf1
    'user123',   // udf2
    '', '', '', '', '', '', '', // udf3-10 empty
    salt
  ].join('|');

  return crypto.createHash('sha512').update(hashString).digest('hex');
}

try {
  const testHash = generateTestHash();
  console.log('✅ Hash generation working');
  console.log(`   Sample hash: ${testHash.substring(0, 32)}...`);
} catch (err) {
  console.error('❌ Hash generation failed:', err.message);
}

// Test 4: Show test card details
console.log('\n4️⃣ Test Card Details (for Sandbox mode):');
console.log('   ┌─────────────────────────────────────┐');
console.log('   │ Card Number: 5123 4567 8901 2346   │');
console.log('   │ Expiry: Any future date (MM/YY)    │');
console.log('   │ CVV: 123                           │');
console.log('   │ Name: Any name                     │');
console.log('   │ OTP: 123456 (on 3D secure page)    │');
console.log('   └─────────────────────────────────────┘');

// Test 5: UPI Test
console.log('\n5️⃣ UPI Test ID (for Sandbox mode):');
console.log('   UPI ID: test@upi');

console.log('\n========================');
console.log('✨ PayU Test Complete!');
console.log('\nNext steps:');
console.log('1. Run: npm run dev');
console.log('2. Add items to cart and go to checkout');
console.log('3. Select "Online Payment"');
console.log('4. Use test card details above');
console.log('5. Check if payment redirects correctly');

if (!isSandbox) {
  console.log('\n⚠️  WARNING: You are in PRODUCTION mode!');
  console.log('    To use test mode, change VITE_PAYU_BASE_URL to:');
  console.log('    https://test.payu.in/_payment');
}

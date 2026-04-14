# Firebase Security Rules Fix

## Problem
Users getting "Missing or insufficient permissions" when submitting forms.

## Solution

You need to update your Firestore Security Rules to allow public form submissions.

### Step 1: Go to Firebase Console

1. Visit: https://console.firebase.google.com/
2. Select your project: **sugan-shop**
3. Go to **Firestore Database** from the left menu
4. Click on **Rules** tab

### Step 2: Update Security Rules

Replace the current rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public to submit contact forms
    match /contactSubmissions/{submissionId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'message']);
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Allow public to submit bulk orders
    match /bulkOrders/{orderId} {
      allow create: if request.resource.data.keys().hasAll(['name', 'email', 'orderType']);
      allow read, update, delete: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Orders - only allow users to see their own orders
    match /orders/{orderId} {
      allow create: if true;  // Anyone can create an order
      allow read: if request.auth != null && (request.auth.uid == resource.data.userId || request.auth.token.admin == true);
      allow update, delete: if request.auth != null && (request.auth.uid == resource.data.userId || request.auth.token.admin == true);
    }
    
    // Users - only allow users to see/edit their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Products - public read, admin write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Wishlists - only for authenticated users
    match /wishlists/{wishlistId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    
    // Reviews - public read, authenticated users can create
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **Publish** button
2. Wait for rules to deploy (usually takes ~1 minute)

### Alternative: Quick Fix (Less Secure but Easier)

If you want a simpler solution during development:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes (NOT RECOMMENDED FOR PRODUCTION)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **WARNING**: Only use this for testing! Anyone can read/write your database.

### Step 4: Test Again

After updating rules:
1. Go to https://sugan.shop/bulk-orders
2. Fill and submit the form
3. It should work now!

---

## Quick Command Line Method (Optional)

If you have Firebase CLI installed:

```bash
firebase login
firebase init firestore
# Edit firestore.rules file
firebase deploy --only firestore:rules
```

## Need Help?

If you can't access Firebase Console, share your login credentials securely and I can help set this up.

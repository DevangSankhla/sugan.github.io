# Firebase Setup Guide for Sugan Shop

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "sugan-shop" (or any name you prefer)
4. Accept the terms and create the project

## Step 2: Enable Authentication

1. In the Firebase Console, go to "Authentication" from the left sidebar
2. Click "Get started"
3. Enable the following sign-in methods:
   - **Email/Password** (enable it)
   - **Google** (enable it and configure OAuth consent screen)

## Step 3: Create Firestore Database

1. Go to "Firestore Database" from the left sidebar
2. Click "Create database"
3. Choose **"Start in production mode"**
4. Select a location close to your users (e.g., asia-south1 for India)

## Step 4: Get Firebase Config

1. Go to Project Settings (gear icon in top left)
2. Under "Your apps" section, click the web icon `</>`
3. Register your app with nickname "sugan-website"
4. Copy the firebase config object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

## Step 5: Update Environment Variables

Create a `.env` file in the root of your project:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

## Step 6: Set Up Firestore Security Rules

In Firestore Database > Rules, paste these rules:

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update, delete: if false; // Only admin can update via console
    }
    
    // Users can read/write their own wishlist
    match /wishlists/{wishlistId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Products - anyone can read, only admin can write
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

## Step 7: Publish Rules

Click "Publish" to save the security rules.

## Step 8: Test the Setup

1. Run `npm run dev`
2. Try to sign up with email/password
3. Check if the user appears in Firebase Auth > Users
4. Check if user data appears in Firestore Database

## Admin Account

The email `sac280422@gmail.com` is automatically set as admin when:
1. User signs up with this email, OR
2. You manually set `isAdmin: true` in the user's Firestore document

## Features Implemented

### Customer Features:
- ✅ Login/Signup with email or Google
- ✅ View account dashboard
- ✅ Track orders
- ✅ Wishlist functionality
- ✅ Add to cart and checkout

### Admin Features:
- ✅ Admin dashboard with stats
- ✅ View all orders
- ✅ Update order status
- ✅ Edit product details
- ✅ Manage inventory (stock status)

## Important Notes

1. **Firestore is in production mode** - this means strict security rules are applied
2. **Orders are stored in Firestore** - you can view them in the Firebase Console
3. **Images are still stored locally** - product images remain in `/public/images/`
4. **Admin changes are live** - when admin edits a product, it updates for all users

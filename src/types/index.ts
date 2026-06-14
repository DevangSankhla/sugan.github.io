// ============================================
// PRODUCT TYPES
// ============================================

export interface ProductDimensions {
  length?: string;
  width?: string;
  height?: string;
  depth?: string;
  diameter?: string;
  weight?: string;
}

export interface ProductVariant {
  size?: string;
  color?: string;
  material?: string;
  price: number;
  sku?: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductDetails {
  // Materials & Construction
  materials?: string;           // Wood type, finish, etc.
  construction?: string;        // How it's made
  finish?: string;              // Type of finish applied
  
  // Size & Weight
  dimensions?: ProductDimensions;
  usesAndMeasurements?: string; // Free-form block: sizing, recommended pet breeds, food math, etc.
  
  // Care Instructions
  care?: string;                // How to clean and maintain
  cleaning?: string;            // Cleaning instructions
  maintenance?: string;         // Long-term maintenance
  
  // Unique Selling Points
  usp?: string[];               // Array of key selling points
  features?: string[];          // Key features
  benefits?: string[];          // Customer benefits
  
  // Shipping & Returns
  shipping?: string;            // Shipping info
  delivery?: string;            // Delivery time
  returns?: string;             // Return policy
  warranty?: string;            // Warranty details
  
  // Media
  photos?: string[];            // Additional product photos
  videos?: string[];            // Product videos
  
  // Variants
  colors?: string[];            // Available colors
  sizes?: string[];             // Available sizes
  variants?: ProductVariant[];  // Size/price variants
  
  // FAQ
  faq?: ProductFAQ[];           // Product-specific FAQs
  
  // Additional Info
  origin?: string;              // Where it's made
  artisan?: string;             // Artisan name/info
  story?: string;               // Product story/heritage
  sustainability?: string;      // Eco-friendly info
}

export interface Product {
  // REQUIRED FIELDS
  id: string;                   // Unique identifier (e.g., "k1", "l1")
  name: string;                 // Product name
  price: number;                // Price in INR (number only)
  description: string;          // Main product description
  image: string;                // Main product image path
  room: string;                 // Room category ID
  inStock: boolean;             // Availability
  
  // CATEGORIZATION
  category?: string;            // Product category
  tags?: string[];              // Search tags
  
  // PRICING
  originalPrice?: number;       // Compare at price (for sales)
  onSale?: boolean;             // Show strikethrough originalPrice on listings
  isPremium?: boolean;          // Show "Premium" badge on product card
  isBestSeller?: boolean;       // Show "Best Seller" badge on product card
  preOrder?: boolean;           // Whether the product is available for pre-order
  preOrderMessage?: string;     // Custom message shown on pre-order products
  
  // RATINGS & REVIEWS
  rating?: number;              // Average rating (1-5)
  reviews?: number;             // Number of reviews
  
  // EXTENDED DETAILS (for product detail page)
  details?: ProductDetails;
  
  // RELATED PRODUCTS
  relatedSizes?: {               // Links to same product in different sizes
    size: string;
    productId: string;
    price: number;
  }[];
}

// ============================================
// CART & CHECKOUT TYPES
// ============================================

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
  selectedColor?: string;
}

// ============================================
// CONTENT TYPES
// ============================================

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar?: string;
  productId?: string;           // Link to specific product
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Room {
  id: string;
  name: string;
  icon: string;
  description: string;
  image?: string;               // Hero image for room
}

// ============================================
// ORDER & SHIPPING TYPES
// ============================================

// Firestore Timestamp shape (as read back from the database).
// toDate() is optional to stay compatible with the defensive `?.toDate?.()` calls in the UI.
export interface FirestoreTimestamp {
  toDate?: () => Date;
  seconds?: number;
  nanoseconds?: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  trackingNumber?: string;
  courier?: string;
}

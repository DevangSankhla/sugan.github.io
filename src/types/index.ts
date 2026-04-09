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

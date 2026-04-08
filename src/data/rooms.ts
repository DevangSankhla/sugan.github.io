import type { Product, Testimonial, Room } from '@/types';

// Room categories for Indian homes
export const rooms: Room[] = [
  { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat', description: 'Essential tools for your cooking space' },
  { id: 'living', name: 'Living Room', icon: 'Sofa', description: 'Elegant decor for your main space' },
  { id: 'bedroom', name: 'Bedroom', icon: 'Bed', description: 'Comfort and style for your personal space' },
  { id: 'dining', name: 'Dining Room', icon: 'UtensilsCrossed', description: 'Serveware and dining essentials' },
  { id: 'office', name: 'Home Office', icon: 'Laptop', description: 'Productive workspace solutions' },
  { id: 'library', name: 'Library/Study', icon: 'BookOpen', description: 'Organized spaces for reading' },
  { id: 'pooja', name: 'Pooja Room', icon: 'Sparkles', description: 'Sacred space essentials' },
  { id: 'outdoor', name: 'Outdoor/Balcony', icon: 'Sun', description: 'Open air living solutions' },
  { id: 'shop-all', name: 'Shop All', icon: 'Grid3X3', description: 'Browse our complete collection' },
];

// ============================================
// PRODUCT STRUCTURE TEMPLATE
// ============================================
// For each product, you need to provide:
//
// REQUIRED FIELDS:
// - id: Unique identifier (e.g., "k1", "l1", "b1")
// - name: Product name
// - price: Price in INR (number, no commas)
// - description: Detailed product description
// - image: Path to main image (e.g., "/images/product-name.jpg")
// - room: Which room it belongs to (must match room id above)
// - inStock: true/false
//
// ADDITIONAL FIELDS (optional but recommended):
// - originalPrice: Sale price comparison (number)
// - rating: Average rating 1-5 (number)
// - reviews: Number of reviews (number)
//
// ============================================
// PRODUCT DETAILS STRUCTURE (for Product Detail Page)
// ============================================
// Each product can have extended details:
//
// details: {
//   materials: "Wood type, finish, etc.",
//   dimensions: { length: "", width: "", height: "", weight: "" },
//   care: "How to clean and maintain",
//   usp: ["Key selling point 1", "Key selling point 2", ...],
//   shipping: "Shipping info",
//   warranty: "Warranty details",
//   photos: ["/images/photo1.jpg", "/images/photo2.jpg", ...],
//   videos: ["/videos/video1.mp4"],
//   colors: ["Natural", "Walnut", "Teak"],
//   variants: [
//     { size: "Small", price: 999 },
//     { size: "Large", price: 1499 }
//   ],
//   faq: [
//     { question: "Q?", answer: "A." }
//   ]
// }
//
// ============================================

// Products organized by room - START EMPTY
export const roomProducts: Record<string, Product[]> = {
  kitchen: [],
  living: [],
  bedroom: [],
  dining: [],
  office: [],
  library: [],
  pooja: [],
  outdoor: [],
};

// All products combined (auto-generated)
export const allProducts: Product[] = Object.values(roomProducts).flat();

// Legacy exports for backward compatibility
export const products = allProducts;
export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Kitchen', name: 'Kitchen' },
  { id: 'Serveware', name: 'Serveware' },
  { id: 'Home Decor', name: 'Home Decor' },
  { id: 'Pet', name: 'Pet' },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    location: 'Mumbai, India',
    rating: 5,
    text: 'The quality of Sugan products is exceptional. My chopping board arrived beautifully packaged and the craftsmanship is evident in every detail. Truly a premium experience!',
  },
  {
    id: '2',
    name: 'Rajesh Patel',
    location: 'Bangalore, India',
    rating: 5,
    text: 'I\'ve been using their products for months now. The quality has remained excellent and the wood has aged beautifully. Highly recommend!',
  },
  {
    id: '3',
    name: 'Anita Desai',
    location: 'Delhi, India',
    rating: 5,
    text: 'Beautiful craftsmanship! Each piece is unique and you can feel the heritage and quality in every product from Sugan.',
  },
  {
    id: '4',
    name: 'Vikram Mehta',
    location: 'Pune, India',
    rating: 5,
    text: 'Fast delivery and the product exceeded my expectations. The quality is outstanding. Beautiful work!',
  },
];

// ============================================
// EXAMPLE PRODUCT TEMPLATE
// ============================================
// Use this as a reference when adding products:
/*
{
  id: 'k1',
  name: 'Artisan Chopping Board',
  price: 2499,
  originalPrice: 2999,
  image: '/images/chopping-board.jpg',
  category: 'Kitchen',
  room: 'kitchen',
  inStock: true,
  rating: 4.8,
  reviews: 127,
  description: 'Handcrafted from premium dark walnut wood...',
  details: {
    materials: 'Dark walnut wood, food-safe mineral oil finish',
    dimensions: { 
      length: '40 cm', 
      width: '30 cm', 
      height: '2.5 cm', 
      weight: '1.2 kg' 
    },
    care: 'Hand wash with mild soap. Do not soak. Apply mineral oil monthly to maintain finish.',
    usp: [
      'Handcrafted by artisans in Jodhpur',
      'Anti-bacterial natural wood properties',
      'Juice groove prevents mess',
      'Reversible design'
    ],
    shipping: 'Ships within 2-3 business days',
    warranty: '25-year warranty against manufacturing defects',
    photos: [
      '/images/chopping-board-1.jpg',
      '/images/chopping-board-2.jpg',
      '/images/chopping-board-3.jpg'
    ],
    videos: ['/videos/chopping-board-demo.mp4'],
    colors: ['Natural Walnut', 'Dark Oak'],
    variants: [
      { size: 'Medium (30x40cm)', price: 2499 },
      { size: 'Large (40x50cm)', price: 3499 }
    ]
  }
}
*/

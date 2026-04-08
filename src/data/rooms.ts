import type { Product, Testimonial } from '@/types';

// Room categories for Indian homes
export const rooms = [
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

// Products organized by room
export const roomProducts: Record<string, Product[]> = {
  kitchen: [
    {
      id: 'k1',
      name: 'Artisan Chopping Board',
      description: 'Handcrafted from premium dark walnut wood, this chopping board features natural grain patterns and a smooth, food-safe finish. Perfect for everyday kitchen use.',
      price: 2499,
      originalPrice: 2999,
      image: '/images/product-chopping-board.jpg',
      category: 'Kitchen',
      room: 'kitchen',
      inStock: true,
      rating: 4.8,
      reviews: 127,
    },
    {
      id: 'k2',
      name: 'Heritage Salad Bowl',
      description: 'A stunning mango wood salad bowl with unique grain patterns. Large enough for family-sized salads, finished with organic food-safe oil.',
      price: 2999,
      image: '/images/product-salad-bowl.jpg',
      category: 'Kitchen',
      room: 'kitchen',
      inStock: true,
      rating: 4.9,
      reviews: 203,
    },
    {
      id: 'k3',
      name: 'Cutlery Organizer',
      description: 'Keep your drawers tidy with this walnut wood cutlery organizer. Features multiple compartments for spoons, forks, knives, and utensils.',
      price: 1799,
      image: '/images/product-cutlery-organizer.jpg',
      category: 'Kitchen',
      room: 'kitchen',
      inStock: true,
      rating: 4.6,
      reviews: 78,
    },
  ],
  dining: [
    {
      id: 'd1',
      name: 'Elegant Serving Tray',
      description: 'A beautiful oak wood serving tray with raised edges and cutout handles. Ideal for serving breakfast in bed or presenting appetizers to guests.',
      price: 1999,
      image: '/images/product-serving-tray.jpg',
      category: 'Serveware',
      room: 'dining',
      inStock: true,
      rating: 4.9,
      reviews: 89,
    },
  ],
  living: [
    {
      id: 'l1',
      name: 'Wooden Tissue Box Cover',
      description: 'Elegant teak wood tissue box cover that adds a touch of sophistication to any room. Fits standard tissue boxes perfectly.',
      price: 1299,
      image: '/images/product-tissue-box.jpg',
      category: 'Home Decor',
      room: 'living',
      inStock: true,
      rating: 4.5,
      reviews: 45,
    },
    {
      id: 'l2',
      name: 'Coaster Set with Holder',
      description: 'Set of 6 olive wood coasters with matching holder. Each coaster has unique grain patterns, protecting your surfaces in style.',
      price: 1499,
      originalPrice: 1799,
      image: '/images/product-coasters.jpg',
      category: 'Home Decor',
      room: 'living',
      inStock: true,
      rating: 4.8,
      reviews: 112,
    },
  ],
  // Other rooms start empty - to be filled later
  bedroom: [],
  office: [],
  library: [],
  pooja: [],
  outdoor: [],
};

// All products combined
export const allProducts: Product[] = Object.values(roomProducts).flat();

// Legacy exports for backward compatibility (will be removed)
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
    text: 'I\'ve been using their pet feeder for 3 months now and my dogs love it. The elevated design is perfect and the wood has aged beautifully. Highly recommend!',
  },
  {
    id: '3',
    name: 'Anita Desai',
    location: 'Delhi, India',
    rating: 5,
    text: 'The salad bowl is absolutely stunning. It\'s become the centerpiece of our dining table. You can feel the heritage and craftsmanship in every piece from Sugan.',
  },
  {
    id: '4',
    name: 'Vikram Mehta',
    location: 'Pune, India',
    rating: 5,
    text: 'Fast delivery and the product exceeded my expectations. The serving tray is now my go-to gift for housewarmings. Beautiful work!',
  },
];

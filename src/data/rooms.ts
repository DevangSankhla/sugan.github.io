import type { Product, Testimonial, Room } from '@/types';

// Room categories for Indian homes
export const rooms: Room[] = [
 { id: 'shop-all', name: 'Shop All', icon: 'Grid3X3', description: 'Browse our complete collection' },
 { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat', description: 'Essential tools for your cooking space' },
 { id: 'living', name: 'Living Room', icon: 'Sofa', description: 'Elegant decor for your main space' },
 { id: 'bedroom', name: 'Bedroom', icon: 'Bed', description: 'Comfort and style for your personal space' },
 { id: 'dining', name: 'Dining Room', icon: 'UtensilsCrossed', description: 'Serveware and dining essentials' },
 { id: 'office', name: 'Home Office', icon: 'Laptop', description: 'Productive workspace solutions' },
 { id: 'library', name: 'Library/Study', icon: 'BookOpen', description: 'Organized spaces for reading' },
 { id: 'pooja', name: 'Pooja Room', icon: 'Sparkles', description: 'Sacred space essentials' },
 { id: 'outdoor', name: 'Outdoor/Balcony', icon: 'Sun', description: 'Open air living solutions' },
 { id: 'pet', name: 'Pet', icon: 'Heart', description: 'Premium products for your pets' },
];

// Products organized by room
export const roomProducts: Record<string, Product[]> = {
 pet: [
  {
   id: '9U-D6EU-J9Y5',
   name: 'Acacia Wood Double-Bowl Pet Feeder, X-Leg Stand',
   price: 1999,
   originalPrice: 2999,
   description: 'Handcrafted in Jodhpur from solid acacia wood, this double-bowl feeder features a signature X-leg base that keeps bowls at a comfortable height, supporting healthy posture during mealtimes. The natural wood finish is completely non-toxic and pet-safe, while the two stainless steel bowls make it easy...',
   image: '/images/9U-D6EU-J9Y5_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 190,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC041S',
        'price': 1599
    }
]
  },
  {
   id: 'BM-UQ5U-IU9U',
   name: 'Acacia Wood Double-Bowl Pet Feeder with Iron Stand',
   price: 1999,
   originalPrice: 2599,
   description: 'Solid acacia wood paired with a hand-forged iron stand gives this double-bowl feeder a warm, considered look that fits naturally into any home. The elevated position supports better digestion and posture, especially for medium-sized breeds, and the two stainless steel bowls detach easily for a thoro...',
   image: '/images/BM-UQ5U-IU9U_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 58,
   details: {
    materials: 'Acacia wood, iron',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan with a simple belief: everyday objects in your home should be beautiful, safe, and built to last. This pet feeder combines high-grade acacia wood — one of the hardest, most water-resi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'M0-5FJV-JJ1Q',
        'price': 1499
    },
    {
        'size': 'Large',
        'productId': 'ZF-S7K4-NAVG',
        'price': 2499
    }
]
  },
  {
   id: 'M0-5FJV-JJ1Q',
   name: 'Acacia Wood Double-Bowl Pet Feeder with Iron Stand',
   price: 1499,
   originalPrice: 1999,
   description: 'This compact acacia and iron pet feeder is made for smaller breeds who deserve the same quality of care as larger pets. The iron stand holds the bowls at a height that reduces strain on the neck, while the natural acacia frame brings a warmth to the feeding area that plastic alternatives simply cann...',
   image: '/images/M0-5FJV-JJ1Q_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.8,
   reviews: 90,
   details: {
    materials: 'Acacia wood, iron',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan with a simple belief: everyday objects in your home should be beautiful, safe, and built to last. This pet feeder combines high-grade acacia wood — one of the hardest, most water-resi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'BM-UQ5U-IU9U',
        'price': 1999
    },
    {
        'size': 'Large',
        'productId': 'ZF-S7K4-NAVG',
        'price': 2499
    }
]
  },
  {
   id: 'OF-T4QC-3ZZ3',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls',
   price: 1499,
   originalPrice: 3999,
   description: 'This stripe-pattern acacia crate feeder combines the warmth of natural wood with the practicality of two stainless steel bowls set into a sturdy raised frame. The crate design keeps the bowls stable and spill-resistant while adding a refined, furniture-like quality to your pet\'s space. Made in Jodh...',
   image: '/images/OF-T4QC-3ZZ3_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 156,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC08_S',
        'price': 1799
    },
    {
        'size': 'Medium',
        'productId': 'SAC08_M',
        'price': 2099
    },
    {
        'size': 'Large',
        'productId': 'SAC08_L',
        'price': 2399
    },
    {
        'size': 'Medium',
        'productId': 'TS-YFCT-J4WR',
        'price': 1799
    },
    {
        'size': 'Large (Crate)',
        'productId': 'SAC037_L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC033',
   name: 'Wooden Cat Feeder with Detachable Stainless Steel Bowls',
   price: 799,
   originalPrice: 899,
   description: 'A small wooden cat feeder with two detachable stainless steel bowls, made for kittens and cats who deserve something better than plastic at mealtimes. The natural wood stand raises the bowls to a comfortable height, reducing neck strain during eating, and the non-toxic finish keeps every meal safe. ...',
   image: '/images/SAC033_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.8,
   reviews: 147,
   details: {
    materials: 'Natural wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC034',
        'price': 999
    }
]
  },
  {
   id: 'SAC034',
   name: 'Wooden Cat Feeder with Detachable Stainless Steel Bowls',
   price: 999,
   originalPrice: 1299,
   description: 'Sized for medium cats and small dogs, this wooden feeder with two stainless steel bowls is a clean, practical alternative to plastic feeding stations. The raised stand encourages better posture and calmer eating, and the bowls detach easily for thorough daily washing. Finished with a non-toxic, food...',
   image: '/images/SAC034_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.7,
   reviews: 176,
   details: {
    materials: 'Natural wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC033',
        'price': 799
    }
]
  },
  {
   id: 'SAC037_L',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls',
   price: 2399,
   originalPrice: 3999,
   description: 'A large-format stripe crate feeder crafted from solid acacia wood, built for bigger dogs who need generous bowls at a comfortable height. The natural stripe grain pattern runs through every plank, giving each piece its own character, and the two stainless steel bowls lift out cleanly for washing. No...',
   image: '/images/SAC037L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.8,
   reviews: 187,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC08_S',
        'price': 1799
    },
    {
        'size': 'Medium',
        'productId': 'SAC08_M',
        'price': 2099
    },
    {
        'size': 'Large',
        'productId': 'SAC08_L',
        'price': 2399
    },
    {
        'size': 'Small (Crate)',
        'productId': 'OF-T4QC-3ZZ3',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'TS-YFCT-J4WR',
        'price': 1799
    }
]
  },
  {
   id: 'SAC039',
   name: 'Acacia Wood Crate Pet Feeder with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 2999,
   description: 'A well-proportioned acacia wood crate feeder with two stainless steel bowls, designed to sit comfortably in any room without looking like pet furniture. The raised frame brings bowls to the right height for medium breeds, supporting better posture and calmer mealtimes. Finished with a completely non...',
   image: '/images/SAC039_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 209,
   details: {
    materials: 'Natural wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC039S',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'SAC039M',
        'price': 1999
    },
    {
        'size': 'Large',
        'productId': 'SAC039L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC039L',
   name: 'Acacia Wood Crate Pet Feeder with Stainless Steel Bowls',
   price: 2399,
   originalPrice: 3399,
   description: 'This large acacia wood crate feeder is built for dogs who need more - more bowl space, more height, and more stability than compact feeders can offer. The solid wood frame is sturdy enough to handle enthusiastic eaters, and both stainless steel bowls remove cleanly for washing. A handcrafted piece f...',
   image: '/images/SAC039L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 148,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC039S',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'SAC039M',
        'price': 1999
    },
    {
        'size': 'Medium (Alt)',
        'productId': 'SAC039',
        'price': 1999
    }
]
  },
  {
   id: 'SAC039M',
   name: 'Acacia Wood Crate Pet Feeder with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 2999,
   description: 'Sized for medium breeds, this acacia wood crate feeder holds two stainless steel bowls at a height that encourages a relaxed, natural eating posture. The wood is sourced sustainably and finished with a non-toxic coating safe for daily food and water contact. Handmade in Jodhpur with the kind of atte...',
   image: '/images/SAC039M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.8,
   reviews: 179,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC039S',
        'price': 1499
    },
    {
        'size': 'Medium (Alt)',
        'productId': 'SAC039',
        'price': 1999
    },
    {
        'size': 'Large',
        'productId': 'SAC039L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC039S',
   name: 'Acacia Wood Crate Pet Feeder with Stainless Steel Bowls',
   price: 1499,
   originalPrice: 1999,
   description: 'A small-scale acacia crate feeder made for cats, kittens, and small-breed dogs who benefit from having their bowls lifted off the floor. The natural wood grain and clean lines give it a warmth that fits into kitchens and living areas without looking out of place. Both stainless steel bowls detach fo...',
   image: '/images/SAC039S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 153,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC039M',
        'price': 1999
    },
    {
        'size': 'Medium (Alt)',
        'productId': 'SAC039',
        'price': 1999
    },
    {
        'size': 'Large',
        'productId': 'SAC039L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC040L',
   name: 'Acacia Wood Pet Feeder Stand with Stainless Steel Bowls',
   price: 2399,
   originalPrice: 3399,
   description: 'This generously sized acacia wood feeder stand holds two large stainless steel bowls at a comfortable height for bigger breeds. The clean, minimal frame is made from solid acacia with a natural oil finish - durable, non-toxic, and free from paints or chemical lacquers. A practical, beautiful piece c...',
   image: '/images/SAC040L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.8,
   reviews: 219,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC040S',
        'price': 1999
    }
]
  },
  {
   id: 'SAC040S',
   name: 'Acacia Wood Pet Feeder Stand with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 3399,
   description: 'A paired-down acacia wood feeder with two stainless steel bowls, made for smaller pets who deserve clean materials and thoughtful design. The natural wood base is light enough to move around easily but solid enough to stay put during mealtimes. Non-toxic finish, sustainably sourced wood, handmade in...',
   image: '/images/SAC040S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.7,
   reviews: 122,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Large',
        'productId': 'SAC040L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC041S',
   name: 'Acacia Wood Double-Bowl Pet Feeder, X-Leg Stand',
   price: 1599,
   originalPrice: 3399,
   description: 'Cut from solid acacia wood and shaped by hand in Jodhpur, this compact X-leg feeder brings both function and warmth to your pet\'s corner. The raised bowl position encourages a natural eating posture, reducing neck and back strain for smaller breeds. Both stainless steel bowls lift out cleanly for w...',
   image: '/images/SAC041S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.5,
   reviews: 126,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': '9U-D6EU-J9Y5',
        'price': 1999
    }
]
  },
  {
   id: 'SAC048L',
   name: 'Marble-Top Mango Wood Pet Feeder with Stainless Steel Bowls',
   price: 2999,
   originalPrice: 3999,
   description: 'This large marble-top pet feeder pairs the warmth of mango wood with the cool elegance of natural marble in a piece that looks as much like furniture as it does a feeder. The two stainless steel bowls sit at a height suited to larger breeds, supporting healthy posture and digestion. Every marble sla...',
   image: '/images/SAC048L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 238,
   details: {
    materials: 'Mango wood',
    finish: 'Natural marble top, mineral oil finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we believed your pet deserved better than a plastic bowl on the floor. This feeder pairs hand-selected mango wood — sustainably sourced from forests across India — with a natu...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    videos: ['/videos/SAC048L_video.mp4']
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC048S',
        'price': 1999
    },
    {
        'size': 'Medium',
        'productId': 'SAC048M',
        'price': 2499
    }
]
  },
  {
   id: 'SAC048M',
   name: 'Marble-Top Mango Wood Pet Feeder with Stainless Steel Bowls',
   price: 2499,
   originalPrice: 3999,
   description: 'A medium marble-top feeder combining sustainably sourced mango wood with a genuine marble surface and two stainless steel bowls. The elevated design supports comfortable, posture-friendly eating for medium-sized dogs and cats, and the natural materials are completely free from plastics and toxic coa...',
   image: '/images/SAC048M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 141,
   details: {
    materials: 'Mango wood',
    finish: 'Natural marble top, mineral oil finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we believed your pet deserved better than a plastic bowl on the floor. This feeder pairs hand-selected mango wood — sustainably sourced from forests across India — with a natu...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    videos: ['/videos/SAC048M_video.mp4']
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC048S',
        'price': 1999
    },
    {
        'size': 'Large',
        'productId': 'SAC048L',
        'price': 2999
    }
]
  },
  {
   id: 'SAC048S',
   name: 'Marble-Top Mango Wood Pet Feeder with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 3999,
   description: 'This small marble-top pet feeder is made for cats and compact breeds who deserve beautiful materials at their daily mealtime. Natural mango wood, genuine marble, and stainless steel come together in a piece that sits comfortably on a kitchen floor without looking like an afterthought. Non-toxic thro...',
   image: '/images/SAC048S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 66,
   details: {
    materials: 'Mango wood',
    finish: 'Natural marble top, mineral oil finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we believed your pet deserved better than a plastic bowl on the floor. This feeder pairs hand-selected mango wood — sustainably sourced from forests across India — with a natu...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    videos: ['/videos/SAC048S_video.mp4']
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC048M',
        'price': 2499
    },
    {
        'size': 'Large',
        'productId': 'SAC048L',
        'price': 2999
    }
]
  },
  {
   id: 'SAC08XS',
   name: 'Acacia Wood Stripe Cat Feeder with Stainless Steel Bowls',
   price: 799,
   originalPrice: 899,
   description: 'This extra-small acacia wood cat feeder is made for kittens and small cats who need their bowls lifted just off the floor. The striped wood panels give it a refined, furniture-grade look, while the two detachable stainless steel bowls make daily cleaning quick and easy. Non-toxic finish throughout, ...',
   image: '/images/SAC08XS_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 106,
   details: {
    materials: 'Natural wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC08_L',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls - 61x30x33 cm',
   price: 2399,
   originalPrice: 2999,
   description: 'At 61 x 30 x 33 cm, this large stripe crate feeder from Jodhpur is built for bigger dogs who need generous bowls at a proper height. The acacia wood frame is solid and stable, the stripe grain gives it a distinct warmth, and both stainless steel bowls lift cleanly out of their slots for washing. A n...',
   image: '/images/SAC08L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 144,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC08_S',
        'price': 1799
    },
    {
        'size': 'Medium',
        'productId': 'SAC08_M',
        'price': 2099
    },
    {
        'size': 'Small (Crate)',
        'productId': 'OF-T4QC-3ZZ3',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'TS-YFCT-J4WR',
        'price': 1799
    },
    {
        'size': 'Large (Crate)',
        'productId': 'SAC037_L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC08_M',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls - 53x27x29 cm',
   price: 2099,
   originalPrice: 2899,
   description: 'This medium acacia stripe crate feeder, 53 x 27 x 29 cm, sits at the right height for medium breeds and comes with two removable stainless steel bowls. The natural stripe pattern across the wood panels makes every piece slightly different, and the non-toxic food-safe finish means it is as safe as it...',
   image: '/images/SAC08M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 135,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC08_S',
        'price': 1799
    },
    {
        'size': 'Large',
        'productId': 'SAC08_L',
        'price': 2399
    },
    {
        'size': 'Small (Crate)',
        'productId': 'OF-T4QC-3ZZ3',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'TS-YFCT-J4WR',
        'price': 1799
    },
    {
        'size': 'Large (Crate)',
        'productId': 'SAC037_L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC08_S',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls - 46x23x18 cm',
   price: 1799,
   originalPrice: 1999,
   description: 'Measuring 46 x 23 x 18 cm, this small acacia stripe crate feeder is a practical, beautiful solution for cats and small dogs. The striped wood panels are finished with a non-toxic coating, and the two stainless steel bowls detach easily for daily cleaning. A handcrafted piece from Jodhpur that earns ...',
   image: '/images/SAC08S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 149,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC08_M',
        'price': 2099
    },
    {
        'size': 'Large',
        'productId': 'SAC08_L',
        'price': 2399
    },
    {
        'size': 'Small (Crate)',
        'productId': 'OF-T4QC-3ZZ3',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'TS-YFCT-J4WR',
        'price': 1799
    },
    {
        'size': 'Large (Crate)',
        'productId': 'SAC037_L',
        'price': 2399
    }
]
  },
  {
   id: 'SAC09XS',
   name: 'Acacia Wood Cat Feeder with S-Leg Stand and Stainless Steel Bowls',
   price: 799,
   originalPrice: 899,
   description: 'A slim-legged extra-small cat feeder made from natural acacia wood with two detachable stainless steel bowls. The S-leg design keeps the frame light and open while still holding the bowls at a comfortable height for kittens and small cats. Non-toxic finish, easy to clean, made by hand in Jodhpur.',
   image: '/images/SAC09XS_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 239,
   details: {
    materials: 'Natural wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day — so why should it be made of cheap plastic that scratches, stains, and harbors ba...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC09_L',
   name: 'Acacia Wood Stripe Crate Pet Feeder, S-Leg Stand with Stainless Steel Bowls',
   price: 1799,
   originalPrice: 2299,
   description: 'This large S-leg acacia crate feeder brings a refined profile to your pet\'s feeding corner, with a frame that is open and airy rather than heavy. Two stainless steel bowls sit at a generous height suited to larger breeds, and both lift out cleanly for washing. Non-toxic, food-safe finish - handcraf...',
   image: '/images/SAC09L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 96,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC09_S',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'SAC09_M',
        'price': 1699
    }
]
  },
  {
   id: 'SAC09_M',
   name: 'Acacia Wood Stripe Crate Pet Feeder, S-Leg Stand with Stainless Steel Bowls',
   price: 1399,
   originalPrice: 3999,
   description: 'The S-leg design gives this medium acacia feeder a lighter, more considered look than a standard crate frame, without compromising on stability. Two removable stainless steel bowls sit at the right height for medium breeds, and the natural wood finish is completely free from toxic coatings. Made in ...',
   image: '/images/SAC09M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 140,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC09_S',
        'price': 1499
    },
    {
        'size': 'Large',
        'productId': 'SAC09_L',
        'price': 1799
    }
]
  },
  {
   id: 'SAC09_S',
   name: 'Acacia Wood Stripe Crate Pet Feeder, S-Leg Stand with Stainless Steel Bowls',
   price: 899,
   originalPrice: 1999,
   description: 'A small-format S-leg feeder in natural acacia wood, made for cats and compact breeds who need their bowls raised just enough for comfortable eating. The open frame style keeps it light and easy to place anywhere in the home, and the stainless steel bowls lift out for quick daily cleaning. Non-toxic,...',
   image: '/images/SAC09S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.6,
   reviews: 174,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC09_M',
        'price': 1699
    },
    {
        'size': 'Large',
        'productId': 'SAC09_L',
        'price': 1799
    }
]
  },
  {
   id: 'TS-YFCT-J4WR',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 3999,
   description: 'Handcrafted from solid acacia wood in Jodhpur, this medium stripe crate feeder brings a considered, home-worthy quality to your pet\'s dining space. The crate base provides stability and keeps bowls at a height that supports natural posture, while the two removable stainless steel bowls make daily f...',
   image: '/images/TS-YFCT-J4WR_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 5.0,
   reviews: 61,
   details: {
    materials: 'Acacia wood, stainless steel',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC08_S',
        'price': 1799
    },
    {
        'size': 'Medium',
        'productId': 'SAC08_M',
        'price': 2099
    },
    {
        'size': 'Large',
        'productId': 'SAC08_L',
        'price': 2399
    },
    {
        'size': 'Small (Crate)',
        'productId': 'OF-T4QC-3ZZ3',
        'price': 1499
    },
    {
        'size': 'Large (Crate)',
        'productId': 'SAC037_L',
        'price': 2399
    }
]
  },
  {
   id: 'ZF-S7K4-NAVG',
   name: 'Acacia Wood Double-Bowl Pet Feeder with Iron Stand',
   price: 2499,
   originalPrice: 2999,
   description: 'Built for larger dogs with a generous frame of solid acacia wood and a sturdy iron base, this double-bowl feeder handles daily use without fuss. The raised stance promotes a healthier eating posture, reducing the discomfort that comes from floor-level feeding for bigger breeds. Non-toxic, food-safe ...',
   image: '/images/ZF-S7K4-NAVG_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 5.0,
   reviews: 81,
   details: {
    materials: 'Acacia wood, iron',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan with a simple belief: everyday objects in your home should be beautiful, safe, and built to last. This pet feeder combines high-grade acacia wood — one of the hardest, most water-resi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'M0-5FJV-JJ1Q',
        'price': 1499
    },
    {
        'size': 'Medium',
        'productId': 'BM-UQ5U-IU9U',
        'price': 1999
    }
]
  },
 ],
 kitchen: [
  {
   id: 'SAC010',
   name: 'Acacia Wood Triangle Napkin Holder',
   price: 1099,
   originalPrice: 1299,
   description: 'Cut from solid acacia wood and shaped into a clean triangle profile, this napkin holder brings a natural elegance to any dining table or kitchen counter. The tight grain of the acacia resists moisture and food contact, making it as practical as it is decorative. Finished with a food-safe oil that ke...',
   image: '/images/SAC010_01.png',
   category: 'Napkin Holders',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 232,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The smallest objects in a home say the most about it. Sugan was built on the belief that even a napkin holder on your dining table should be made from honest materials — not plastic, not painted MDF, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC012',
   name: 'Acacia Wood Decorative Napkin Holder',
   price: 999,
   originalPrice: 1299,
   description: 'This acacia wood napkin holder is a quietly beautiful addition to the dining table - compact, well-weighted, and made from a single piece of natural hardwood. The food-safe finish means it handles the occasional splash without warping, and the warm grain of the acacia ages gracefully over time. Hand...',
   image: '/images/SAC012_01.png',
   category: 'Napkin Holders',
   room: 'kitchen',
   inStock: true,
   rating: 4.7,
   reviews: 167,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The smallest objects in a home say the most about it. Sugan was built on the belief that even a napkin holder on your dining table should be made from honest materials — not plastic, not painted MDF, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC013',
   name: 'Acacia Wood Napkin Holder Stand',
   price: 999,
   originalPrice: 999,
   description: 'A simple, well-proportioned acacia wood napkin stand that holds its shape and looks better with age. Made in Jodhpur from solid acacia with a natural oil finish, it keeps napkins accessible at the table without cluttering the surface. Food-safe, moisture-resistant, and free from synthetic coatings -...',
   image: '/images/SAC013_01.png',
   category: 'Napkin Holders',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 104,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The smallest objects in a home say the most about it. Sugan was built on the belief that even a napkin holder on your dining table should be made from honest materials — not plastic, not painted MDF, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC014',
   name: 'Acacia Wood Rectangle Serving Tray',
   price: 1099,
   originalPrice: 1299,
   description: 'This compact rectangle acacia tray is made from a single plank of solid hardwood in Jodhpur, finished with food-safe mineral oil. The clean shape and natural grain make it as practical for a snack board as it is elegant on a dining table, and the tight acacia grain resists moisture and knife marks b...',
   image: '/images/SAC014_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.7,
   reviews: 67,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC01_Combo_Set of 3-S',
   name: 'Acacia Wood Square Serving Trays, Natural Finish, Set of 3',
   price: 2499,
   originalPrice: 3299,
   description: 'Three graduating square acacia trays, each cut from solid natural hardwood and finished with food-safe mineral oil - a complete set for anyone who values both function and warmth in the kitchen. Use them stacked on the counter, layered on a dining table, or individually as serving boards, breakfast ...',
   image: '/images/SAC01COMBOSETOF3-S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 119,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC01_S',
        'price': 799
    },
    {
        'size': 'Medium',
        'productId': 'SAC01_M',
        'price': 1099
    },
    {
        'size': 'Large',
        'productId': 'SAC01_L',
        'price': 1299
    }
]
  },
  {
   id: 'SAC01_L',
   name: 'Acacia Wood Square Serving Tray, Natural Finish',
   price: 1299,
   originalPrice: 1999,
   description: 'This large square acacia tray is a versatile piece - generous enough to carry a full tea service, elegant enough to display fruit on a sideboard, and durable enough for daily kitchen use. Handcrafted in Jodhpur from solid acacia with a natural mineral oil finish, it is food-safe, moisture-resistant,...',
   image: '/images/SAC01L_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 168,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC01_S',
        'price': 799
    },
    {
        'size': 'Medium',
        'productId': 'SAC01_M',
        'price': 1099
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC01_Combo_Set of 3-S',
        'price': 2499
    }
]
  },
  {
   id: 'SAC01_M',
   name: 'Acacia Wood Square Serving Tray, Natural Finish',
   price: 1099,
   originalPrice: 1999,
   description: 'A medium square acacia serving tray with a natural grain finish, sized for everyday use as a breakfast tray, snack plate, or countertop organiser. Cut from solid acacia in Jodhpur and finished with food-safe mineral oil, it is equally at home on a dining table or a coffee table. The wood ages warmly...',
   image: '/images/SAC01M_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.7,
   reviews: 86,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC01_S',
        'price': 799
    },
    {
        'size': 'Large',
        'productId': 'SAC01_L',
        'price': 1299
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC01_Combo_Set of 3-S',
        'price': 2499
    }
]
  },
  {
   id: 'SAC01_S',
   name: 'Acacia Wood Square Serving Tray, Natural Finish',
   price: 799,
   originalPrice: 999,
   description: 'This small square acacia tray from Jodhpur is cut from a single plank of natural hardwood, finished with food-safe mineral oil, and built to handle daily use in the kitchen or on the dining table. The natural grain pattern is unique to every piece, and the acacia\'s tight wood structure resists mois...',
   image: '/images/SAC01S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 199,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC01_M',
        'price': 1099
    },
    {
        'size': 'Large',
        'productId': 'SAC01_L',
        'price': 1299
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC01_Combo_Set of 3-S',
        'price': 2499
    }
]
  },
  {
   id: 'SAC02_Combo_Set of 3-S',
   name: 'Acacia Wood Rectangle Serving Trays, Honey Finish, Set of 3',
   price: 2199,
   originalPrice: 3299,
   description: 'Three rectangle honey-finish acacia trays in graduating sizes, each made from solid natural hardwood and finished with food-safe mineral oil. The warm golden tone of the honey finish makes the set cohesive and welcoming, and the sizes cover everything from individual servings to full table spreads. ...',
   image: '/images/SAC02COMBOSETOF3-S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 81,
   details: {
    materials: 'Acacia wood',
    finish: 'Honey finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The honey finish on this tray isn\'t applied from a bottle — it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC02_S',
        'price': 899
    },
    {
        'size': 'Medium',
        'productId': 'SAC02_M',
        'price': 1199
    },
    {
        'size': 'Large',
        'productId': 'SAC02_L',
        'price': 1499
    }
]
  },
  {
   id: 'SAC02_L',
   name: 'Acacia Wood Rectangle Serving Tray, Honey Finish',
   price: 1199,
   originalPrice: 1499,
   description: 'A large honey-finish acacia serving tray built for proper entertaining - generous enough for a full charcuterie board, strong enough to carry drinks across the room, and finished beautifully enough to leave on the table as a centrepiece. Handcrafted in Jodhpur from solid acacia with a food-safe natu...',
   image: '/images/SAC02L_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 167,
   details: {
    materials: 'Acacia wood',
    finish: 'Honey finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The honey finish on this tray isn\'t applied from a bottle — it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC02_S',
        'price': 999
    },
    {
        'size': 'Medium',
        'productId': 'SAC02_M',
        'price': 1099
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC02_Combo_Set of 3-S',
        'price': 2199
    }
]
  },
  {
   id: 'SAC02_M',
   name: 'Acacia Wood Rectangle Serving Tray, Honey Finish',
   price: 1099,
   originalPrice: 1299,
   description: 'This medium rectangle honey-finish tray is a kitchen and dining staple - the right size for a breakfast spread, an afternoon tea, or a curated charcuterie arrangement. Made from solid acacia with a warm honey-toned natural finish, it is food-safe, moisture-resistant, and handcrafted in Jodhpur with ...',
   image: '/images/SAC02M_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.7,
   reviews: 126,
   details: {
    materials: 'Acacia wood',
    finish: 'Honey finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The honey finish on this tray isn\'t applied from a bottle — it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC02_S',
        'price': 999
    },
    {
        'size': 'Large',
        'productId': 'SAC02_L',
        'price': 1199
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC02_Combo_Set of 3-S',
        'price': 2199
    }
]
  },
  {
   id: 'SAC02_S',
   name: 'Acacia Wood Rectangle Serving Tray, Honey Finish',
   price: 999,
   originalPrice: 999,
   description: 'A small honey-finish acacia tray with the warm, golden tone that comes from careful kiln-drying and natural oil finishing. Compact enough for a single serving or a set of condiments, it is made in Jodhpur from solid acacia and finished to food-safe standards. The honey colour deepens with regular oi...',
   image: '/images/SAC02S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.6,
   reviews: 77,
   details: {
    materials: 'Acacia wood',
    finish: 'Honey finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The honey finish on this tray isn\'t applied from a bottle — it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC02_M',
        'price': 1099
    },
    {
        'size': 'Large',
        'productId': 'SAC02_L',
        'price': 1199
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC02_Combo_Set of 3-S',
        'price': 2199
    }
]
  },
  {
   id: 'SAC03-Antique Checkers-Set of 3',
   name: 'Acacia Wood Antique Checkers Rectangle Serving Trays, Set of 3',
   price: 2499,
   originalPrice: 2999,
   description: 'Three antique checkers rectangle trays in graduating sizes, each built from alternating light and dark acacia planks for a natural geometric pattern that needs no paint or decoration. The full set covers individual servings to generous table spreads, and every surface is finished with food-safe mine...',
   image: '/images/SAC03-ANTIQUECHECKERS-SETOF3_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 77,
   details: {
    materials: 'Acacia wood',
    finish: 'Antique checkers finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC03_S',
        'price': 799
    },
    {
        'size': 'Medium',
        'productId': 'SAC03_M',
        'price': 1099
    },
    {
        'size': 'Large',
        'productId': 'SAC03_L',
        'price': 1299
    }
]
  },
  {
   id: 'SAC036',
   name: 'Mango Wood Stripe Chopping and Serving Board, Brown',
   price: 999,
   originalPrice: 1999,
   description: 'A mango wood stripe cutting and serving board with a unique shape and a rich brown-toned grain. The stripe pattern is created from alternating planks of natural mango wood, and the food-safe finish means it goes straight from prep to table. Made in Jodhpur from sustainably sourced mango - a wood har...',
   image: '/images/SAC036_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 147,
   details: {
    materials: 'Mango wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods — and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from hig...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC03_L',
   name: 'Acacia Wood Antique Checkers Rectangle Serving Tray',
   price: 1299,
   originalPrice: 1799,
   description: 'This large antique checkers tray makes a statement at the dining table with its alternating light and dark acacia grain pattern, created without dyes or synthetic finishes. The full surface is food-safe and flat-finished, making it as practical for serving as it is beautiful as a standalone piece. H...',
   image: '/images/SAC03L_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.6,
   reviews: 98,
   details: {
    materials: 'Natural wood',
    finish: 'Antique checkers finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC03_S',
        'price': 799
    },
    {
        'size': 'Medium',
        'productId': 'SAC03_M',
        'price': 1199
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC03-Antique Checkers-Set of 3',
        'price': 2499
    }
]
  },
  {
   id: 'SAC03_M',
   name: 'Acacia Wood Antique Checkers Rectangle Serving Tray',
   price: 1199,
   originalPrice: 1599,
   description: 'A medium antique checkers acacia tray that brings visual interest to the table without any artificial decoration - the pattern comes entirely from alternating light and dark acacia planks. Sized for a generous snack spread or afternoon tea, it is finished with food-safe mineral oil and made by hand ...',
   image: '/images/SAC03M_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.7,
   reviews: 223,
   details: {
    materials: 'Natural wood',
    finish: 'Antique checkers finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC03_S',
        'price': 799
    },
    {
        'size': 'Large',
        'productId': 'SAC03_L',
        'price': 1299
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC03-Antique Checkers-Set of 3',
        'price': 2499
    }
]
  },
  {
   id: 'SAC03_S',
   name: 'Acacia Wood Antique Checkers Rectangle Serving Tray',
   price: 799,
   originalPrice: 1099,
   description: 'The antique checkers pattern on this small acacia tray is created by laying alternating planks of lighter and darker acacia wood side by side, then finishing the whole surface flush. The result is a tray with geometric character that is still entirely natural - no dyes, no paint, just the contrast b...',
   image: '/images/SAC03S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 78,
   details: {
    materials: 'Natural wood',
    finish: 'Antique checkers finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsi...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC03_M',
        'price': 1199
    },
    {
        'size': 'Large',
        'productId': 'SAC03_L',
        'price': 1299
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC03-Antique Checkers-Set of 3',
        'price': 2499
    }
]
  },
  {
   id: 'SAC04-Natural Tray-Set of 3',
   name: 'Acacia Wood Rectangle Serving Trays, Natural Finish, Set of 3',
   price: 2199,
   originalPrice: 2999,
   description: 'Three natural acacia rectangle trays in graduating sizes, each made from solid hardwood and finished with food-safe mineral oil in Jodhpur. The set works together as a layered table display or independently for everyday kitchen use - breakfast trays, snack boards, counter organisers. Sustainably sou...',
   image: '/images/SAC04-NATURALTRAY-SETOF3_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 136,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC04_S',
        'price': 799
    },
    {
        'size': 'Medium',
        'productId': 'SAC04_M',
        'price': 999
    },
    {
        'size': 'Large',
        'productId': 'SAC04_L',
        'price': 1299
    }
]
  },
  {
   id: 'SAC043',
   name: 'Acacia Wood and Epoxy Rectangle Chopping and Serving Board',
   price: 999,
   originalPrice: 1299,
   description: 'Acacia wood with a food-safe epoxy accent - this rectangular chopping and serving board brings a modern edge to a natural material. The acacia provides a hard, anti-microbial cutting surface, and the epoxy fill adds visual depth without compromising safety. BPA-free, food-safe throughout, handcrafte...',
   image: '/images/SAC043_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 221,
   details: {
    materials: 'Acacia wood, food-safe epoxy resin',
    finish: 'Natural grain with epoxy accent',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We built Sugan because we wanted India\'s kitchens to look as good as they cook. This board pairs premium acacia wood — sustainably sourced, naturally anti-bacterial, and harder than most Indian hardw...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC044',
   name: 'Acacia Wood Rectangle Chopping and Serving Board',
   price: 999,
   originalPrice: 1299,
   description: 'A straightforward, well-made acacia rectangle chopping board with a food-safe mineral oil finish and a surface tough enough for daily prep work. The tight grain of the acacia resists deep knife marks and moisture absorption, keeping the board hygienic with simple care. Handcrafted in Jodhpur from su...',
   image: '/images/SAC044_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 162,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we were tired of seeing Indian kitchens filled with plastic boards that warp, stain, and end up in landfills within a year. This board is hand-crafted from premium acacia wood...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC045',
   name: 'Acacia and Mango Wood Striped Rectangle Chopping Board',
   price: 999,
   originalPrice: 1299,
   description: 'This acacia and mango wood striped chopping board pairs two complementary hardwoods side by side, creating a natural colour contrast without dyes or stains. Both woods are food-safe and anti-microbial, and the board is finished with mineral oil throughout. A practical, honest piece made in Jodhpur t...',
   image: '/images/SAC045_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 170,
   details: {
    materials: 'Acacia/Mango wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods — and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from hig...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC046',
   name: 'Acacia and Mango Wood Stripe Rectangle Chopping Board',
   price: 1099,
   originalPrice: 1299,
   description: 'The stripe pattern on this acacia and mango wood board runs along the length of the cutting surface, the result of joining alternating planks of two naturally different hardwoods. Both are food-safe, anti-microbial, and finished with natural mineral oil - no plastics, no synthetic coatings. A durabl...',
   image: '/images/SAC046_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 194,
   details: {
    materials: 'Acacia/Mango wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods — and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from hig...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC047',
   name: 'Acacia Wood Rectangle Chopping Board with Handles, 56x30x3 cm',
   price: 1199,
   originalPrice: 1599,
   description: 'At 56 x 30 x 3 cm with integrated handles, this large acacia cutting board is built for serious kitchen use. The solid hardwood surface handles daily chopping and doubles as a serving platter for meat, cheese, or bread without needing any extra preparation. Food-safe, anti-microbial, and finished wi...',
   image: '/images/SAC047_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 166,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we were tired of seeing Indian kitchens filled with plastic boards that warp, stain, and end up in landfills within a year. This board is hand-crafted from premium acacia wood...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC04_L',
   name: 'Acacia Wood Rectangle Serving Tray, Natural Finish',
   price: 1199,
   originalPrice: 1499,
   description: 'A large natural rectangle acacia tray, handcrafted in Jodhpur from solid hardwood and finished with food-safe mineral oil. Generous enough for a full dinner spread or a styled charcuterie board, it holds its shape and improves in tone with every oiling. A genuinely useful piece made with real craft ...',
   image: '/images/SAC04L_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 173,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC04_S',
        'price': 999
    },
    {
        'size': 'Medium',
        'productId': 'SAC04_M',
        'price': 1099
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC04-Natural Tray-Set of 3',
        'price': 2199
    }
]
  },
  {
   id: 'SAC04_M',
   name: 'Acacia Wood Rectangle Serving Tray, Natural Finish',
   price: 1099,
   originalPrice: 1399,
   description: 'This medium natural rectangle acacia tray is the everyday workhorse of the kitchen - the right size for breakfast, snacks, or carrying two mugs of tea across the room. Made from solid acacia in Jodhpur with a food-safe mineral oil finish, it handles regular use without warping or fading. The natural...',
   image: '/images/SAC04M_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.7,
   reviews: 243,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC04_S',
        'price': 999
    },
    {
        'size': 'Large',
        'productId': 'SAC04_L',
        'price': 1199
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC04-Natural Tray-Set of 3',
        'price': 2199
    }
]
  },
  {
   id: 'SAC04_S',
   name: 'Acacia Wood Rectangle Serving Tray, Natural Finish',
   price: 999,
   originalPrice: 999,
   description: 'A small natural acacia rectangle tray with a clean, unfussy grain and a food-safe mineral oil finish. Made in Jodhpur from a single slab of solid acacia, it is compact enough for individual servings but durable enough for years of daily use. The natural tone of the wood suits any kitchen style, from...',
   image: '/images/SAC04S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.5,
   reviews: 243,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC04_M',
        'price': 1099
    },
    {
        'size': 'Large',
        'productId': 'SAC04_L',
        'price': 1199
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC04-Natural Tray-Set of 3',
        'price': 2199
    }
]
  },
  {
   id: 'SAC05_L',
   name: 'Acacia Wood Hand-Carved Round Serving Bowl, Natural Grain',
   price: 1199,
   originalPrice: 1999,
   description: 'A large hand-carved acacia serving bowl made for the dining table - wide enough for a full salad, a fruit centrepiece, or a shared snack spread for four to six. Finished with food-safe mineral oil and carved from solid acacia in Jodhpur, the natural grain runs deep and the bowl improves in richness ...',
   image: '/images/SAC05L_01.png',
   category: 'Serving Bowls',
   room: 'kitchen',
   inStock: true,
   rating: 4.6,
   reviews: 220,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'A serving bowl is one of the most used objects in an Indian kitchen — so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC05_S',
        'price': 799
    },
    {
        'size': 'Medium',
        'productId': 'SAC05_M',
        'price': 1099
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC05_Pack of 3',
        'price': 2399
    }
]
  },
  {
   id: 'SAC05_M',
   name: 'Acacia Wood Hand-Carved Round Serving Bowl, Natural Grain',
   price: 1099,
   originalPrice: 1299,
   description: 'This medium hand-carved acacia wood bowl is the right size for a generous fruit arrangement, a salad for two, or a bowl of snacks on the coffee table. Finished with food-safe mineral oil and completely free from synthetic coatings, it handles daily contact with food safely and looks better with ever...',
   image: '/images/SAC05M_01.png',
   category: 'Serving Bowls',
   room: 'kitchen',
   inStock: true,
   rating: 4.8,
   reviews: 58,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'A serving bowl is one of the most used objects in an Indian kitchen — so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC05_S',
        'price': 799
    },
    {
        'size': 'Large',
        'productId': 'SAC05_L',
        'price': 1199
    }
]
  },
  {
   id: 'SAC05_Pack of 3',
   name: 'Acacia Wood Hand-Carved Round Serving Bowls, Natural Grain, Set of 3',
   price: 2399,
   originalPrice: 3999,
   description: 'Three hand-carved acacia serving bowls in small, medium, and large - a complete set for the table, counter, and sideboard. Each bowl is finished with food-safe mineral oil and carries its own natural grain pattern, making the set cohesive but never identical. Handcrafted in Jodhpur from sustainably ...',
   image: '/images/SAC05PACKOF3_01.png',
   category: 'Serving Bowls',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 142,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'A serving bowl is one of the most used objects in an Indian kitchen — so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC05_S',
        'price': 899
    },
    {
        'size': 'Medium',
        'productId': 'SAC05_M',
        'price': 1199
    },
    {
        'size': 'Large',
        'productId': 'SAC05_L',
        'price': 1499
    }
]
  },
  {
   id: 'SAC05_S',
   name: 'Acacia Wood Hand-Carved Round Serving Bowl, Natural Grain',
   price: 799,
   originalPrice: 1099,
   description: 'Hand-carved in Jodhpur from solid acacia wood, this small serving bowl is finished smooth with food-safe mineral oil, making it safe for direct contact with fruit, nuts, salads, and dry snacks. The natural honey-to-dark-brown grain variation across the surface is unique to every piece - a result of ...',
   image: '/images/SAC05S_01.png',
   category: 'Serving Bowls',
   room: 'kitchen',
   inStock: true,
   rating: 4.6,
   reviews: 79,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'A serving bowl is one of the most used objects in an Indian kitchen — so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC05_M',
        'price': 1099
    },
    {
        'size': 'Large',
        'productId': 'SAC05_L',
        'price': 1199
    }
,    {
        'size': 'Set of 3',
        'productId': 'SAC05_Pack of 3',
        'price': 2399
    }
]
  },
  {
   id: 'SAC06',
   name: 'Acacia Wood Heart-Shape Charcuterie and Chopping Board, BPA-Free',
   price: 899,
   originalPrice: 1499,
   description: 'Cut into a heart shape from solid acacia wood, this chopping and charcuterie board is as expressive as it is functional. Acacia is naturally anti-microbial and BPA-free, and the food-safe finish keeps the surface safe for direct contact with food without the use of plastic coatings. Handcrafted in J...',
   image: '/images/SAC06_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 232,
   details: {
    materials: 'Acacia wood',
    finish: 'Dark brown finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Some objects in a kitchen are tools. This one is a statement. Sugan was born from the belief that India deserves everyday products that are plastic-free, chemical-free, and genuinely beautiful. Hand-c...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC07',
   name: 'Acacia Wood Stripe Crate Trays, White, Set of 3',
   price: 2599,
   originalPrice: 2999,
   description: 'Three white stripe acacia crate trays in small, medium, and large - a practical and adaptable set for organising and displaying around the home. Each tray is made from solid acacia in Jodhpur with a non-toxic white finish, and the open-slat sides give them a light, airy quality that works in kitchen...',
   image: '/images/SAC07_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 118,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC07_S',
        'price': 599
    },
    {
        'size': 'Medium',
        'productId': 'SAC07_M',
        'price': 899
    },
    {
        'size': 'Large',
        'productId': 'SAC07_L',
        'price': 1099
    }
]
  },
  {
   id: 'SAC07_L',
   name: 'Acacia Wood Stripe Crate Tray, White',
   price: 1099,
   originalPrice: 1999,
   description: 'This large white stripe acacia crate tray is built to carry more - a full breakfast spread, a collection of plants, or a styled arrangement on a sideboard. The natural acacia frame is finished with non-toxic white paint that keeps its tone without chipping or peeling with regular use. Handcrafted in...',
   image: '/images/SAC07L_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 88,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC07_S',
        'price': 599
    },
    {
        'size': 'Medium',
        'productId': 'SAC07_M',
        'price': 899
    }
]
  },
  {
   id: 'SAC07_M',
   name: 'Acacia Wood Stripe Crate Tray, White',
   price: 899,
   originalPrice: 1499,
   description: 'A medium stripe acacia crate tray in white, made for organising the kitchen counter, carrying items around the home, or presenting products as a gift. The open-slat sides keep it light and airy, while the solid acacia base and frame give it enough structure to handle daily use. Non-toxic finish, han...',
   image: '/images/SAC07M_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 116,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Small',
        'productId': 'SAC07_S',
        'price': 599
    },
    {
        'size': 'Large',
        'productId': 'SAC07_L',
        'price': 1099
    }
]
  },
  {
   id: 'SAC07_S',
   name: 'Acacia Wood Stripe Crate Tray, White',
   price: 599,
   originalPrice: 999,
   description: 'This small white stripe acacia crate tray is made from natural hardwood with a clean, painted white frame and open-slat sides. Lightweight and versatile, it works as a counter organiser, a decorative tray, or a styled gift holder. Made in Jodhpur from sustainably sourced acacia, finished with non-to...',
   image: '/images/SAC07S_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 4.9,
   reviews: 125,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jod...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   },
   relatedSizes: [
    {
        'size': 'Medium',
        'productId': 'SAC07_M',
        'price': 899
    },
    {
        'size': 'Large',
        'productId': 'SAC07_L',
        'price': 1099
    }
]
  },
  {
   id: 'SAC024',
   name: 'Mango Wood Rectangle Chopping and Serving Board, Dark Brown',
   price: 999,
   originalPrice: 1599,
   description: 'This mango wood rectangular cutting and serving platter has a rich dark-brown finish and a generous surface for vegetables, fruit, and cheese. Mango wood is a sustainable choice - it is harvested from fruit trees at the end of their productive life - and the natural grain gives each board a distinct...',
   image: '/images/SAC024_01.png',
   category: 'Chopping & Serving Boards',
   room: 'kitchen',
   inStock: false,
   rating: 4.5,
   reviews: 84,
   details: {
    materials: 'Mango wood',
    finish: 'Dark brown finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods — and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from hig...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
 ],
 living: [
  {
   id: 'SAC020',
   name: 'Foldable Round Acacia Wood Side Table, Natural Finish',
   price: 1799,
   originalPrice: 3499,
   description: 'This foldable round side table in natural acacia is handcrafted in Jodhpur with a design that moves easily between living room, bedroom, and balcony. The fold-flat base makes it easy to store when not in use, and the solid wood top is finished with a natural oil that protects the surface and brings ...',
   image: '/images/SAC020_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.6,
   reviews: 65,
   details: {
    materials: 'Natural wood',
    finish: 'Natural grain finish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'A good side table should disappear into your room — and this one does, until you look closely and realise how well it\'s made. Sugan was built to bring premium, plastic-free woodcraft into Indian home...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC021',
   name: 'Foldable Round Acacia Wood Side Table, Grey Wash',
   price: 1799,
   originalPrice: 3399,
   description: 'The grey-wash finish on this foldable round side table gives the acacia wood a soft, cooled tone that works well in both contemporary and neutral interiors. Handcrafted in Jodhpur, it folds flat for storage and opens to a stable working surface for a cup, a book, or a bedside lamp. Finished with a n...',
   image: '/images/SAC021_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.8,
   reviews: 76,
   details: {
    materials: 'Natural wood',
    finish: 'Grey wash finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Grey wash is not a coat of paint — it\'s a slow, patient process that our artisans in Jodhpur apply by hand to bring out the natural grain of the wood while giving it a contemporary muted tone. This f...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC022',
   name: 'Foldable Round Acacia Wood Side Table, Dark Brown',
   price: 1799,
   originalPrice: 3999,
   description: 'This dark-brown foldable round side table is made from solid acacia wood in Jodhpur, with a rich, deep-toned finish that suits warm-toned and darker interiors equally well. The fold-flat mechanism makes it easy to move between rooms or store away, and the natural oil finish protects the wood without...',
   image: '/images/SAC022_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.9,
   reviews: 187,
   details: {
    materials: 'Natural wood',
    finish: 'Dark brown finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Dark, rich, and unmistakably handmade — this side table carries the character of the wood it\'s made from. At Sugan, we source high-grade natural wood from forests across India and finish each piece b...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC030',
   name: 'Rajasthani Hand-Embossed Multicolour Wooden Serving Tray',
   price: 999,
   originalPrice: 2199,
   description: 'Hand-embossed and painted by artisans in Jodhpur using traditional Rajasthani techniques, this multicoloured wooden serving tray carries centuries of craft in its surface. Each tray is made individually, which means small variations in colour and pattern are natural signs of a handmade object rather...',
   image: '/images/SAC030_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: true,
   rating: 5.0,
   reviews: 150,
   details: {
    materials: 'Natural wood',
    finish: 'Hand-painted Rajasthani artwork',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Every tray Sugan makes carries the spirit of Jodhpur with it. This hand-embossed, hand-painted tray is made by master artisans who have spent their lives practising the traditional Rajasthani craft of...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
 ],
 bedroom: [
  {
   id: 'SAC026',
   name: 'Hand-Painted Rajasthani Wooden Jewellery and Storage Box, 2.5 kg',
   price: 1999,
   originalPrice: 1999,
   description: 'This hand-painted Rajasthani wooden box is made by artisans in Jodhpur using traditional motifs passed down through generations of craft. The exterior is decorated with vivid, detailed artwork in the classic Rajasthani palette, and the interior is lined and sized for jewellery, small accessories, or...',
   image: '/images/SAC026_01.png',
   category: 'Storage & Boxes',
   room: 'bedroom',
   inStock: true,
   rating: 4.7,
   reviews: 109,
   details: {
    materials: 'Natural wood',
    finish: 'Hand-painted Rajasthani artwork',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Jodhpur has been painting stories onto wood for longer than most cities have existed. This jewellery and storage box carries that tradition — hand-painted by skilled Rajasthani artisans with tradition...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
 ],
 pooja: [
  {
   id: 'SAC031',
   name: 'Rajasthani Hand-Painted Wooden Bajot Chowki with Brass Plating',
   price: 2199,
   originalPrice: 2599,
   description: 'This square bajot chowki is made from solid wood and hand-decorated with traditional Rajasthani artwork, then finished with brass plating on the frame details. Made in Jodhpur by artisans who have carried this craft for generations, it is used traditionally as a seat or altar surface in pooja and ho...',
   image: '/images/SAC031_01.png',
   category: 'Pooja & Temple',
   room: 'pooja',
   inStock: true,
   rating: 4.8,
   reviews: 178,
   details: {
    materials: 'Natural wood',
    finish: 'Hand-painted Rajasthani artwork',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'The chowki is the most sacred surface in an Indian home — and at Sugan, we believe it should reflect that. This bajot is hand-crafted in Jodhpur from high-grade natural wood, with brass-plated detaili...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC032-NEW',
   name: 'Rajasthani Hand-Painted Wooden Bajot Chowki for Pooja',
   price: 1999,
   originalPrice: 2599,
   description: 'A square bajot chowki handcrafted in Jodhpur with vivid hand-painted Rajasthani artwork across its surface and solid wood construction throughout. Used traditionally as a ceremonial seat or altar platform in pooja rooms and home temples, this piece carries the colour and spirit of Rajasthani craft i...',
   image: '/images/SAC032-NEW_01.png',
   category: 'Pooja & Temple',
   room: 'pooja',
   inStock: true,
   rating: 4.7,
   reviews: 110,
   details: {
    materials: 'Natural wood',
    finish: 'Hand-painted Rajasthani artwork',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'Some objects carry meaning beyond their function. This chowki is one of them. Sugan was started in Jodhpur — a city where the tradition of hand-painted, hand-carved religious woodcraft runs centuries ...',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
 ],
 dining: [],
 office: [],
 library: [],
 outdoor: [],
};

// All products combined
export const allProducts: Product[] = Object.values(roomProducts).flat();

export function isSetProduct(p: { name: string }): boolean {
  return p.name.toLowerCase().includes('set of') || p.name.toLowerCase().includes('pack of');
}

// ============================================
// SIZE VARIANT HELPERS
// ============================================

// Get base product name (remove size indicators)
export function getBaseProductName(name: string): string {
  // Remove common size suffixes and patterns
  // Handle patterns like " - 46x23x18 cm" or " - Small" or "(Large)"
  return name
    .replace(/,\s*(Small|Medium|Large|Extra Small|XS|S|M|L)(?:\s*[-–]\s*\d+[xX]?\d*\s*cm)?$/i, '')
    .replace(/\s*-\s*(Small|Medium|Large|Extra Small|XS|S|M|L)(?:\s*[-–]\s*\d+[xX]?\d*\s*cm)?$/i, '')
    .replace(/\s*\(\s*(Small|Medium|Large|Extra Small|XS|S|M|L)\s*\)/i, '')
    .replace(/\s*[-–]\s*\d+\s*x\s*\d+\s*x?\s*\d*\s*cm$/i, '') // Remove "- 46x23x18 cm" or "- 53x27x29 cm"
    .trim();
}



// Check if a product ID follows the standard pattern (PREFIX_S, PREFIX_M, PREFIX_L, etc.)
function hasStandardSizePattern(id: string): boolean {
  return /^[A-Z0-9]+_[SMLX]+$/.test(id);
}

// Check if a product has siblings with standard size patterns
function hasStandardSiblings(productId: string): boolean {
  const idPrefix = productId.split('_')[0];
  if (!idPrefix || !productId.includes('_')) return false;
  
  return allProducts.some(p => {
    if (p.id === productId) return false;
    const pPrefix = p.id.split('_')[0];
    return pPrefix === idPrefix && hasStandardSizePattern(p.id);
  });
}

// Get all products in the same family (products with the same ID prefix OR linked via relatedSizes)
// e.g., SAC08_S, SAC08_M, SAC08_L are in the same family
function getProductFamily(product: Product): Product[] {
  // Strategy 1: Check for products with the same ID prefix and size suffix
  // e.g., SAC08_S, SAC08_M, SAC08_L
  const idPrefix = product.id.split('_')[0];
  if (idPrefix && product.id.includes('_')) {
    const siblings = allProducts.filter(p => {
      if (p.id === product.id) return false;
      const pPrefix = p.id.split('_')[0];
      // Match prefix and ensure the product has a size suffix
      return pPrefix === idPrefix && hasStandardSizePattern(p.id);
    });
    
    if (siblings.length > 0) {
      // Return all products with the same prefix
      return allProducts.filter(p => {
        const pPrefix = p.id.split('_')[0];
        return pPrefix === idPrefix;
      });
    }
  }
  
  // Strategy 2: Use relatedSizes for products without standard pattern siblings
  // This handles: M0-5FJV-JJ1Q family and standalone products like SAC037_L
  const isSetProduct = product.name.toLowerCase().includes('set of') || 
                       product.name.toLowerCase().includes('pack of');
  
  if (product.relatedSizes && product.relatedSizes.length > 0) {
    const relatedIds = new Set<string>();
    
    product.relatedSizes.forEach(rs => {
      // For Set/Pack products, include all related sizes even if they have standard siblings
      // (This allows SAC07 Set of 3 to link to SAC07_S/M/L)
      if (isSetProduct || !hasStandardSiblings(rs.productId)) {
        relatedIds.add(rs.productId);
      }
    });
    
    // Also find products that link back to this one
    allProducts.forEach(p => {
      if (p.relatedSizes?.some(rs => rs.productId === product.id)) {
        const pIsSet = p.name.toLowerCase().includes('set of') || 
                       p.name.toLowerCase().includes('pack of');
        // Include if it's a set product linking to us, or if it doesn't have standard siblings
        if (isSetProduct || pIsSet || !hasStandardSiblings(p.id)) {
          relatedIds.add(p.id);
        }
      }
    });
    
    if (relatedIds.size > 0) {
      const related = allProducts.filter(p => relatedIds.has(p.id));
      return [product, ...related];
    }
  }
  
  // No family found
  return [product];
}

// Get the display product for shop pages (small variant if available)
export function getDisplayProduct(product: Product): Product {
  const family = getProductFamily(product);
  if (family.length <= 1) return product;
  
  // Find the small variant
  const smallVariant = family.find(p => {
    const id = p.id.toLowerCase();
    const name = p.name.toLowerCase();
    return id.endsWith('s') || name.includes('small');
  });
  
  return smallVariant || product;
}

// Get all size variants for a product family
export function getAllSizeVariants(product: Product): { size: string; product: Product }[] {
  const family = getProductFamily(product);
  if (family.length <= 1) return [];
  
  // Sort: Small first, then Medium, then Large
  const sizeOrder: { [key: string]: number } = { 'small': 1, 'medium': 2, 'large': 3, 'extra small': 0, 'xs': 0 };
  
  return family
    .map(p => {
      // First check this product's relatedSizes for the size label
      const relatedEntry = product.relatedSizes?.find(rs => rs.productId === p.id);
      if (relatedEntry) {
        return { size: relatedEntry.size, product: p };
      }
      
      // Check if the target product's relatedSizes contains this product
      const otherRelatedEntry = p.relatedSizes?.find(rs => rs.productId === product.id);
      if (otherRelatedEntry) {
        // Look for this product's entry in its own relatedSizes
        const selfEntry = p.relatedSizes?.find(rs => rs.productId === p.id);
        if (selfEntry) return { size: selfEntry.size, product: p };
      }
      
      // Search all products in the family for relatedSizes entries that reference this product
      for (const familyProduct of family) {
        if (familyProduct.relatedSizes) {
          const entry = familyProduct.relatedSizes.find(rs => rs.productId === p.id);
          if (entry) {
            return { size: entry.size, product: p };
          }
        }
      }
      
      // Fallback to detecting from name/ID
      let size = 'Standard';
      const id = p.id.toLowerCase();
      const name = p.name.toLowerCase();
      
      if (name.includes('set of 3') || name.includes('pack of 3')) size = 'Set of 3';
      else if (name.includes('extra small') || id.includes('xs')) size = 'Extra Small';
      else if (name.includes('small') || id.endsWith('_s')) size = 'Small';
      else if (name.includes('medium') || id.endsWith('_m')) size = 'Medium';
      else if (name.includes('large') || id.endsWith('_l')) size = 'Large';
      
      return { size, product: p };
    })
    .sort((a, b) => (sizeOrder[a.size.toLowerCase()] || 99) - (sizeOrder[b.size.toLowerCase()] || 99));
}

// Check if product has size variants
export function hasSizeVariants(product: Product): boolean {
  return getProductFamily(product).length > 1;
}

// Get size variant count
export function getSizeVariantCount(product: Product): number {
  return getProductFamily(product).length;
}

// Legacy exports
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

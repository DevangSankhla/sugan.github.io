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
 { id: 'wall', name: 'Wall Shelves', icon: 'Frame', description: 'Handcrafted wall shelves and displays' }
];

// Products organized by room
export const roomProducts: Record<string, Product[]> = {
 pet: [
  {
   id: 'SAC033',
   name: 'Wooden Cat Feeder with Detachable Stainless Steel Bowls',
   price: 999,
   originalPrice: 899,
   description: 'A small wooden cat feeder with two detachable stainless steel bowls, made for kittens and cats who deserve something better than plastic at mealtimes. The natural wood stand raises the bowls to a comfortable height, reducing neck strain during eating, and the non-toxic finish keeps every meal safe for your pet and your home.',
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
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
   description: 'Sized for medium cats and small dogs, this wooden feeder with two stainless steel bowls is a clean, practical alternative to plastic feeding stations. The raised stand encourages better posture and calmer eating, and the bowls detach easily for thorough daily washing. Finished with a non-toxic, food-safe coating.',
   image: '/images/SAC034_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `39×23×20 cm, 1.8 L

Pet shoulder height: ~30–45 cm
Pet weight: ~8–18 kg
Category: Medium dogs, or large/adult cats that eat a lot.
Breeds: Beagle, Cocker Spaniel, French Bulldog, medium Indie/Pariah dogs
Also works for: Maine Coon or other large cat breeds if you want a multi-day refill setup.
Food math: ~1.8 L = ~4–6 days for a 12 kg dog, well over a week for a cat.`
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
   id: 'SAC039',
   name: 'Acacia Wood Crate Pet Feeder with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 2999,
   description: 'A well-proportioned acacia wood crate feeder with two stainless steel bowls, designed to sit comfortably in any room without looking like pet furniture. The raised frame brings bowls to the right height for medium breeds, supporting better posture and calmer mealtimes. Finished with a completely non-toxic and safe for daily use.',
   image: '/images/SAC039_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `39×23×20 cm, 1.8 L

Pet shoulder height: ~30–45 cm
Pet weight: ~8–18 kg
Category: Medium dogs, or large/adult cats that eat a lot.
Breeds: Beagle, Cocker Spaniel, French Bulldog, medium Indie/Pariah dogs
Also works for: Maine Coon or other large cat breeds if you want a multi-day refill setup.
Food math: ~1.8 L = ~4–6 days for a 12 kg dog, well over a week for a cat.`
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
   description: 'This large acacia wood crate feeder is built for dogs who need more - more bowl space, more height, and more stability than compact feeders can offer. The solid wood frame is sturdy enough to handle enthusiastic eaters, and both stainless steel bowls remove cleanly for washing. A handcrafted piece from Jodhpur.',
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `50×29×26 cm, 2.5 L

Pet shoulder height: ~45–65 cm
Pet weight: ~20–35 kg
Category: Medium-to-large dogs only. Overkill for cats.
Breeds: Labrador Retriever, Golden Retriever, German Shepherd, Boxer
Food math: A 25 kg Lab eats ~300–400 g/day (~500–700 ml dry kibble volume), so 2.5 L = ~3–4 days of food. Decent buffer.`
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
   description: 'Sized for medium breeds, this acacia wood crate feeder holds two stainless steel bowls at a height that encourages a relaxed, natural eating posture. The wood is sourced sustainably and finished with a non-toxic coating safe for daily food and water contact. Handmade in Jodhpur with the kind of attention that only handmade objects receive.',
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `39×23×20 cm, 1.8 L

Pet shoulder height: ~30–45 cm
Pet weight: ~8–18 kg
Category: Medium dogs, or large/adult cats that eat a lot.
Breeds: Beagle, Cocker Spaniel, French Bulldog, medium Indie/Pariah dogs
Also works for: Maine Coon or other large cat breeds if you want a multi-day refill setup.
Food math: ~1.8 L = ~4–6 days for a 12 kg dog, well over a week for a cat.`
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
   description: 'A small-scale acacia crate feeder made for cats, kittens, and small-breed dogs who benefit from having their bowls lifted off the floor. The natural wood grain and clean lines give it a warmth that fits into kitchens and living areas without looking out of place. Both stainless steel bowls detach for easy cleaning.',
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
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
   description: 'This generously sized acacia wood feeder stand holds two large stainless steel bowls at a comfortable height for bigger breeds. The clean, minimal frame is made from solid acacia with a natural oil finish - durable, non-toxic, and free from paints or chemical lacquers. A practical, beautiful piece crafted to last.',
   image: '/images/SAC040L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `50×29×26 cm, 2.5 L

Pet shoulder height: ~45–65 cm
Pet weight: ~20–35 kg
Category: Medium-to-large dogs only. Overkill for cats.
Breeds: Labrador Retriever, Golden Retriever, German Shepherd, Boxer
Food math: A 25 kg Lab eats ~300–400 g/day (~500–700 ml dry kibble volume), so 2.5 L = ~3–4 days of food. Decent buffer.`
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
   description: 'A paired-down acacia wood feeder with two stainless steel bowls, made for smaller pets who deserve clean materials and thoughtful design. The natural wood base is light enough to move around easily but solid enough to stay put during mealtimes. Non-toxic finish, sustainably sourced wood, handmade in Jodhpur.',
   image: '/images/SAC040S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
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
   description: 'Cut from solid acacia wood and shaped by hand in Jodhpur, this compact X-leg feeder brings both function and warmth to your pet\'s corner. The raised bowl position encourages a natural eating posture, reducing neck and back strain for smaller breeds. Both stainless steel bowls lift out cleanly for washing.',
   image: '/images/SAC041S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
   },
   relatedSizes: [
]
  },
  {
   id: 'SAC048L',
   name: 'Marble-Top Acacia Wood Pet Feeder with Stainless Steel Bowls',
   price: 2999,
   originalPrice: 3999,
   description: 'This large marble-top pet feeder pairs the warmth of acacia wood with the cool elegance of natural marble in a piece that looks as much like furniture as it does a feeder. The two stainless steel bowls sit at a height suited to larger breeds, supporting healthy posture and digestion. Every marble slab is hand-selected for its unique veining, and the acacia wood base is finished with food-safe mineral oil. Non-toxic throughout - safe for daily mealtime, beautiful enough to leave out.',
   image: '/images/SAC048L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 238,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural marble top, mineral oil finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we believed your pet deserved better than a plastic bowl on the floor. This feeder pairs hand-selected acacia wood - sustainably sourced from forests across India - with a natural marble top and two detachable stainless steel bowls. The raised stance supports posture-friendly eating for larger breeds, the materials are completely plastic-free, and every piece is handcrafted in our Jodhpur workshop.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    videos: ['/videos/SAC048L_video.mp4'],
    usesAndMeasurements: `50×29×26 cm, 2.5 L

Pet shoulder height: ~45–65 cm
Pet weight: ~20–35 kg
Category: Medium-to-large dogs only. Overkill for cats.
Breeds: Labrador Retriever, Golden Retriever, German Shepherd, Boxer
Food math: A 25 kg Lab eats ~300–400 g/day (~500–700 ml dry kibble volume), so 2.5 L = ~3–4 days of food. Decent buffer.`
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
   name: 'Marble-Top Acacia Wood Pet Feeder with Stainless Steel Bowls',
   price: 2499,
   originalPrice: 3999,
   description: 'A medium marble-top feeder combining sustainably sourced acacia wood with a genuine marble surface and two stainless steel bowls. The elevated design supports comfortable, posture-friendly eating for medium-sized dogs and cats, and the natural materials are completely free from plastics and toxic coatings. Hand-finished with food-safe mineral oil, this feeder is made to be beautiful on day one and to age well over years of daily use.',
   image: '/images/SAC048M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 141,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural marble top, mineral oil finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we believed your pet deserved better than a plastic bowl on the floor. This feeder pairs hand-selected acacia wood - sustainably sourced from forests across India - with a natural marble top and two detachable stainless steel bowls. The medium size is ideal for most dogs and cats, and every piece is handcrafted in our Jodhpur workshop.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    videos: ['/videos/SAC048M_video.mp4'],
    usesAndMeasurements: `39×23×20 cm, 1.8 L

Pet shoulder height: ~30–45 cm
Pet weight: ~8–18 kg
Category: Medium dogs, or large/adult cats that eat a lot.
Breeds: Beagle, Cocker Spaniel, French Bulldog, medium Indie/Pariah dogs
Also works for: Maine Coon or other large cat breeds if you want a multi-day refill setup.
Food math: ~1.8 L = ~4–6 days for a 12 kg dog, well over a week for a cat.`
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
   name: 'Marble-Top Acacia Wood Pet Feeder with Stainless Steel Bowls',
   price: 1999,
   originalPrice: 3999,
   description: 'This small marble-top pet feeder is made for cats and compact breeds who deserve beautiful materials at their daily mealtime. Natural acacia wood, genuine marble, and stainless steel come together in a piece that sits comfortably on a kitchen floor without looking like an afterthought. Non-toxic throughout, easy to clean, and finished with food-safe mineral oil - a piece that looks as intentional as your coffee table.',
   image: '/images/SAC048S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: true,
   rating: 4.9,
   reviews: 66,
   details: {
    materials: 'Acacia wood',
    finish: 'Natural marble top, mineral oil finish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur'],
    sustainability: 'Sustainably sourced wood',
    story: 'We started Sugan because we believed your pet deserved better than a plastic bowl on the floor. This feeder pairs hand-selected acacia wood - sustainably sourced from forests across India - with a natural marble top and two detachable stainless steel bowls. Compact enough for cats and small breeds, and handcrafted in our Jodhpur workshop.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    videos: ['/videos/SAC048S_video.mp4'],
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
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
   price: 999,
   originalPrice: 899,
   description: 'This extra-small acacia wood cat feeder is made for kittens and small cats who need their bowls lifted just off the floor. The striped wood panels give it a refined, furniture-grade look, while the two detachable stainless steel bowls make daily cleaning quick and easy. Non-toxic finish throughout, safe for pets and people alike.',
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
   }
  },
  {
   id: 'SAC08_L',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls',
   price: 2399,
   originalPrice: 2999,
   description: 'This large stripe crate feeder from Jodhpur is built for bigger dogs who need generous bowls at a proper height. The acacia wood frame is solid and stable, the stripe grain gives it a distinct warmth, and both stainless steel bowls lift cleanly out of their slots for washing. A natural choice for pet owners who value quality materials.',
   image: '/images/SAC08L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `50×29×26 cm, 2.5 L

Pet shoulder height: ~45–65 cm
Pet weight: ~20–35 kg
Category: Medium-to-large dogs only. Overkill for cats.
Breeds: Labrador Retriever, Golden Retriever, German Shepherd, Boxer
Food math: A 25 kg Lab eats ~300–400 g/day (~500–700 ml dry kibble volume), so 2.5 L = ~3–4 days of food. Decent buffer.`
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
]
  },
  {
   id: 'SAC08_M',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls',
   price: 2099,
   originalPrice: 2899,
   description: 'This medium acacia stripe crate feeder sits at the right height for medium breeds and comes with two removable stainless steel bowls. The natural stripe pattern across the wood panels makes every piece slightly different, and the non-toxic food-safe finish means it is as safe as it is beautiful.',
   image: '/images/SAC08M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `39×23×20 cm, 1.8 L

Pet shoulder height: ~30–45 cm
Pet weight: ~8–18 kg
Category: Medium dogs, or large/adult cats that eat a lot.
Breeds: Beagle, Cocker Spaniel, French Bulldog, medium Indie/Pariah dogs
Also works for: Maine Coon or other large cat breeds if you want a multi-day refill setup.
Food math: ~1.8 L = ~4–6 days for a 12 kg dog, well over a week for a cat.`
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
]
  },
  {
   id: 'SAC08_S',
   name: 'Acacia Wood Stripe Crate Pet Feeder with Stainless Steel Bowls',
   price: 1799,
   originalPrice: 1999,
   description: 'This small acacia stripe crate feeder is a practical, beautiful solution for cats and small dogs. The striped wood panels are finished with a non-toxic coating, and the two stainless steel bowls detach easily for daily cleaning. A handcrafted piece from Jodhpur that earns its place in any home.',
   image: '/images/SAC08S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
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
]
  },
  {
   id: 'SAC09XS',
   name: 'Acacia Wood Cat Feeder with S-Leg Stand and Stainless Steel Bowls',
   price: 999,
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
    story: 'At Sugan, we set out to change how India thinks about everyday pet products. Your pet eats from this bowl twice a day - so why should it be made of cheap plastic that scratches, stains, and harbors bacteria? This feeder is made from solid acacia with a non-toxic, food-safe finish.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
   }
  },
  {
   id: 'SAC09_L',
   name: 'Acacia Wood Stripe Crate Pet Feeder, S-Leg Stand with Stainless Steel Bowls',
   price: 1899,
   originalPrice: 2299,
   description: 'This large S-leg acacia crate feeder brings a refined profile to your pet\'s feeding corner, with a frame that is open and airy rather than heavy. Two stainless steel bowls sit at a generous height suited to larger breeds, and both lift out cleanly for washing. Non-toxic, food-safe finish - handcrafted in Jodhpur.',
   image: '/images/SAC09L_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `50×29×26 cm, 2.5 L

Pet shoulder height: ~45–65 cm
Pet weight: ~20–35 kg
Category: Medium-to-large dogs only. Overkill for cats.
Breeds: Labrador Retriever, Golden Retriever, German Shepherd, Boxer
Food math: A 25 kg Lab eats ~300–400 g/day (~500–700 ml dry kibble volume), so 2.5 L = ~3–4 days of food. Decent buffer.`
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
   price: 1499,
   originalPrice: 3999,
   description: 'The S-leg design gives this medium acacia feeder a lighter, more considered look than a standard crate frame, without compromising on stability. Two removable stainless steel bowls sit at the right height for medium breeds, and the natural wood finish is completely free from toxic coatings. Made in Jodhpur, Rajasthan.',
   image: '/images/SAC09M_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `39×23×20 cm, 1.8 L

Pet shoulder height: ~30–45 cm
Pet weight: ~8–18 kg
Category: Medium dogs, or large/adult cats that eat a lot.
Breeds: Beagle, Cocker Spaniel, French Bulldog, medium Indie/Pariah dogs
Also works for: Maine Coon or other large cat breeds if you want a multi-day refill setup.
Food math: ~1.8 L = ~4–6 days for a 12 kg dog, well over a week for a cat.`
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
   price: 999,
   originalPrice: 1999,
   description: 'A small-format S-leg feeder in natural acacia wood, made for cats and compact breeds who need their bowls raised just enough for comfortable eating. The open frame style keeps it light and easy to place anywhere in the home, and the stainless steel bowls lift out for quick daily cleaning. Non-toxic, food-safe finish.',
   image: '/images/SAC09S_01.png',
   category: 'Pet Feeders',
   room: 'pet',
   inStock: false,
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
    story: 'The idea behind Sugan was to replace the ordinary with something worth keeping. This stripe-design crate feeder is hand-built from sustainably sourced acacia wood, with each plank fitted and finished by artisans in Jodhpur.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    usesAndMeasurements: `32×18×12 cm, 1 L

Pet shoulder height: ~20–30 cm (dogs) / standard cat height
Pet weight: ~2–8 kg
Category: Cats and toy/small dog breeds. The 12 cm height is basically a low-profile bowl - ergonomic for cats and short-legged dogs.
Cat breeds: Persian, Siamese, Bengal, Indian domestic shorthair
Small dog breeds: Pug, Shih Tzu, Pomeranian, Lhasa Apso
Food math: 1 L = ~1.5–2 weeks for a cat, ~4–5 days for a small dog.`
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
 ],
 kitchen: [
  {
   id: 'SAC012',
   name: 'Acacia Wood Decorative Napkin Holder',
   price: 999,
   originalPrice: 1299,
   description: 'This acacia wood napkin holder is a quietly beautiful addition to the dining table - compact, well-weighted, and made from a single piece of natural hardwood. The food-safe finish means it handles the occasional splash without warping, and the warm grain of the acacia ages gracefully over time. Handcrafted in Jodhpur.',
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
    story: 'The smallest objects in a home say the most about it. Sugan was built on the belief that even a napkin holder on your dining table should be made from honest materials - not plastic, not painted MDF, but solid hardwood finished with food-safe oil.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC013',
   name: 'Acacia Wood Napkin Holder Stand',
   price: 999,
   originalPrice: 999,
   description: 'A simple, well-proportioned acacia wood napkin stand that holds its shape and looks better with age. Made in Jodhpur from solid acacia with a natural oil finish, it keeps napkins accessible at the table without cluttering the surface. Food-safe, moisture-resistant, and free from synthetic coatings - a honest piece for everyday use.',
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
    story: 'The smallest objects in a home say the most about it. Sugan was built on the belief that even a napkin holder on your dining table should be made from honest materials - not plastic, not painted MDF, but solid hardwood finished with food-safe oil.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC014',
   name: 'Acacia Wood Rectangle Serving Tray',
   price: 1099,
   originalPrice: 1299,
   description: 'This compact rectangle acacia tray is made from a single plank of solid hardwood in Jodhpur, finished with food-safe mineral oil. The clean shape and natural grain make it as practical for a snack board as it is elegant on a dining table, and the tight acacia grain resists moisture and knife marks before they become deep grooves.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC01_Combo_Set of 3-S',
   name: 'Acacia Wood Square Serving Trays, Natural Finish, Set of 3',
   price: 2699,
   originalPrice: 3299,
   description: 'Three graduating square acacia trays, each cut from solid natural hardwood and finished with food-safe mineral oil - a complete set for anyone who values both function and warmth in the kitchen. Use them stacked on the counter, layered on a dining table, or individually as serving boards, breakfast platters, or snack boards.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 1399,
   originalPrice: 1999,
   description: 'This large square acacia tray is a versatile piece - generous enough to carry a full tea service, elegant enough to display fruit on a sideboard, and durable enough for daily kitchen use. Handcrafted in Jodhpur from solid acacia with a natural mineral oil finish, it is food-safe, moisture-resistant, and built to last for years of daily use.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 1199,
   originalPrice: 1999,
   description: 'A medium square acacia serving tray with a natural grain finish, sized for everyday use as a breakfast tray, snack plate, or countertop organiser. Cut from solid acacia in Jodhpur and finished with food-safe mineral oil, it is equally at home on a dining table or a coffee table. The wood ages warmly with every oiling.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 999,
   originalPrice: 999,
   description: 'This small square acacia tray from Jodhpur is cut from a single plank of natural hardwood, finished with food-safe mineral oil, and built to handle daily use in the kitchen or on the dining table. The natural grain pattern is unique to every piece, and the acacia\'s tight wood structure resists moisture and keeps the surface hygienic.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically',
    photos: ['/images/SAC01S_03.png']
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
   description: 'Three rectangle honey-finish acacia trays in graduating sizes, each made from solid natural hardwood and finished with food-safe mineral oil. The warm golden tone of the honey finish makes the set cohesive and welcoming, and the sizes cover everything from individual servings to full table spreads. A beautiful, versatile set for everyday entertaining.',
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
    story: 'The honey finish on this tray isn\'t applied from a bottle - it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing. No synthetic coatings - just honest wood and honest craft.',
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
   description: 'A large honey-finish acacia serving tray built for proper entertaining - generous enough for a full charcuterie board, strong enough to carry drinks across the room, and finished beautifully enough to leave on the table as a centrepiece. Handcrafted in Jodhpur from solid acacia with a food-safe natural oil finish.',
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
    story: 'The honey finish on this tray isn\'t applied from a bottle - it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing. No synthetic coatings - just honest wood and honest craft.',
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
   description: 'This medium rectangle honey-finish tray is a kitchen and dining staple - the right size for a breakfast spread, an afternoon tea, or a curated charcuterie arrangement. Made from solid acacia with a warm honey-toned natural finish, it is food-safe, moisture-resistant, and handcrafted in Jodhpur with care.',
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
    story: 'The honey finish on this tray isn\'t applied from a bottle - it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing. No synthetic coatings - just honest wood and honest craft.',
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
   description: 'A small honey-finish acacia tray with the warm, golden tone that comes from careful kiln-drying and natural oil finishing. Compact enough for a single serving or a set of condiments, it is made in Jodhpur from solid acacia and finished to food-safe standards. The honey colour deepens with regular oiling.',
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
    story: 'The honey finish on this tray isn\'t applied from a bottle - it\'s the natural warmth of acacia wood, brought out by our artisans in Jodhpur through careful sanding and food-safe mineral oil finishing. No synthetic coatings - just honest wood and honest craft.',
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
   price: 2699,
   originalPrice: 2999,
   description: 'Three antique checkers rectangle trays in graduating sizes, each built from alternating light and dark acacia planks for a natural geometric pattern that needs no paint or decoration. The full set covers individual servings to generous table spreads, and every surface is finished with food-safe mineral oil.',
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
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsible craftsmanship. This tray proves you can have both.',
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
   description: 'A mango wood stripe cutting and serving board with a unique shape and a rich brown-toned grain. The stripe pattern is created from alternating planks of natural mango wood, and the food-safe finish means it goes straight from prep to table. Made in Jodhpur from sustainably sourced mango - a wood harvested at the end of its productive life.',
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
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods - and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from high-grade, sustainably sourced mango wood.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC03_L',
   name: 'Acacia Wood Antique Checkers Rectangle Serving Tray',
   price: 1399,
   originalPrice: 1799,
   description: 'This large antique checkers tray makes a statement at the dining table with its alternating light and dark acacia grain pattern, created without dyes or synthetic finishes. The full surface is food-safe and flat-finished, making it as practical for serving as it is beautiful as a standalone piece. Handcrafted in Jodhpur, Rajasthan.',
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
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsible craftsmanship. This tray proves you can have both.',
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
   price: 1299,
   originalPrice: 1599,
   description: 'A medium antique checkers acacia tray that brings visual interest to the table without any artificial decoration - the pattern comes entirely from alternating light and dark acacia planks. Sized for a generous snack spread or afternoon tea, it is finished with food-safe mineral oil and made by hand in Jodhpur.',
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
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsible craftsmanship. This tray proves you can have both.',
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
   price: 999,
   originalPrice: 1099,
   description: 'The antique checkers pattern on this small acacia tray is created by laying alternating planks of lighter and darker acacia wood side by side, then finishing the whole surface flush. The result is a tray with geometric character that is still entirely natural - no dyes, no paint, just the contrast between naturally light and dark acacia.',
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
    story: 'There is a certain kind of object that gets better the more you use it. This tray is one of them. Sugan was built on the idea that India shouldn\'t have to choose between beautiful design and responsible craftsmanship. This tray proves you can have both.',
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
   description: 'Three natural acacia rectangle trays in graduating sizes, each made from solid hardwood and finished with food-safe mineral oil in Jodhpur. The set works together as a layered table display or independently for everyday kitchen use - breakfast trays, snack boards, counter organisers. Sustainably sourced from managed forests.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 1499,
   description: 'Acacia wood with a food-safe epoxy accent - this rectangular chopping and serving board brings a modern edge to a natural material. The acacia provides a hard, anti-microbial cutting surface, and the epoxy fill adds visual depth without compromising safety. BPA-free, food-safe throughout, handcrafted in Jodhpur.',
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
    story: 'We built Sugan because we wanted India\'s kitchens to look as good as they cook. This board pairs premium acacia wood - sustainably sourced, naturally anti-bacterial, and harder than most Indian hardwoods - with a design that works as hard as you do.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC044',
   name: 'Acacia Wood Rectangle Chopping and Serving Board',
   price: 1299,
   description: 'A straightforward, well-made acacia rectangle chopping board with a food-safe mineral oil finish and a surface tough enough for daily prep work. The tight grain of the acacia resists deep knife marks and moisture absorption, keeping the board hygienic with simple care. Handcrafted in Jodhpur from sustainably managed forests.',
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
    story: 'We started Sugan because we were tired of seeing Indian kitchens filled with plastic boards that warp, stain, and end up in landfills within a year. This board is hand-crafted from premium acacia wood - harder, more hygienic, and built to last for decades.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC045',
   name: 'Acacia and Mango Wood Striped Rectangle Chopping Board',
   price: 999,
   description: 'This acacia and mango wood striped chopping board pairs two complementary hardwoods side by side, creating a natural colour contrast without dyes or stains. Both woods are food-safe and anti-microbial, and the board is finished with mineral oil throughout. A practical, honest piece made in Jodhpur to last.',
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
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods - and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from high-grade, sustainably sourced mango wood.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC046',
   name: 'Acacia and Mango Wood Stripe Rectangle Chopping Board',
   price: 999,
   description: 'The stripe pattern on this acacia and mango wood board runs along the length of the cutting surface, the result of joining alternating planks of two naturally different hardwoods. Both are food-safe, anti-microbial, and finished with natural mineral oil - no plastics, no synthetic coatings. A durable board for everyday use.',
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
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods - and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from high-grade, sustainably sourced mango wood.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC047',
   name: 'Acacia Wood Rectangle Chopping Board with Handles, 56x30x3 cm',
   price: 999,
   description: 'At 56 x 30 x 3 cm with integrated handles, this large acacia cutting board is built for serious kitchen use. The solid hardwood surface handles daily chopping and doubles as a serving platter for meat, cheese, or bread without needing any extra preparation. Food-safe, anti-microbial, and finished with food-safe mineral oil.',
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
    story: 'We started Sugan because we were tired of seeing Indian kitchens filled with plastic boards that warp, stain, and end up in landfills within a year. This board is hand-crafted from premium acacia wood - harder, more hygienic, and built to last for decades.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC04_L',
   name: 'Acacia Wood Rectangle Serving Tray, Natural Finish',
   price: 1199,
   originalPrice: 1499,
   description: 'A large natural rectangle acacia tray, handcrafted in Jodhpur from solid hardwood and finished with food-safe mineral oil. Generous enough for a full dinner spread or a styled charcuterie board, it holds its shape and improves in tone with every oiling. A genuinely useful piece made with real craft from Jodhpur.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   description: 'This medium natural rectangle acacia tray is the everyday workhorse of the kitchen - the right size for breakfast, snacks, or carrying two mugs of tea across the room. Made from solid acacia in Jodhpur with a food-safe mineral oil finish, it handles regular use without warping or fading. The natural grain is unique to every piece.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   description: 'A small natural acacia rectangle tray with a clean, unfussy grain and a food-safe mineral oil finish. Made in Jodhpur from a single slab of solid acacia, it is compact enough for individual servings but durable enough for years of daily use. The natural tone of the wood suits any kitchen style, from modern minimal to traditional warm.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   description: 'A large hand-carved acacia serving bowl made for the dining table - wide enough for a full salad, a fruit centrepiece, or a shared snack spread for four to six. Finished with food-safe mineral oil and carved from solid acacia in Jodhpur, the natural grain runs deep and the bowl improves in richness with every oiling.',
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
    story: 'A serving bowl is one of the most used objects in an Indian kitchen - so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, each bowl carries its own grain pattern and improves in richness with every oiling.',
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
   description: 'This medium hand-carved acacia wood bowl is the right size for a generous fruit arrangement, a salad for two, or a bowl of snacks on the coffee table. Finished with food-safe mineral oil and completely free from synthetic coatings, it handles daily contact with food safely and looks better with every use.',
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
    story: 'A serving bowl is one of the most used objects in an Indian kitchen - so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, each bowl carries its own grain pattern and improves in richness with every oiling.',
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
   description: 'Three hand-carved acacia serving bowls in small, medium, and large - a complete set for the table, counter, and sideboard. Each bowl is finished with food-safe mineral oil and carries its own natural grain pattern, making the set cohesive but never identical. Handcrafted in Jodhpur from sustainably sourced acacia wood.',
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
    story: 'A serving bowl is one of the most used objects in an Indian kitchen - so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, each bowl carries its own grain pattern and improves in richness with every oiling.',
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
   description: 'Hand-carved in Jodhpur from solid acacia wood, this small serving bowl is finished smooth with food-safe mineral oil, making it safe for direct contact with fruit, nuts, salads, and dry snacks. The natural honey-to-dark-brown grain variation across the surface is unique to every piece - a result of the natural variation in acacia grain.',
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
    story: 'A serving bowl is one of the most used objects in an Indian kitchen - so at Sugan, we decided it should also be one of the most beautiful. Hand-carved from premium acacia wood by artisans in Jodhpur, each bowl carries its own grain pattern and improves in richness with every oiling.',
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
   price: 999,
   description: 'Cut into a heart shape from solid acacia wood, this chopping and charcuterie board is as expressive as it is functional. Acacia is naturally anti-microbial and BPA-free, and the food-safe finish keeps the surface safe for direct contact with food without the use of plastic coatings. Handcrafted in Jodhpur.',
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
    story: 'Some objects in a kitchen are tools. This one is a statement. Sugan was born from the belief that India deserves everyday products that are plastic-free, chemical-free, and genuinely beautiful. Hand-crafted in Jodhpur, Rajasthan.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC07',
   name: 'Acacia Wood Stripe Crate Trays, White, Set of 3',
   price: 2799,
   originalPrice: 2999,
   description: 'Three white stripe acacia crate trays in small, medium, and large - a practical and adaptable set for organising and displaying around the home. Each tray is made from solid acacia in Jodhpur with a non-toxic white finish, and the open-slat sides give them a light, airy quality that works in kitchens, living rooms, and bedrooms alike.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 1199,
   originalPrice: 1999,
   description: 'This large white stripe acacia crate tray is built to carry more - a full breakfast spread, a collection of plants, or a styled arrangement on a sideboard. The natural acacia frame is finished with non-toxic white paint that keeps its tone without chipping or peeling with regular use. Handcrafted in Jodhpur, Rajasthan.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 1099,
   originalPrice: 1499,
   description: 'A medium stripe acacia crate tray in white, made for organising the kitchen counter, carrying items around the home, or presenting products as a gift. The open-slat sides keep it light and airy, while the solid acacia base and frame give it enough structure to handle daily use. Non-toxic finish, handcrafted in Jodhpur.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 999,
   originalPrice: 999,
   description: 'This small white stripe acacia crate tray is made from natural hardwood with a clean, painted white frame and open-slat sides. Lightweight and versatile, it works as a counter organiser, a decorative tray, or a styled gift holder. Made in Jodhpur from sustainably sourced acacia, finished with non-toxic paint.',
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
    story: 'Sugan exists because we believed everyday objects in Indian homes could be made without plastic, without harmful chemicals, and without compromising on beauty. This serving tray is hand-crafted in Jodhpur from solid acacia wood, finished with food-safe mineral oil.',
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
   price: 899,
   description: 'This mango wood rectangular cutting and serving platter has a rich dark-brown finish and a generous surface for vegetables, fruit, and cheese. Mango wood is a sustainable choice - it is harvested from fruit trees at the end of their productive life - and the natural grain gives each board a distinct character.',
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
    story: 'Mango wood is one of India\'s most abundant and sustainable hardwoods - and at Sugan, we think it\'s also one of the most beautiful. This chopping and serving board is hand-crafted in Jodhpur from high-grade, sustainably sourced mango wood.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC030',
   name: 'Rajasthani Hand-Embossed Multicolour Wooden Serving Tray',
   price: 999,
   originalPrice: 2199,
   description: 'Hand-embossed and painted by artisans in Jodhpur using traditional Rajasthani techniques, this multicoloured wooden serving tray carries centuries of craft in its surface. Each tray is made individually, which means small variations in colour and pattern are natural signs of a handmade object rather than flaws.',
   image: '/images/SAC030_01.png',
   category: 'Serving Trays',
   room: 'kitchen',
   inStock: false,
   preOrder: true,
   preOrderMessage: 'Will ship in 10–14 days if we receive enough orders, or we\'ll refund you in full.',
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
    story: 'Every tray Sugan makes carries the spirit of Jodhpur with it. This hand-embossed, hand-painted tray is made by master artisans who have spent their lives practising the traditional Rajasthani craft of wood painting and embossing.',
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
   description: 'This foldable round side table in natural acacia is handcrafted in Jodhpur with a design that moves easily between living room, bedroom, and balcony. The fold-flat base makes it easy to store when not in use, and the solid wood top is finished with a natural oil that protects the surface and brings out the grain.',
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
    story: 'A good side table should disappear into your room - and this one does, until you look closely and realise how well it\'s made. Sugan was built to bring premium, plastic-free woodcraft into Indian homes that value craftsmanship over convenience.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC021',
   name: 'Foldable Round Acacia Wood Side Table, Grey Wash',
   price: 1799,
   originalPrice: 3399,
   description: 'The grey-wash finish on this foldable round side table gives the acacia wood a soft, cooled tone that works well in both contemporary and neutral interiors. Handcrafted in Jodhpur, it folds flat for storage and opens to a stable working surface for a cup, a book, or a bedside lamp. Finished with a natural oil that protects the wood.',
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
    story: 'Grey wash is not a coat of paint - it\'s a slow, patient process that our artisans in Jodhpur apply by hand to bring out the natural grain of the wood while giving it a contemporary muted tone. This finish is achieved through patient hand-application, not factory spraying.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC022',
   name: 'Foldable Round Acacia Wood Side Table, Dark Brown',
   price: 1799,
   originalPrice: 3999,
   description: 'This dark-brown foldable round side table is made from solid acacia wood in Jodhpur, with a rich, deep-toned finish that suits warm-toned and darker interiors equally well. The fold-flat mechanism makes it easy to move between rooms or store away, and the natural oil finish protects the wood without fading or chipping.',
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
    story: 'Dark, rich, and unmistakably handmade - this side table carries the character of the wood it\'s made from. At Sugan, we source high-grade natural wood from forests across India and finish each piece by hand, using techniques passed down through generations.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC049',
   name: 'Spiral Side Table',
   price: 4999,
   description: 'Hand-turned from solid mango wood in Jodhpur, this side table is built around a stacked-disc silhouette that carries the quality of sculpture and the function of furniture. Each layer is shaped and smoothed individually, so no two pieces look exactly the same. The rich dark walnut finish deepens with time, pulling out the natural grain and warmth of the wood.',
   image: '/images/SAC049_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.8,
   reviews: 42,
   details: {
    materials: 'Solid mango wood',
    finish: 'Dark walnut polish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Plastic-free'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'We made this table because we believed a side table could be more than a flat surface on four legs. The spiral form is hand-turned on a lathe by artisans in Jodhpur who have spent years understanding how wood moves and responds to the tool. The stacked-disc silhouette is bold enough to stand on its own in a room, and restrained enough to work with almost any interior — modern, bohemian, mid-century. Mango wood is one of the most naturally beautiful hardwoods available in India, and the dark walnut finish only deepens it over years of use.',
    care: 'Wipe with a dry or lightly damp cloth. Do not soak.',
    maintenance: 'Apply mineral oil or beeswax polish periodically to maintain the finish.',
    dimensions: {
     height: '61 cm',
     width: '33 cm',
     depth: '33 cm'
    },
    photos: ['/images/SAC049_03.png']
   }
  },
  {
   id: 'SAC050',
   name: 'Mushroom Pedestal Side Table',
   price: 4999,
   description: 'Hand-turned from solid mango wood in Jodhpur, this pedestal side table draws its silhouette from quiet, considered geometry — a wide, smooth top perched on a tapered single column. The natural honey polish keeps the tone warm and inviting, letting the mango wood\'s grain come through. Every piece is turned individually by hand, so the character of the wood shows in each one.',
   image: '/images/SAC050_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.8,
   reviews: 68,
   details: {
    materials: 'Solid mango wood',
    finish: 'Natural honey polish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Plastic-free'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'We made this table because we believed a side table could be more than a flat surface on four legs. The mushroom pedestal form is hand-turned on a lathe by artisans in Jodhpur — a wide, smooth top balanced on a tapering column that gives it the poise of sculpture and the usefulness of furniture. The natural honey finish keeps every grain visible and warm.',
    care: 'Wipe with a dry or lightly damp cloth. Do not soak.',
    maintenance: 'Apply mineral oil or beeswax polish periodically to maintain the finish.',
    dimensions: {
     height: '51 cm',
     width: '50 cm',
     depth: '50 cm'
    }
   }
  },
  {
   id: 'SAC052',
   name: 'Oval Top Shelf Side Table',
   price: 3999,
   description: 'A tall, slim acacia wood side table with a softly rounded oval top and two open shelves below, finished in a rich dark walnut tone. The narrow profile fits comfortably beside a sofa or armchair without crowding the space, and the open shelves keep books, plants, or objects visible and within reach. Made from solid acacia in Jodhpur.',
   image: '/images/SAC052_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.8,
   reviews: 35,
   details: {
    materials: 'Solid acacia wood',
    finish: 'Dark walnut polish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid acacia wood', 'Plastic-free'],
    sustainability: 'Sustainably sourced acacia wood',
    story: 'The oval top is a deliberate choice — it softens the silhouette and makes the table feel less like a piece of office furniture and more like something that belongs in a considered home. The two open shelves are arranged to display rather than conceal: books, a trailing plant, a ceramic object. Handcrafted from solid acacia in Jodhpur with a dark walnut finish that deepens the grain.',
    care: 'Wipe with a dry or lightly damp cloth. Do not soak.',
    maintenance: 'Apply mineral oil periodically.',
    dimensions: {
     height: '69 cm',
     width: '61 cm',
     depth: '32 cm'
    }
   }
  },
  {
   id: 'SAC053',
   name: 'Mosaic Pedestal Side Table',
   price: 7999,
   description: 'Built from solid mango wood in Jodhpur, this pedestal side table carries its craft in the base — an hourglass column assembled from hand-cut wood blocks fitted together in a precise mosaic pattern. The wide, lipped circular top sits above it cleanly, offering a generous surface for daily use. Finished in a warm honey walnut tone that draws out the natural depth of the wood.',
   image: '/images/SAC053_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.9,
   reviews: 29,
   details: {
    materials: 'Solid mango wood',
    finish: 'Honey walnut polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Mosaic artisan base'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The base is the whole story. Each mosaic block is individually hand-cut and fitted by skilled artisans in Jodhpur — no two columns are assembled in exactly the same configuration, which means no two tables are identical. The hourglass silhouette gives it a sculptural confidence, and the lipped round top grounds the form in practicality. A piece that earns its place in any room it enters.',
    care: 'Wipe with a dry or lightly damp cloth. Do not soak.',
    maintenance: 'Apply mineral oil or beeswax polish periodically.',
    dimensions: {
     height: '50 cm',
     width: '50 cm',
     depth: '50 cm'
    }
   }
  },
  {
   id: 'SAC055',
   name: 'Slatted Base Bowl Top Side Table',
   price: 6999,
   description: 'A wide, bowl-shaped top in a whitewashed gold finish sits above a slatted cylindrical base in deep ebony black — two finishes, one material, striking contrast. The open vertical slats let light pass through and cast clean shadows through the day, giving the piece an architectural quality that reads as much as sculpture as furniture. Made from solid mango wood in Jodhpur.',
   image: '/images/SAC055_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   rating: 4.8,
   reviews: 75,
   details: {
    materials: 'Solid mango wood',
    finish: 'Whitewashed gold (top), ebony black (base)',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Dual-tone finish'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The two-tone contrast between the whitewashed gold bowl and the ebony black slatted base came from the idea that a side table should be interesting to look at from every angle. The vertical slats are precision-cut and arranged in an open cage formation — light moves through them differently at every hour of the day. Made entirely from solid mango wood by artisans in Jodhpur.',
    care: 'Wipe with a dry or lightly damp cloth. Avoid prolonged moisture. Keep from direct sunlight.',
    maintenance: 'Apply appropriate wood polish periodically.',
    dimensions: {
     height: '53 cm',
     width: '44 cm',
     depth: '44 cm'
    }
   }
  },
  {
   id: 'SAC056',
   name: 'Slatted Drum Base Coffee Table',
   price: 8999,
   description: 'A wide, bowl-shaped top in smoky walnut sits low above a flared slatted drum base made from solid mango wood — the grain at the centre of the top radiates outward, and the precision-cut slats of the base play with light throughout the day. Low, grounded, and quietly commanding, it anchors a living room without competing with anything around it. Made by hand in Jodhpur.',
   image: '/images/SAC056_01.png',
   category: 'Coffee Tables',
   room: 'living',
   inStock: true,
   rating: 4.9,
   reviews: 45,
   details: {
    materials: 'Solid mango wood',
    finish: 'Smoky walnut polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Statement grain pattern'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Coffee tables tend to be afterthoughts. This one is not. The flared slatted drum base fans outward from a narrow neck with precision-cut vertical slats arranged in an open formation — it casts beautiful shadows and creates visual depth from every angle. The bowl-shaped top is turned from a single piece of mango wood, and the centrepiece grain pattern at its surface is unique to each table. A grounded, considered piece from Jodhpur.',
    care: 'Wipe with a dry or lightly damp cloth. Avoid prolonged moisture. Keep from direct sunlight.',
    maintenance: 'Apply mineral oil or beeswax polish periodically.',
    dimensions: {
     height: '43 cm',
     width: '61 cm',
     depth: '61 cm'
    }
   }
  },
  {
   id: 'SAC057',
   name: 'Lattice Carved Four-Shelf Bookshelf',
   price: 4999,
   description: 'Tall, slender, and unmistakably handcrafted - the Lattice Carved Four-Shelf Bookshelf brings old-world artisanship into the modern home. Crafted from solid acacia wood in a warm honey finish, this compact freestanding shelf features four open shelves framed by intricately hand-carved lattice panels on all sides. The repeating ogee arch motif cut into each panel creates a beautiful interplay of light and shadow, making this piece as captivating empty as it is styled. Its slim footprint makes it ideal for tight spaces without compromising on display area or visual character. Whether holding books, plants, ceramics, or curated objects, it earns its place in any room it enters.',
   image: '/images/SAC057_01.png',
   category: 'Bookshelf',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Acacia Wood', 'Hand-carved lattice panels', 'Slim footprint'],
    sustainability: 'Sustainably sourced acacia wood',
    story: 'The lattice panels came first - the shelf was built around them. Each panel is hand-carved by artisans in Jodhpur using a repeating ogee arch motif that has been cut into Indian woodwork for centuries. The result is a bookshelf that earns its place in any room it enters: four open shelves in a slim, vertical profile, warm honey acacia throughout, and a carved frame that makes the whole piece feel considered rather than functional.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '91 cm',
     width: '37 cm',
     depth: '28 cm'
    },
    photos: ['/images/SAC057_01.png', '/images/SAC057_02.png']
   },
   relatedSizes: [
    { size: 'Dark Walnut', productId: 'SAC058', price: 0 }
   ]
  },
  {
   id: 'SAC058',
   name: 'Lattice Carved Four-Shelf Bookshelf (Dark Walnut)',
   price: 4999,
   description: 'Tall, slender, and unmistakably handcrafted - the Lattice Carved Four-Shelf Bookshelf brings old-world artisanship into the modern home. Crafted from solid acacia wood in a rich dark walnut finish, this compact freestanding shelf features four open shelves framed by intricately hand-carved lattice panels on all sides. The repeating ogee arch motif cut into each panel creates a beautiful interplay of light and shadow, making this piece as captivating empty as it is styled. Its slim footprint makes it ideal for tight spaces without compromising on display area or visual character. The deep espresso tone adds a layer of drama and sophistication, making it a natural fit for darker, moodier interiors. Whether holding books, plants, ceramics, or curated objects, it earns its place in any room it enters.',
   image: '/images/SAC058_01.png',
   category: 'Bookshelf',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Acacia Wood', 'Hand-carved lattice panels', 'Slim footprint'],
    sustainability: 'Sustainably sourced acacia wood',
    story: 'The lattice panels came first - the shelf was built around them. Each panel is hand-carved by artisans in Jodhpur using a repeating ogee arch motif that has been cut into Indian woodwork for centuries. The result is a bookshelf that earns its place in any room it enters: four open shelves in a slim, vertical profile, deep espresso walnut acacia throughout, and a carved frame that makes the whole piece feel considered rather than functional.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '91 cm',
     width: '37 cm',
     depth: '28 cm'
    },
    photos: ['/images/SAC058_01.png', '/images/SAC058_02.png']
   },
   relatedSizes: [
    { size: 'Honey', productId: 'SAC057', price: 0 }
   ]
  },
  {
   id: 'SAC059',
   name: 'Cross Base Round Side Table',
   price: 2999,
   description: 'Simple in form, striking in detail - the Cross Base Round Side Table is a study in structural elegance. Crafted from solid acacia wood in a rich dark walnut finish, this compact side table features a smooth round top with a beautifully visible two-tone grain pattern, supported by four angled flat legs that meet at the centre in a distinctive interlocking cross base. That base is the defining detail - where most tables play it safe with four straight legs, this one draws the eye downward with a geometric precision that feels both architectural and organic at once. Compact enough for any corner, characterful enough to hold its own in any room.',
   image: '/images/SAC059_01.png',
   category: 'Side Tables',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Acacia Wood', 'Interlocking cross base', 'Two-tone grain top'],
    sustainability: 'Sustainably sourced acacia wood',
    story: 'Most side tables stop at four straight legs and call it done. This one doesn\'t. The interlocking cross base - four angled flat legs meeting at a precise geometric intersection - is the entire point of the piece. It draws the eye downward in a way that feels both architectural and handcrafted, and the smooth round top with its two-tone acacia grain sits above it with quiet confidence. Made from solid acacia in Jodhpur with a deep dark walnut finish.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '46 cm',
     width: '41 cm',
     depth: '41 cm'
    },
    photos: ['/images/SAC059_01.png', '/images/SAC059_02.png']
   }
  },
  {
   id: 'SAC060',
   name: 'Barrel Slat Coffee Table',
   price: 6999,
   description: 'Low, round, and richly textured - the Barrel Slat Coffee Table is a piece that rewards a second look. Crafted from solid mango wood in a warm dark walnut finish, its barrel-shaped base is constructed from curved vertical slats that bow outward at the centre, mimicking the form of a classic wooden barrel with striking precision. The wide lipped round top sits flush above, offering a smooth, generous surface for everyday use. Light passes freely through the open slat structure, giving the table a sense of airiness despite its substantial presence. Grounded and sculptural in equal measure, this piece works as a centrepiece coffee table or a bold accent alongside a sofa.',
   image: '/images/SAC060_01.png',
   category: 'Coffee Tables',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Curved barrel slat base', 'Open slat structure'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The barrel form has been used in woodworking for centuries because it works - structurally and visually. Each curved slat in the base of this coffee table is individually shaped and fitted by artisans in Jodhpur, bowing outward at the centre to create the characteristic barrel silhouette. The wide lipped top sits above it cleanly, and the open slat structure keeps the whole piece from feeling heavy despite its presence. Made entirely from solid mango wood with a deep dark walnut finish.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '58 cm',
     depth: '58 cm'
    },
    photos: ['/images/SAC060_01.png', '/images/SAC060_02.png']
   }
  },
  {
   id: 'SAC061',
   name: 'Dome Slat Coffee Table',
   price: 8999,
   description: 'Wide, low, and impossible to ignore - the Dome Slat Coffee Table makes an instant statement in any living room. Crafted from solid mango wood in a warm honey walnut finish, its generously proportioned dome-shaped base is built from curved vertical slats that sweep outward dramatically before tapering back inward at the base, creating a full, rounded silhouette reminiscent of a woven basket or a traditional wooden drum. The extra-wide lipped round top provides an expansive surface for daily use, while the open slat structure keeps the overall form feeling light and breathable despite its commanding size. This is a centrepiece that earns its place.',
   image: '/images/SAC061_01.png',
   category: 'Coffee Tables',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Dome-shaped slat base', 'Extra-wide lipped top'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Scale changes everything. This coffee table is made extra-wide by design - the dome-shaped slat base sweeps outward dramatically, the lipped round top stretches to match, and the whole piece earns its place as the centrepiece of a room rather than an afterthought beside the sofa. The curved slats are shaped and assembled entirely by hand by artisans in Jodhpur, and the honey walnut finish pulls out the warmth of the mango grain.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '41 cm',
     width: '79 cm',
     depth: '79 cm'
    },
    photos: ['/images/SAC061_01.png', '/images/SAC061_02.png']
   }
  },
  {
   id: 'SAC062',
   name: 'Mushroom Pedestal Coffee Table',
   price: 9999,
   description: 'Solid, sculptural, and quietly extraordinary - the Mushroom Pedestal Coffee Table is a masterpiece of minimalist woodworking. Crafted from solid mango wood in a deep dark walnut finish, the table is built around a bold full cylinder base with a single diagonal cut running across its body, creating a dramatic split detail that breaks the symmetry in the most considered way possible. The wide lipped round top showcases a stunning natural grain pattern, with sweeping dark tones flowing across the surface like brushstrokes. Everything about this piece is intentional - the weight of the base, the smoothness of the top, the single line that makes it unforgettable.',
   image: '/images/SAC062_01.png',
   category: 'Coffee Tables',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Solid cylinder base', 'Diagonal split detail'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'One cut. That is the entire design gesture that sets this table apart. The solid cylinder base - already substantial and commanding on its own - is given a single diagonal cut that breaks the form just enough to make you look twice. The wide lipped round top carries a flowing grain pattern unique to each piece of mango wood. Made entirely from solid mango in Jodhpur with a deep dark walnut finish that deepens the drama.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '46 cm',
     width: '80 cm',
     depth: '80 cm'
    },
    photos: ['/images/SAC062_01.png', '/images/SAC062_02.png']
   }
  },
  {
   id: 'SAC065',
   name: 'Stacked Oval Two-Drawer Bedside Table',
   price: 7999,
   description: 'Sculptural, soft, and strikingly original - the Stacked Oval Two-Drawer Bedside Table is a piece that does not follow the rules. Crafted from solid mango wood in a warm honey walnut finish, the table is built as two fully rounded oval drawer units stacked one atop the other on a slim square plinth base, creating a form that feels more like a modern art piece than conventional bedroom furniture. Every edge is generously rounded, every corner eliminated, giving the piece a smooth, almost pebble-like quality that is deeply satisfying in person. Each drawer is fitted with a slender cast brass pull handle in an organic, slightly irregular form.',
   image: '/images/SAC065_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Two stacked oval drawers', 'Organic cast brass pulls', 'Fully rounded edges'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Most bedside tables are boxes with legs. This one is nothing like that. Two fully rounded oval drawer units, stacked and sitting on a slim plinth, with every edge and corner softened until the piece reads almost like a sculpture. The organic cast brass pull handles are individually formed - no two are quite the same. Made from solid mango wood in Jodhpur with a warm honey walnut finish that lets the natural grain speak.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '56 cm',
     depth: '36 cm'
    },
    photos: ['/images/SAC065_01.png', '/images/SAC065_02.png']
   }
  }
 ],
 bedroom: [
  {
   id: 'SAC026',
   name: 'Hand-Painted Rajasthani Wooden Jewellery and Storage Box, 2.5 kg',
   price: 1999,
   originalPrice: 1999,
   description: 'This hand-painted Rajasthani wooden box is made by artisans in Jodhpur using traditional motifs passed down through generations of craft. The exterior is decorated with vivid, detailed artwork in the classic Rajasthani palette, and the interior is lined and sized for jewellery, small accessories, or treasured keepsakes.',
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
    story: 'Jodhpur has been painting stories onto wood for longer than most cities have existed. This jewellery and storage box carries that tradition - hand-painted by skilled Rajasthani artisans with traditional techniques passed down through families.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC051',
   name: 'Brass Knob Bedside Table',
   price: 6999,
   description: 'A two-drawer bedside table in solid mango wood with a dark walnut finish and small round brass knob hardware — refined without being fussy. The turned cylindrical legs lift it cleanly off the floor, and both drawers offer generous space for everyday bedside essentials. The natural grain shows through the deep finish across every drawer front, making each piece distinctly its own.',
   image: '/images/SAC051_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   rating: 4.8,
   reviews: 43,
   details: {
    materials: 'Solid mango wood',
    finish: 'Dark walnut polish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Brass hardware'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The brass knobs were the last decision, and they changed everything. A small round detail in warm gold against the deep espresso of the dark walnut finish — restrained enough to not dominate, considered enough to elevate the whole piece. Two drawers, turned cylindrical legs, solid mango wood throughout. Made by hand in Jodhpur for bedrooms that take their materials seriously.',
    care: 'Wipe with a dry or lightly damp cloth. Do not soak.',
    maintenance: 'Apply mineral oil periodically. Polish brass knobs with a soft cloth.',
    dimensions: {
     height: '50 cm',
     width: '51 cm',
     depth: '48 cm'
    }
   }
  },
  {
   id: 'SAC054',
   name: 'Round Edge Three-Drawer Bedside Table',
   price: 7999,
   description: 'Three smooth-gliding drawers, rounded corners throughout, and raised cylindrical legs — this solid mango wood bedside table is defined by the details that set it apart from the standard. The natural honey finish stays warm and bright, and the softened edges give it a more considered silhouette than most nightstands. Every drawer front shows the natural grain of the mango wood.',
   image: '/images/SAC054_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   rating: 4.8,
   reviews: 42,
   details: {
    materials: 'Solid mango wood',
    finish: 'Natural honey polish, food-safe mineral oil',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', 'Solid mango wood', 'Rounded edges'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Rounded corners sound like a minor detail. In a bedside table you reach for in the dark every night, they become the whole character of the piece. This table is designed so that nothing sharp or hard meets you at eye level or at 2am. Three generous drawers, cylindrical legs that keep it feeling light, and a natural honey finish that lets the mango grain come through. Made in Jodhpur.',
    care: 'Wipe with a dry or lightly damp cloth. Do not soak.',
    maintenance: 'Apply mineral oil or beeswax polish periodically.',
    dimensions: {
     height: '61 cm',
     width: '49 cm',
     depth: '38 cm'
    }
   }
  },
  {
   id: 'SAC063',
   name: 'Mortise Leg Single Drawer Bedside Table',
   price: 6999,
   description: 'Understated, functional, and built with genuine craft - the Mortise Leg Single Drawer Bedside Table is the kind of nightstand that gets better the closer you look. Crafted from solid mango wood in a warm dark walnut finish, this bedside table sits on four sturdy rounded legs connected by traditional mortise and tenon cross stretchers at the base, a joinery technique that speaks to deep roots in artisan woodworking. A single wide drawer with a clean flat wooden bar handle provides easy access to bedside essentials, while the chunky square top offers ample surface space for a lamp, book, or morning cup of tea.',
   image: '/images/SAC063_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Mortise and tenon cross stretchers', 'Single wide drawer'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The mortise and tenon joint is one of the oldest woodworking techniques in the world, and it shows at the base of this bedside table. The cross stretchers connecting the four rounded legs are not decorative - they are structural, fitted by hand by artisans in Jodhpur who have worked this joint for years. A single wide drawer, a flat bar handle, a generous top. Everything it needs, nothing it doesn\'t.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '46 cm',
     depth: '46 cm'
    },
    photos: ['/images/SAC063_01.png', '/images/SAC063_02.png']
   }
  },
  {
   id: 'SAC064',
   name: 'Waterfall Edge Ribbed Drawer Bedside Table',
   price: 6999,
   description: 'Refined, tactile, and built with an eye for detail - the Waterfall Edge Ribbed Drawer Bedside Table is a bedside piece that brings genuine design thinking into the bedroom. Crafted from solid mango wood in a deep smoky walnut finish, the table is defined by its dramatically rounded waterfall edges that curve seamlessly from the top panel down through the sides. An open middle shelf provides easy access to books or everyday items, while the bottom drawer features a beautifully hand-carved ribbed front panel with a small round brass knob - a contrast in texture that adds warmth and visual interest without overcomplicating the overall form.',
   image: '/images/SAC064_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Smoky Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Waterfall rounded edges', 'Hand-carved ribbed drawer front', 'Round brass knob'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Waterfall edges require patience. The top panel curves seamlessly down through the sides without a visible joint - each curve hand-shaped by artisans in Jodhpur until the transition feels inevitable rather than constructed. The ribbed drawer front below is hand-carved, a deliberate textural contrast against the smooth surfaces above. The brass knob is the final punctuation mark. Made from solid mango wood with a deep smoky walnut finish.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '48 cm',
     width: '51 cm',
     depth: '43 cm'
    },
    photos: ['/images/SAC064_01.png', '/images/SAC064_02.png']
   }
  },
  {
   id: 'SAC065',
   name: 'Stacked Oval Two-Drawer Bedside Table',
   price: 7999,
   description: 'Sculptural, soft, and strikingly original - the Stacked Oval Two-Drawer Bedside Table is a piece that does not follow the rules. Crafted from solid mango wood in a warm honey walnut finish, the table is built as two fully rounded oval drawer units stacked one atop the other on a slim square plinth base, creating a form that feels more like a modern art piece than conventional bedroom furniture. Every edge is generously rounded, every corner eliminated, giving the piece a smooth, almost pebble-like quality that is deeply satisfying in person. Each drawer is fitted with a slender cast brass pull handle in an organic, slightly irregular form.',
   image: '/images/SAC065_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Two stacked oval drawers', 'Organic cast brass pulls', 'Fully rounded edges'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Most bedside tables are boxes with legs. This one is nothing like that. Two fully rounded oval drawer units, stacked and sitting on a slim plinth, with every edge and corner softened until the piece reads almost like a sculpture. The organic cast brass pull handles are individually formed - no two are quite the same. Made from solid mango wood in Jodhpur with a warm honey walnut finish that lets the natural grain speak.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '56 cm',
     depth: '36 cm'
    },
    photos: ['/images/SAC065_01.png', '/images/SAC065_02.png']
   }
  },
  {
   id: 'SAC066',
   name: 'Panel Leg Single Drawer Bedside Table',
   price: 6999,
   description: 'Raw, considered, and quietly confident - the Panel Leg Single Drawer Bedside Table is a piece that lets honest craftsmanship do the talking. Crafted from solid mango wood in a light grey-washed finish, the table is built on a distinctive open panel leg structure - two broad flat side panels and a single front leg that together create an airy, architectural base with an industrial-meets-artisan character. The square top features a subtle parquet block pattern, adding a layer of quiet texture to an otherwise clean surface. A single flush drawer fitted with a small round brass knob sits neatly between the legs, keeping the overall form uncluttered and intentional.',
   image: '/images/SAC066_01.png',
   category: 'Side Tables',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Light Grey-Washed Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Open panel leg base', 'Parquet block top', 'Single flush drawer'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The panel leg structure is an unusual choice for a bedside table, and that is exactly why it works. Two broad flat side panels and a single front leg create a base that is open, architectural, and immediately distinctive. The parquet block top adds quiet texture without announcing itself. A brass-knobbed flush drawer completes the piece. Made from solid mango wood in Jodhpur with a light grey-washed finish that keeps the whole thing feeling cool and considered.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '46 cm',
     depth: '46 cm'
    },
    photos: ['/images/SAC066_01.png', '/images/SAC066_02.png']
   }
  }
 ],
 pooja: [
  {
   id: 'SAC031',
   name: 'Rajasthani Hand-Painted Wooden Bajot Chowki with Brass Plating',
   price: 2199,
   originalPrice: 2599,
   description: 'This square bajot chowki is made from solid wood and hand-decorated with traditional Rajasthani artwork, then finished with brass plating on the frame details. Made in Jodhpur by artisans who have carried this craft for generations, it is used traditionally as a seat or altar surface in pooja and home temple ceremonies.',
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
    story: 'The chowki is the most sacred surface in an Indian home - and at Sugan, we believe it should reflect that. This bajot is hand-crafted in Jodhpur from high-grade natural wood, with brass-plated detailing that catches the light.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  },
  {
   id: 'SAC032-NEW',
   name: 'Rajasthani Hand-Painted Wooden Bajot Chowki for Pooja',
   price: 1999,
   originalPrice: 2599,
   description: 'A square bajot chowki handcrafted in Jodhpur with vivid hand-painted Rajasthani artwork across its surface and solid wood construction throughout. Used traditionally as a ceremonial seat or altar platform in pooja rooms and home temples, this piece carries the colour and spirit of Rajasthani craft in every detail.',
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
    story: 'Some objects carry meaning beyond their function. This chowki is one of them. Sugan was started in Jodhpur - a city where the tradition of hand-painted, hand-carved religious woodcraft runs centuries deep.',
    care: 'Hand wash with mild soap. Do not soak.',
    maintenance: 'Apply mineral oil periodically'
   }
  }
 ],
 dining: [],
 office: [],
 library: [
  {
   id: 'SAC057',
   name: 'Lattice Carved Four-Shelf Bookshelf',
   price: 4999,
   description: 'Tall, slender, and unmistakably handcrafted - the Lattice Carved Four-Shelf Bookshelf brings old-world artisanship into the modern home. Crafted from solid acacia wood in a warm honey finish, this compact freestanding shelf features four open shelves framed by intricately hand-carved lattice panels on all sides. The repeating ogee arch motif cut into each panel creates a beautiful interplay of light and shadow, making this piece as captivating empty as it is styled. Its slim footprint makes it ideal for tight spaces without compromising on display area or visual character. Whether holding books, plants, ceramics, or curated objects, it earns its place in any room it enters.',
   image: '/images/SAC057_01.png',
   category: 'Bookshelf',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Acacia Wood', 'Hand-carved lattice panels', 'Slim footprint'],
    sustainability: 'Sustainably sourced acacia wood',
    story: 'The lattice panels came first - the shelf was built around them. Each panel is hand-carved by artisans in Jodhpur using a repeating ogee arch motif that has been cut into Indian woodwork for centuries. The result is a bookshelf that earns its place in any room it enters: four open shelves in a slim, vertical profile, warm honey acacia throughout, and a carved frame that makes the whole piece feel considered rather than functional.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '91 cm',
     width: '37 cm',
     depth: '28 cm'
    },
    photos: ['/images/SAC057_01.png', '/images/SAC057_02.png']
   },
   relatedSizes: [
    { size: 'Dark Walnut', productId: 'SAC058', price: 0 }
   ]
  },
  {
   id: 'SAC058',
   name: 'Lattice Carved Four-Shelf Bookshelf (Dark Walnut)',
   price: 4999,
   description: 'Tall, slender, and unmistakably handcrafted - the Lattice Carved Four-Shelf Bookshelf brings old-world artisanship into the modern home. Crafted from solid acacia wood in a rich dark walnut finish, this compact freestanding shelf features four open shelves framed by intricately hand-carved lattice panels on all sides. The repeating ogee arch motif cut into each panel creates a beautiful interplay of light and shadow, making this piece as captivating empty as it is styled. Its slim footprint makes it ideal for tight spaces without compromising on display area or visual character. The deep espresso tone adds a layer of drama and sophistication, making it a natural fit for darker, moodier interiors. Whether holding books, plants, ceramics, or curated objects, it earns its place in any room it enters.',
   image: '/images/SAC058_01.png',
   category: 'Bookshelf',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Acacia Wood', 'Hand-carved lattice panels', 'Slim footprint'],
    sustainability: 'Sustainably sourced acacia wood',
    story: 'The lattice panels came first - the shelf was built around them. Each panel is hand-carved by artisans in Jodhpur using a repeating ogee arch motif that has been cut into Indian woodwork for centuries. The result is a bookshelf that earns its place in any room it enters: four open shelves in a slim, vertical profile, deep espresso walnut acacia throughout, and a carved frame that makes the whole piece feel considered rather than functional.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '91 cm',
     width: '37 cm',
     depth: '28 cm'
    },
    photos: ['/images/SAC058_01.png', '/images/SAC058_02.png']
   },
   relatedSizes: [
    { size: 'Honey', productId: 'SAC057', price: 0 }
   ]
  }
 ],
 outdoor: [],
 wall: [
  {
   id: 'SAC070',
   name: 'Double Tier Rounded Wall Shelf',
   price: 1999,
   description: 'Compact, clean, and crafted with care - the Double Tier Rounded Wall Shelf brings functional wall storage to life with a warm artisan touch. Crafted from solid mango wood in a muted terracotta-washed finish, this floating shelf features two generously rounded shelves connected by twin vertical bracket supports that double as the wall mounting system. The softly rounded ends on both tiers give the piece an organic, contemporary character that sets it apart from ordinary flat-edged shelving. Mount it in any room and it works - whether displaying small plants, framed photos, candles, or daily essentials.',
   image: '/images/SAC070_01.png',
   category: 'Wall Shelves',
   room: 'wall',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Terracotta-Washed Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Double tier design', 'Rounded shelf ends', 'Twin bracket wall mount'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The rounded ends are a small detail that changes everything. Most wall shelves are cut straight across and left at that. These are shaped - each end gently curved, making the shelf feel considered rather than functional. Two tiers, twin bracket supports, a terracotta-washed finish that sits warmly against almost any wall colour. Made from solid mango wood in Jodhpur.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '20 cm',
     width: '46 cm',
     depth: '11 cm'
    },
    photos: ['/images/SAC070_01.png', '/images/SAC070_02.png']
   }
  },
  {
   id: 'SAC072',
   name: 'Bobbin Leg Double Tier Wall Shelf',
   price: 1499,
   description: 'Traditional craft, contemporary purpose - the Bobbin Leg Double Tier Wall Shelf is a wall-mounted display piece that brings character and warmth to any bare wall. Crafted from solid mango wood in a warm natural honey finish, this shelf features two wide flat rectangular tiers connected by four hand-turned bobbin legs, each one shaped with a repeating spherical bead pattern that is a hallmark of classical Indian woodturning. Wide enough to hold a meaningful collection of objects, shallow enough to sit flush and unobtrusive against any wall.',
   image: '/images/SAC072_01.png',
   category: 'Wall Shelves',
   room: 'wall',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Hand-turned bobbin legs', 'Two wide display tiers', 'Wide rectangular form'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Bobbin turning is one of the oldest woodworking crafts in India, and you can see every hour of practice in the legs of this shelf. Each of the four legs is individually hand-turned on a lathe by artisans in Jodhpur, shaped with a repeating spherical bead pattern that takes skill and patience to produce consistently. Two wide flat tiers sit above and below, generous in display space, and the natural honey finish keeps the whole piece warm and inviting.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '33 cm',
     width: '79 cm',
     depth: '20 cm'
    },
    photos: ['/images/SAC072_01.png', '/images/SAC072_02.png']
   }
  },
  {
   id: 'SAC067',
   name: 'Fluted Post Double Tier Wall Shelf',
   price: 1499,
   description: 'Simple, slim, and full of handcrafted detail - the Fluted Post Double Tier Wall Shelf is a wall shelf that earns a second look. Crafted from solid mango wood in a warm natural finish, this compact floating shelf features two wide rounded-end tiers held apart by a pair of hand-carved fluted vertical posts with rounded top caps. The vertical fluting on each post adds a subtle classical texture that lifts what could be an ordinary shelf into something genuinely considered. Both tiers have gently rounded ends that keep the overall form soft and organic. Slim in profile and wide in span, it fits neatly on any wall without demanding too much space while still offering two full display levels.',
   image: '/images/SAC067_01.png',
   category: 'Wall Shelves',
   room: 'wall',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Hand-carved fluted posts', 'Rounded-end display tiers', 'Rounded post caps'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The fluting is the point. Two hand-carved vertical posts, each grooved with careful parallel channels by artisans in Jodhpur, connect the two wide tiers and give the piece a classical texture that most wall shelves simply don\'t have. The rounded ends on both tiers and the small rounded post caps add further care. Slim in profile, wide in span, warm in finish.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '20 cm',
     width: '61 cm',
     depth: '9 cm'
    },
    photos: ['/images/SAC067_01.png', '/images/SAC067_02.png']
   }
  },
  {
   id: 'SAC068',
   name: 'Semicircle Ribbed Wall Shelf',
   price: 999,
   description: 'Sculptural, compact, and unmistakably handcrafted - the Semicircle Ribbed Wall Shelf is a wall shelf that functions as a piece of art in its own right. Crafted from solid mango wood in a natural warm finish, this wall-mounted shelf is built around a bold semicircular form with a flat mounting edge against the wall and a smooth flat display surface on top. The front and sides of the bracket are hand-carved with a series of concentric ribbed arches that radiate outward from the centre, creating a stunning sunburst or ripple effect that draws the eye and adds extraordinary depth and texture to an otherwise simple form. Small in footprint, large in personality.',
   image: '/images/SAC068_01.png',
   category: 'Wall Shelves',
   room: 'wall',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Semicircular silhouette', 'Hand-carved concentric ribs', 'Smooth flat display surface'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'A semicircle is a simple shape. What happens when you hand-carve concentric ribbed arches across its entire face - a ripple pattern radiating outward from the centre - is not simple at all. Each rib is individually cut by artisans in Jodhpur, and the effect is a piece that reads as wall sculpture as much as it does as a shelf. The smooth flat top holds objects cleanly. The carved face does the rest.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '20 cm',
     width: '36 cm',
     depth: '18 cm'
    },
    photos: ['/images/SAC068_01.png', '/images/SAC068_02.png']
   }
  },
  {
   id: 'SAC069',
   name: 'Arch Back Ribbed Double Shelf',
   price: 1499,
   description: 'Architectural, tactile, and instantly striking - the Arch Back Ribbed Double Shelf is a wall shelf that transforms any surface it touches. Crafted from solid mango wood in a warm dark walnut finish, this wall-mounted shelf is built around a tall arched back panel with hand-carved concentric arch ribbing that runs the full height of the piece. Two semicircular display shelves extend from the front of the panel at different heights, both following the curved silhouette of the arched back for a cohesive, considered form. The vertical fluting on the central column between the shelves adds a further layer of texture and classical detail. Tall, narrow, and full of character.',
   image: '/images/SAC069_01.png',
   category: 'Wall Shelves',
   room: 'wall',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Arched back panel', 'Two semicircular shelves', 'Hand-carved concentric arch ribs', 'Vertical ribbed column'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'The arched back panel sets everything in motion. Tall, bold, and carved with concentric arch ribs that layer upward from bottom to top, it turns a wall shelf into a genuine architectural moment. Two semicircular shelves follow the curve of the arch at different heights - practical, but shaped to match. The vertical ribbed column between them adds one more layer of classical craft. Made from solid mango wood in Jodhpur with a deep dark walnut finish that makes every carved line stand out.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '56 cm',
     width: '30 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC069_01.png', '/images/SAC069_02.png']
   }
  },
  {
   id: 'SAC071',
   name: 'Twin Post Three-Tier Wall Shelf',
   price: 1999,
   description: 'Structured, minimal, and built with genuine craft - the Twin Post Three-Tier Wall Shelf is a wall-mounted display unit that brings order and warmth to any space it occupies. Crafted from solid mango wood in a light natural finish, this shelf is constructed around two sturdy vertical cylindrical posts that run the full height of the piece, connecting three wide horizontal shelves at evenly spaced intervals. Each shelf features a subtle raised front lip that keeps displayed objects secure and adds a clean visual boundary to each tier. The twin post structure gives the piece an open, airy quality while remaining solid and well-anchored to the wall.',
   image: '/images/SAC071_01.png',
   category: 'Wall Shelves',
   room: 'wall',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Light Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Handcrafted in Jodhpur', '100% Solid Mango Wood', 'Three wide display tiers', 'Twin cylindrical post supports', 'Raised front lip on each shelf'],
    sustainability: 'Sustainably sourced mango wood',
    story: 'Two cylindrical posts, three shelves, and a raised lip on each tier that keeps everything in its place. The twin post structure is deceptively simple - it creates an open, airy frame that makes the shelves feel light on the wall while staying solid and well-anchored. Each shelf is wide enough to be genuinely useful. The natural light finish keeps the mango grain warm and visible throughout. Made in Jodhpur.',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '58 cm',
     width: '58 cm',
     depth: '15 cm'
    },
    photos: ['/images/SAC071_01.png', '/images/SAC071_02.png']
   }
  }
 ],
};

// All products combined (deduped by id — some products appear in multiple rooms)
export const allProducts: Product[] = Object.values(roomProducts).flat().filter(
  (p, i, arr) => arr.findIndex(q => q.id === p.id) === i
);

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
  
  // Find the small variant — exclude set/pack products so "Set of 3-S" doesn't win
  const smallVariant = family.find(p => {
    if (isSetProduct(p)) return false;
    const id = p.id.toLowerCase();
    const name = p.name.toLowerCase();
    return id.endsWith('_s') || name.includes('small');
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
 { id: 'Pet', name: 'Pet' }
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
 }
];

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
 { id: 'wall', name: 'Wall Shelves', icon: 'Frame', description: 'Handcrafted wall shelves and displays' },
 { id: 'bar', name: 'Bar', icon: 'Wine', description: 'Wine racks and bar essentials' },
 { id: 'entryway', name: 'Entryway', icon: 'DoorOpen', description: 'Cabinets, console tables, and chairs for your entrance' }
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
  },
  {
   id: 'SAC073',
   name: 'Circular Cut Four-Bottle Wine Rack',
   price: 1999,
   description: 'Functional craft at its finest - the Circular Cut Four-Bottle Wine Rack is a tabletop wine holder that earns its place in any room it occupies. Crafted from solid acacia wood in a rich dark walnut finish, the rack is built around two large circular side panels with four circular cutouts each, connected by a pair of sturdy round dowel rods that hold the structure together and cradle the bottles securely in place. The dramatic circular side panels give the piece a bold, graphic quality, while the deep grain and natural character marks of the acacia wood add warmth and authenticity to every surface.',
   image: '/images/SAC073_01.png',
   category: 'Wine Rack',
   room: 'bar',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Holds 4 bottles securely', 'Round dowel rod connectors', 'Bold circular side panels', 'Dark walnut finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '29 cm',
     width: '33 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC073_01.png', '/images/SAC073_02.png']
   }
  },
  {
   id: 'SAC074',
   name: 'Hexagon Five-Bottle Wine Rack',
   price: 2499,
   description: 'Geometry meets craftsmanship in the most satisfying way - the Hexagon Five-Bottle Wine Rack is a tabletop wine rack that is as much a design object as it is a practical storage solution. Crafted from solid acacia wood in a warm honey walnut finish, the rack is built within a bold hexagonal frame with thick, cleanly mitered panels that give it a substantial, high-quality feel. Inside, two scalloped cradle rails with hand-cut bottle slots are positioned at staggered heights across three tiers, holding up to five bottles securely in a classic horizontal lay-flat arrangement.',
   image: '/images/SAC074_01.png',
   category: 'Wine Rack',
   room: 'bar',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Bold hexagonal frame', 'Holds 5 bottles across three tiers', 'Lay-flat horizontal storage', 'Honey walnut finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '29 cm',
     width: '33 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC074_01.png', '/images/SAC074_02.png']
   }
  },
  {
   id: 'SAC075',
   name: 'Bleached Slab Leg Coffee Table',
   price: 9999,
   description: 'Low, wide, and effortlessly understated - the Bleached Slab Leg Coffee Table brings a raw, organic calm to any living space. Crafted from solid mango wood in a light bleached finish, its long oval-edged rectangular top sits on broad flat slab legs that keep the form grounded and minimal. The pale washed tone draws out the natural grain of the mango wood while giving the piece a driftwood-like quality that suits coastal, Scandi, and organic modern interiors equally well.',
   image: '/images/SAC075_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Bleached Natural Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Wide low profile', 'Flat slab legs', 'Bleached finish'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '38 cm',
     width: '109 cm',
     depth: '58 cm'
    },
    photos: ['/images/SAC075_01.png', '/images/SAC075_02.png']
   }
  },
  {
   id: 'SAC076',
   name: 'Dark Base Organic Top Coffee Table',
   price: 11999,
   description: 'Bold contrasts and organic forms define the Dark Base Organic Top Coffee Table, a living room centrepiece that commands attention without effort. Crafted from solid mango wood, the free-form organic shaped top sits above a set of dramatically dark sculptural legs, creating a striking two-tone composition that balances raw craft with contemporary design sensibility. The natural grain of the mango wood flows across the top surface, making every piece genuinely one of a kind.',
   image: '/images/SAC076_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Top, Dark Ebony Base',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Organic free-form top', 'Dark sculptural base', 'Two-tone composition'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '38 cm',
     width: '107 cm',
     depth: '71 cm'
    },
    photos: ['/images/SAC076_01.png', '/images/SAC076_02.png']
   }
  },
  {
   id: 'SAC077',
   name: 'Pedestal Round Coffee Table',
   price: 14999,
   description: 'A true living room centrepiece, the Pedestal Round Coffee Table is a celebration of sculptural craftsmanship in solid mango wood. The wide round top with a beautifully visible natural grain sits atop a solid turned pedestal base, creating a clean, timeless silhouette that works as confidently in a modern interior as it does in a more traditional setting. The warm honey finish brings out the depth and character of the mango wood throughout.',
   image: '/images/SAC077_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Wide round top', 'Solid turned pedestal base', 'Warm honey finish'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '38 cm',
     width: '91 cm',
     depth: '91 cm'
    },
    photos: ['/images/SAC077_01.png', '/images/SAC077_02.png']
   }
  },
  {
   id: 'SAC078',
   name: 'Log Base Travertine Top Coffee Table',
   price: 15999,
   description: 'Nature and luxury in one piece - the Log Base Travertine Top Coffee Table brings together the raw beauty of solid mango wood and the refined elegance of travertine marble. A smooth round travertine marble top rests on a chunky, textured mango wood log-style base that retains all the character and organic grain of the natural timber. The contrast between the cool stone surface and the warm wood base creates a material dialogue that feels both grounded and luxurious.',
   image: '/images/SAC078_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble top', 'Solid mango wood log base', 'Bold round silhouette', 'Material contrast'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '43 cm',
     width: '84 cm',
     depth: '84 cm'
    },
    photos: ['/images/SAC078_01.png', '/images/SAC078_02.png']
   }
  },
  {
   id: 'SAC079',
   name: 'Travertine Top Pedestal Side Table',
   price: 7999,
   description: 'Compact, refined, and effortlessly elegant - the Travertine Top Pedestal Side Table is a versatile accent piece that brings a touch of natural luxury to any room. A smooth travertine marble top sits on a solid mango wood pedestal base, combining two of nature\'s finest materials in a clean, considered form. Small enough to tuck beside a sofa or bed, striking enough to hold its own in any space it occupies.',
   image: '/images/SAC079_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble top', 'Square pedestal base in solid mango wood', 'Material contrast', 'Compact footprint'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '44 cm',
     width: '42 cm',
     depth: '42 cm'
    },
    photos: ['/images/SAC079_01.png', '/images/SAC079_02.png']
   }
  },
  {
   id: 'SAC080',
   name: 'Trestle Base Travertine Top Coffee Table',
   price: 15999,
   description: 'Architectural structure meets natural luxury in the Trestle Base Travertine Top Coffee Table. A wide rectangular travertine marble top sits above a solid mango wood trestle base, creating a refined piece that is as strong in its construction as it is striking in its aesthetic. The warm tones of the mango wood complement the cool, naturally veined travertine surface for a material pairing that feels genuinely considered and premium.',
   image: '/images/SAC080_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble top', 'Solid mango wood trestle base', 'Rectangular form', 'Material contrast'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '39 cm',
     width: '91 cm',
     depth: '56 cm'
    },
    photos: ['/images/SAC080_01.png', '/images/SAC080_02.png']
   }
  },
  {
   id: 'SAC081',
   name: 'T-Base Travertine Top Side Table',
   price: 8999,
   description: 'Slim, tall, and quietly luxurious - the T-Base Travertine Top Side Table is a refined accent piece for the living room. A smooth travertine marble top rests on a solid mango wood base with a clean T-shaped or pedestal structure, creating a piece that is elegant in proportion and warm in material character. The height and slim footprint make it ideal beside an armchair or at the end of a sofa.',
   image: '/images/SAC081_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble top', 'Solid mango wood base', 'Taller proportions', 'Slim footprint'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '55 cm',
     width: '61 cm',
     depth: '46 cm'
    },
    photos: ['/images/SAC081_01.png', '/images/SAC081_02.png']
   }
  },
  {
   id: 'SAC082',
   name: 'Large Trestle Frame Travertine Coffee Table',
   price: 15999,
   description: 'Grand in scale and refined in material, the Large Trestle Frame Travertine Coffee Table is a statement piece built for spacious living rooms. A wide travertine marble slab top sits above a solid acacia wood trestle frame base, combining the natural warmth of hand-crafted timber with the cool elegance of genuine travertine stone. The substantial proportions make it a true room anchor, while the open trestle base keeps the overall form feeling light and considered.',
   image: '/images/SAC082_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble slab top', 'Solid acacia wood trestle base', 'Open frame structure', 'Grand scale'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '40 cm',
     width: '110 cm',
     depth: '70 cm'
    },
    photos: ['/images/SAC082_01.png', '/images/SAC082_02.png']
   }
  },
  {
   id: 'SAC083',
   name: 'Angular Base Travertine Top Side Table',
   price: 8999,
   description: 'Architectural and refined, the Angular Base Travertine Top Side Table is a contemporary accent piece that pairs solid acacia wood with a genuine travertine marble surface. The angular, geometric wood base provides a structured, design-forward foundation for the cool stone top, creating a piece that feels both considered and luxurious. Compact in footprint, strong in character.',
   image: '/images/SAC083_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble top', 'Solid acacia wood angular base', 'Material contrast', 'Square proportions'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '43 cm',
     width: '55 cm',
     depth: '55 cm'
    },
    photos: ['/images/SAC083_01.png', '/images/SAC083_02.png']
   }
  },
  {
   id: 'SAC084',
   name: 'Sculptural Base Round Coffee Table',
   price: 8999,
   description: 'Organic, sculptural, and full of character - the Sculptural Base Round Coffee Table is a living room piece that earns its place through genuine craft. Crafted from solid acacia wood, a smooth round top sits above a sculptural organic base that showcases the natural form and grain of the timber. Every surface reveals the natural beauty of the acacia wood, from the flowing grain patterns on the top to the raw character of the base structure.',
   image: '/images/SAC084_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Round top', 'Sculptural organic base', 'Natural acacia finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '41 cm',
     width: '71 cm',
     depth: '71 cm'
    },
    photos: ['/images/SAC084_01.png', '/images/SAC084_02.png']
   }
  },
  {
   id: 'SAC085',
   name: 'Open Shelf Pedestal Side Table',
   price: 4999,
   description: 'Practical, clean, and crafted with care - the Open Shelf Pedestal Side Table is a compact accent table that offers two levels of display and storage in a slim, considered form. Crafted from solid acacia wood, a square top sits above a pedestal structure with an open lower shelf, keeping everyday essentials or decor objects neatly within reach. The natural grain of the acacia wood adds warmth and character to an otherwise minimal silhouette.',
   image: '/images/SAC085_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Square top with open lower shelf', 'Pedestal base structure', 'Natural finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '61 cm',
     width: '44 cm',
     depth: '44 cm'
    },
    photos: ['/images/SAC085_01.png', '/images/SAC085_02.png']
   }
  },
  {
   id: 'SAC086',
   name: 'Wide Slatted Drum Coffee Table',
   price: 9999,
   description: 'Expansive, architectural, and unmistakably handcrafted - the Wide Slatted Drum Coffee Table is a bold living room centrepiece in solid acacia wood. A generously wide round top with a lipped edge sits above a full slatted drum base, with vertical slats arranged in an open formation around the circumference. The large scale and open slat structure create a piece that fills a room with presence without ever feeling heavy or imposing.',
   image: '/images/SAC086_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Wide lipped round top', 'Slatted drum base', 'Natural acacia finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '41 cm',
     width: '99 cm',
     depth: '99 cm'
    },
    photos: ['/images/SAC086_01.png', '/images/SAC086_02.png']
   }
  },
  {
   id: 'SAC087',
   name: 'Geometric Base Square Side Table',
   price: 6999,
   description: 'Clean geometry and warm craft combine in the Geometric Base Square Side Table, a compact living room accent in solid acacia wood. A square top with clean edges sits above a geometric cutout base, creating a piece that is minimal in silhouette but considered in detail. The natural acacia grain adds warmth and character throughout, making this a versatile piece that sits comfortably beside a sofa or armchair without demanding too much space.',
   image: '/images/SAC087_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Square top', 'Geometric cutout base', 'Compact proportions'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '46 cm',
     width: '60 cm',
     depth: '60 cm'
    },
    photos: ['/images/SAC087_01.png', '/images/SAC087_02.png']
   }
  },
  {
   id: 'SAC088',
   name: 'Round Textured Pedestal Coffee Table',
   price: 12999,
   description: 'Grounded, tactile, and full of quiet confidence - the Round Textured Pedestal Coffee Table is a living room centrepiece crafted from solid mango wood in a muted, earthy finish. A wide round top with a lipped edge sits on a solid textured pedestal base, with a surface that reveals the natural character of the mango wood up close. The muted tone gives this piece a concrete-like visual quality while retaining all the warmth of real timber.',
   image: '/images/SAC088_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Muted Earth Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Wide lipped round top', 'Solid textured pedestal base', 'Muted earthy finish'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '42 cm',
     width: '89 cm',
     depth: '89 cm'
    },
    photos: ['/images/SAC088_01.png', '/images/SAC088_02.png']
   }
  },
  {
   id: 'SAC089',
   name: 'Goblet Pedestal Side Table',
   price: 6999,
   description: 'Elegant in form and honest in craft, the Goblet Pedestal Side Table is a slim accent piece that brings a sculptural quality to any living room corner. Crafted from solid mango wood, the round top sits above a turned goblet-shaped pedestal base with a wide, flared foot, creating a silhouette that is classical in inspiration and contemporary in finish. The natural grain of the mango wood flows through the entire piece, adding warmth and character to every surface.',
   image: '/images/SAC089_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Round top', 'Goblet pedestal base', 'Natural warm finish'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '61 cm',
     width: '45 cm',
     depth: '45 cm'
    },
    photos: ['/images/SAC089_01.png', '/images/SAC089_02.png']
   }
  },
  {
   id: 'SAC090',
   name: 'Grey Wash Round Coffee Table',
   price: 9999,
   description: 'Cool, calm, and crafted with considered simplicity - the Grey Wash Round Coffee Table brings a light, contemporary energy to any living room. Crafted from solid wood in a pale grey-washed finish, the wide round top sits on a clean pedestal or slab base that keeps the overall form uncluttered and versatile. The washed finish softens the natural grain of the timber, creating a surface that feels relaxed and effortlessly modern.',
   image: '/images/SAC090_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Solid Wood',
    finish: 'Grey-Washed Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Wood', 'Wide round top', 'Grey-washed finish', 'Clean base structure'],
    sustainability: 'Sustainably sourced solid wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '45 cm',
     width: '80 cm',
     depth: '80 cm'
    },
    photos: ['/images/SAC090_01.png', '/images/SAC090_02.png']
   }
  },
  {
   id: 'SAC091',
   name: 'Tree Stump Side Table',
   price: 6999,
   description: 'Raw, warm, and beautifully honest - the Tree Stump Side Table is a compact accent piece that brings the organic character of solid mango wood into the living room in its most elemental form. Shaped to mimic the natural form of a tree stump, the piece features a flat round top and a ridged, textured cylindrical body that retains all the natural grain and character marks of the timber. No two pieces are identical, and that is entirely the point.',
   image: '/images/SAC091_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Stump-inspired silhouette', 'Flat round top', 'Natural grain and character marks'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '40 cm',
     width: '40 cm',
     depth: '40 cm'
    },
    photos: ['/images/SAC091_01.png', '/images/SAC091_02.png']
   }
  },
  {
   id: 'SAC092',
   name: 'Wide Disc Coffee Table',
   price: 9999,
   description: 'Low, wide, and commanding - the Wide Disc Coffee Table is a living room centrepiece that proves restraint and impact are not mutually exclusive. Crafted from solid mango wood, the extra-wide round top with a clean lipped edge sits on a low solid base, creating a broad, grounded presence in any space it occupies. The natural mango wood grain flows across the large top surface, making every piece genuinely distinctive. Low to the ground and generous in width, this table works beautifully in relaxed, low-seating living room setups.',
   image: '/images/SAC092_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Extra-wide round top', 'Lipped edge', 'Low profile'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '30 cm',
     width: '90 cm',
     depth: '90 cm'
    },
    photos: ['/images/SAC092_01.png', '/images/SAC092_02.png']
   }
  },
  {
   id: 'SAC093',
   name: 'Ribbed Cylinder Side Table',
   price: 4999,
   description: 'Small, tactile, and quietly sculptural - the Ribbed Cylinder Side Table is a compact accent piece in solid mango wood that works wherever you need a surface. The cylindrical body features a ribbed or textured exterior that adds depth and a handcrafted feel, topped with a clean flat round surface. Compact enough for any corner, characterful enough to be noticed.',
   image: '/images/SAC093_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Ribbed cylindrical body', 'Flat round top', 'Compact proportions'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '42 cm',
     width: '40 cm',
     depth: '40 cm'
    },
    photos: ['/images/SAC093_01.png', '/images/SAC093_02.png']
   }
  },
  {
   id: 'SAC094',
   name: 'Plank Top Double Shelf Coffee Table',
   price: 12999,
   description: 'Rustic character meets practical design in the Plank Top Double Shelf Coffee Table, a generous living room piece in solid acacia wood. A wide rectangular top with visible plank joinery and natural grain sits above a lower display shelf, all supported by a sturdy leg structure that speaks to decades of woodworking tradition. The rich natural finish of the acacia wood brings warmth and depth to every surface, while the lower shelf keeps books, magazines, and everyday objects neatly within reach.',
   image: '/images/SAC094_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Rich Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Wide plank top', 'Open lower shelf', 'Sturdy leg structure'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '41 cm',
     width: '112 cm',
     depth: '69 cm'
    },
    photos: ['/images/SAC094_01.png', '/images/SAC094_02.png']
   }
  },
  {
   id: 'SAC095',
   name: 'Cube Shelf Side Table',
   price: 6999,
   description: 'Versatile, minimal, and built to last - the Cube Shelf Side Table is a compact accent piece in solid acacia wood that works as well beside a bed as it does next to a sofa. The clean square form features a flat top surface and an open lower shelf, providing two levels of display and storage within a footprint that fits anywhere. The natural acacia grain adds warmth and character to what is otherwise a beautifully restrained design.',
   image: '/images/SAC095_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Cube silhouette', 'Flat top with open lower shelf', 'Compact proportions'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '51 cm',
     depth: '51 cm'
    },
    photos: ['/images/SAC095_01.png', '/images/SAC095_02.png']
   }
  },
  {
   id: 'SAC096',
   name: 'Low Organic Coffee Table with Ball Feet',
   price: 9999,
   description: 'Long, low, and full of personality - the Low Organic Coffee Table with Ball Feet is a living room piece that brings warmth, wit, and genuine craft in one form. Crafted from solid mango wood, the wide organic-edged rectangular top sits on a set of turned ball feet that give the piece a playful yet considered character. The natural grain and warm tones of the mango wood flow across the entire top surface, making every piece genuinely unique. Low in profile and generous in length, this table is designed for relaxed, lived-in living rooms.',
   image: '/images/SAC096_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   relatedSizes: [{ size: 'Dark Walnut', productId: 'SAC097', price: 9999 }],
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Wide organic top', 'Turned ball feet', 'Low profile'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '34 cm',
     width: '119 cm',
     depth: '80 cm'
    },
    photos: ['/images/SAC096_01.png', '/images/SAC096_02.png']
   }
  },
  {
   id: 'SAC097',
   name: 'Low Organic Coffee Table with Ball Feet (Dark)',
   price: 9999,
   description: 'Long, low, and full of personality - the Low Organic Coffee Table with Ball Feet brings warmth, wit, and genuine craft to any living room. Crafted from solid mango wood in a rich dark walnut finish, the wide organic-edged rectangular top sits on a set of turned ball feet that give the piece a playful yet considered character. The deep, moody finish brings out the natural grain of the mango wood in a more dramatic way, making this the choice for darker, richer interior palettes. Low in profile and generous in length, it is designed for relaxed, lived-in living rooms.',
   image: '/images/SAC097_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   relatedSizes: [{ size: 'Natural Honey', productId: 'SAC096', price: 9999 }],
   details: {
    materials: 'Mango Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Wide organic top', 'Turned ball feet', 'Dark walnut finish'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '34 cm',
     width: '119 cm',
     depth: '80 cm'
    },
    photos: ['/images/SAC097_01.png', '/images/SAC097_02.png']
   }
  },
  {
   id: 'SAC101',
   name: 'Mushroom Pedestal Side Table',
   price: 4999,
   description: 'Organic in form and honest in material, the Mushroom Pedestal Side Table is a compact living room accent in solid acacia wood. The wide round top with a subtle lipped edge sits on a solid mushroom-shaped pedestal base, creating a clean, sculptural silhouette that suits a wide range of interior styles. The natural acacia grain adds warmth and a sense of authenticity to every surface.',
   image: '/images/SAC101_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Wide round lipped top', 'Mushroom pedestal base', 'Natural finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '50 cm',
     width: '46 cm',
     depth: '46 cm'
    },
    photos: ['/images/SAC101_01.png', '/images/SAC101_02.png']
   }
  },
  {
   id: 'SAC102',
   name: 'Turned Leg Accent Side Table',
   price: 6999,
   description: 'Classic craftsmanship in a compact form - the Turned Leg Accent Side Table is a versatile bedside or living room accent in solid acacia wood. The clean square top sits on a set of hand-turned legs with a warm, traditional character, connected by a sturdy stretcher base that adds stability and visual interest. The natural acacia grain and warm finish make this a piece that works in both classic and contemporary interiors.',
   image: '/images/SAC102_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Clean square top', 'Hand-turned legs', 'Stretcher base'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '46 cm',
     width: '46 cm',
     depth: '44 cm'
    },
    photos: ['/images/SAC102_01.png', '/images/SAC102_02.png']
   }
  },
  {
   id: 'SAC103',
   name: 'Tall Slim Pedestal Side Table',
   price: 3999,
   description: 'Slim, tall, and quietly elegant - the Tall Slim Pedestal Side Table is a compact living room accent in solid acacia wood that earns its place beside any armchair or sofa. The small round or square top sits on a slender pedestal body, creating a clean, minimal silhouette that takes up very little floor space while providing a practical surface at the right height. The natural acacia grain adds warmth and character to an otherwise restrained form.',
   image: '/images/SAC103_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Tall slim profile', 'Pedestal form', 'Affordable accent'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '41 cm',
     depth: '41 cm'
    },
    photos: ['/images/SAC103_01.png', '/images/SAC103_02.png']
   }
  },
  {
   id: 'SAC107',
   name: 'Toronto Marble Top Side Table',
   price: 6999,
   description: 'A versatile accent piece with a genuinely luxurious material finish - the Toronto Marble Top Side Table pairs solid acacia wood with a clean Toronto marble surface for a compact side table that works in both living rooms and bedrooms. The naturally veined marble top sits on a solid acacia wood base, with the warm timber structure providing a natural counterpoint to the cool stone surface above.',
   image: '/images/SAC107_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Toronto Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Toronto marble top', 'Solid acacia wood base', 'Versatile proportions', 'Material contrast'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '51 cm',
     width: '45 cm',
     depth: '49 cm'
    },
    photos: ['/images/SAC107_01.png', '/images/SAC107_02.png']
   }
  },
  {
   id: 'SAC108',
   name: 'Banswada Marble Top Side Table',
   price: 6999,
   description: 'Warm, grounded, and quietly luxurious - the Banswada Marble Top Side Table pairs solid acacia wood with a genuine Banswada marble surface for a living room accent that brings natural material quality to any space. The warm-toned, naturally veined Banswada marble top sits above a solid acacia wood base, creating a material pairing that feels rich without being showy. Compact and versatile, this is a piece that earns its place in any living room.',
   image: '/images/SAC108_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Banswada Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Banswada marble top', 'Solid acacia wood base', 'Material harmony', 'Natural material quality'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '50 cm',
     width: '47 cm',
     depth: '44 cm'
    },
    photos: ['/images/SAC108_01.png', '/images/SAC108_02.png']
   }
  },
  {
   id: 'SAC109',
   name: 'Tall Pedestal Banswada Marble Top Side Table',
   price: 4999,
   description: 'Slim, tall, and refined in material - the Tall Pedestal Banswada Marble Top Side Table is a compact living room accent that brings natural stone quality to any corner. The genuine Banswada marble top with its warm, natural veining sits on a tall, slim acacia wood pedestal base, creating a piece that is elegant in proportion and honest in material. Its slender profile makes it ideal for tight spaces, while the marble top adds an immediate sense of quality.',
   image: '/images/SAC109_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Banswada Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Banswada marble top', 'Solid acacia wood pedestal base', 'Tall slim profile', 'Affordable natural stone accent'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '59 cm',
     width: '41 cm',
     depth: '41 cm'
    },
    photos: ['/images/SAC109_01.png', '/images/SAC109_02.png']
   }
  },
  {
   id: 'SAC110',
   name: 'Square Banswada Marble Top Side Table',
   price: 6999,
   description: 'Compact, grounded, and genuinely premium in material - the Square Banswada Marble Top Side Table pairs solid acacia wood with a warm Banswada marble surface in a clean square form. The natural stone top with its warm-toned veining sits above a solid acacia wood base, creating a material pairing that feels rich, considered, and deeply rooted in natural craft. A compact piece that punches well above its footprint in terms of visual quality.',
   image: '/images/SAC110_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Banswada Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Banswada marble top', 'Solid acacia wood base', 'Square form', 'Material harmony'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '44 cm',
     width: '46 cm',
     depth: '46 cm'
    },
    photos: ['/images/SAC110_01.png', '/images/SAC110_02.png']
   }
  },
  {
   id: 'SAC111',
   name: 'Open Frame Side Table',
   price: 6999,
   description: 'Clean, open, and crafted with honest simplicity - the Open Frame Side Table is a living room accent in solid acacia wood that balances practicality with a refined structural form. The rectangular top sits on an open frame base with a lower shelf, creating a piece that offers two display levels within a slim, considered footprint. The natural acacia grain and warm finish add character and warmth to an otherwise minimal design.',
   image: '/images/SAC111_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Rectangular top with open lower shelf', 'Open frame base', 'Slim footprint'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '58 cm',
     width: '51 cm',
     depth: '36 cm'
    },
    photos: ['/images/SAC111_01.png', '/images/SAC111_02.png']
   }
  },
  {
   id: 'SAC117',
   name: 'Cylinder Toronto Marble Top Side Table',
   price: 4999,
   description: 'Small in footprint, high in material quality - the Cylinder Toronto Marble Top Side Table is a compact living room accent that brings genuine natural stone character to any corner. A smooth Toronto marble top with natural veining sits on a slim cylindrical acacia wood base, creating a refined, contemporary accent piece that works beside an armchair, sofa, or bed. An affordable way to bring genuine marble quality into the home.',
   image: '/images/SAC117_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Toronto Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Toronto marble top', 'Slim cylindrical acacia wood base', 'Compact proportions', 'Material contrast'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '51 cm',
     width: '38 cm',
     depth: '38 cm'
    },
    photos: ['/images/SAC117_01.png', '/images/SAC117_02.png']
   }
  },
  {
   id: 'SAC118',
   name: 'Tall Slim Cylinder Side Table',
   price: 3999,
   description: 'Stripped back and quietly confident - the Tall Slim Cylinder Side Table is a minimal living room accent in solid acacia wood that delivers a practical top surface in the smallest possible footprint. The clean cylindrical body and flat round top create a form that is entirely without unnecessary detail, relying entirely on the natural warmth and grain of the acacia wood for its character. Tall enough to sit comfortably beside an armchair, slim enough to fit anywhere.',
   image: '/images/SAC118_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Tall slim cylindrical form', 'Flat round top', 'Affordable accent piece'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '61 cm',
     width: '35 cm',
     depth: '35 cm'
    },
    photos: ['/images/SAC118_01.png', '/images/SAC118_02.png']
   }
  },
  {
   id: 'SAC119',
   name: 'Round Toronto Marble Top Side Table',
   price: 4999,
   description: 'Clean in form and refined in material - the Round Toronto Marble Top Side Table is a compact living room accent that pairs solid acacia wood with a genuine Toronto marble surface in a neat round form. The naturally veined marble top sits on a slim, structured acacia wood base, creating a piece that brings real material quality to any space without demanding too much room. A versatile accent that suits both contemporary and classic interiors.',
   image: '/images/SAC119_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Toronto Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Toronto marble top', 'Solid acacia wood base', 'Round form', 'Material contrast'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '51 cm',
     width: '41 cm',
     depth: '41 cm'
    },
    photos: ['/images/SAC119_01.png', '/images/SAC119_02.png']
   }
  },
  {
   id: 'SAC120',
   name: 'Compact Square Side Table',
   price: 3999,
   description: 'Simple, solid, and genuinely well-crafted - the Compact Square Side Table is a versatile living room accent in solid acacia wood that does exactly what a good side table should. The clean square top sits on a minimal structured base, creating a no-fuss surface for everyday use beside any sofa or armchair. The natural acacia grain adds warmth and character to an otherwise restrained form.',
   image: '/images/SAC120_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Clean square top', 'Minimal base structure', 'Compact proportions'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '50 cm',
     width: '41 cm',
     depth: '41 cm'
    },
    photos: ['/images/SAC120_01.png', '/images/SAC120_02.png']
   }
  },
  {
   id: 'SAC121',
   name: 'Low Square Side Table',
   price: 3999,
   description: 'Low, neat, and quietly useful - the Low Square Side Table is a compact living room accent in solid acacia wood that brings warmth and practicality to any seating area. The clean square top sits on a minimal base at a comfortable lower height, making it ideal beside low-profile sofas or floor-level seating arrangements. The natural acacia grain adds warmth and character to a form that is deliberately restrained.',
   image: '/images/SAC121_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Clean square top', 'Low profile', 'Minimal base structure'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '46 cm',
     width: '41 cm',
     depth: '41 cm'
    },
    photos: ['/images/SAC121_01.png', '/images/SAC121_02.png']
   }
  },
  {
   id: 'SAC122',
   name: 'Tall Round Pedestal Side Table',
   price: 3999,
   description: 'Slender, tall, and warmly crafted - the Tall Round Pedestal Side Table is a slim living room accent in solid acacia wood that brings a practical surface to any armchair or sofa at exactly the right height. The small round top sits on a slim pedestal body, creating a clean, vertical form that takes up almost no floor space while providing a useful and well-proportioned surface. The natural acacia grain adds warmth and character throughout.',
   image: '/images/SAC122_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Small round top', 'Tall slim pedestal', 'Affordable accent'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '56 cm',
     width: '38 cm',
     depth: '38 cm'
    },
    photos: ['/images/SAC122_01.png', '/images/SAC122_02.png']
   }
  },
  {
   id: 'SAC124',
   name: 'Long Low Bench Coffee Table',
   price: 9999,
   description: 'Long, low, and effortlessly cool - the Long Low Bench Coffee Table is a living room centrepiece in solid mango wood that brings a relaxed, gallery-like quality to any space. The extremely long, narrow top sits on a minimal low base, creating a bench-like silhouette that suits open-plan living rooms with low-profile seating. The natural mango wood grain flows across the entire length of the top surface, making this an expansive canvas of natural character.',
   image: '/images/SAC124_01.png',
   category: 'Coffee Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Extra-long narrow top', 'Low profile', 'Minimal base structure'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '34 cm',
     width: '119 cm',
     depth: '20 cm'
    },
    photos: ['/images/SAC124_01.png', '/images/SAC124_02.png']
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
  },
  {
   id: 'SAC099',
   name: 'Rustic Drawer Bedside Table',
   price: 7999,
   description: 'Raw character and practical storage come together in the Rustic Drawer Bedside Table, a bedroom accent in solid acacia wood. The piece features a sturdy square top above a drawer unit with visible timber joinery and natural grain, all supported by a simple leg structure. The rustic, unrefined finish celebrates the natural character of the acacia wood - every knot, grain variation, and natural mark is left visible and celebrated.',
   image: '/images/SAC099_01.png',
   category: 'Bedside Table',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Rustic Natural Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Drawer storage', 'Rustic finish', 'Sturdy construction'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '56 cm',
     width: '51 cm',
     depth: '36 cm'
    },
    photos: ['/images/SAC099_01.png', '/images/SAC099_02.png']
   }
  },
  {
   id: 'SAC100',
   name: 'Open Shelf Single Drawer Bedside Table',
   price: 6999,
   description: 'Practical, warm, and built for everyday bedroom life - the Open Shelf Single Drawer Bedside Table is a compact nightstand in solid acacia wood that offers both display and drawer storage in a neat, considered form. A flat top surface sits above an open display shelf and a single lower drawer, providing three distinct levels of storage and display within a slim bedroom footprint. The natural acacia grain adds warmth and character throughout.',
   image: '/images/SAC100_01.png',
   category: 'Bedside Table',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Flat top with open shelf and single drawer', 'Three levels of storage', 'Compact proportions'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '50 cm',
     width: '44 cm',
     depth: '38 cm'
    },
    photos: ['/images/SAC100_01.png', '/images/SAC100_02.png']
   }
  },
  {
   id: 'SAC104',
   name: 'Tall Rustic Multi-Drawer Bedside Table',
   price: 8999,
   description: 'Generous in storage and rich in character - the Tall Rustic Multi-Drawer Bedside Table is a bedroom piece in solid acacia wood that brings both practicality and raw artisan warmth to the bedside. Taller than a conventional nightstand, the piece features multiple drawers with visible timber joinery and natural grain, creating a rustic storage unit that doubles as a genuine design statement. Every knot, grain variation, and natural character mark is left visible and celebrated.',
   image: '/images/SAC104_01.png',
   category: 'Bedside Table',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Rustic Natural Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Multiple drawers', 'Tall proportions', 'Rustic finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '76 cm',
     width: '56 cm',
     depth: '37 cm'
    },
    photos: ['/images/SAC104_01.png', '/images/SAC104_02.png']
   }
  },
  {
   id: 'SAC105',
   name: 'Toronto Marble Top Open Shelf Bedside Table',
   price: 7999,
   description: 'Refined material and practical form meet in the Toronto Marble Top Open Shelf Bedside Table, a bedroom accent that combines solid acacia wood with a genuine Toronto marble surface. The cool, naturally veined marble top sits above an open display shelf, providing a practical and beautiful bedside setup that keeps everyday essentials within easy reach. The warm acacia wood base grounds the cooler stone surface for a material pairing that feels both considered and premium.',
   image: '/images/SAC105_01.png',
   category: 'Bedside Table',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Toronto Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Toronto marble top', 'Solid acacia wood base with open shelf', 'Material contrast', 'Open shelf storage'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '51 cm',
     width: '46 cm',
     depth: '38 cm'
    },
    photos: ['/images/SAC105_01.png', '/images/SAC105_02.png']
   }
  },
  {
   id: 'SAC106',
   name: 'Toronto Marble Top Dark Bedside Table',
   price: 7999,
   description: 'Dark, refined, and built with genuine material quality - the Toronto Marble Top Dark Bedside Table pairs solid acacia wood in a deep finish with a genuine Toronto marble surface for a bedside piece that feels unmistakably premium. The cool, naturally veined marble top sits above a slim, dark wood body with storage, creating a piece that is as functional as it is beautiful. A material pairing that suits moody, design-forward bedroom palettes.',
   image: '/images/SAC106_01.png',
   category: 'Bedside Table',
   room: 'bedroom',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Toronto Marble',
    finish: 'Dark Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Toronto marble top', 'Solid acacia wood body', 'Drawer storage', 'Dark finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '51 cm',
     width: '50 cm',
     depth: '38 cm'
    },
    photos: ['/images/SAC106_01.png', '/images/SAC106_02.png']
   }
  },
  {
   id: 'SAC079',
   name: 'Travertine Top Pedestal Side Table',
   price: 7999,
   description: 'Compact, refined, and effortlessly elegant - the Travertine Top Pedestal Side Table is a versatile accent piece that brings a touch of natural luxury to any room. A smooth travertine marble top sits on a solid mango wood pedestal base, combining two of nature\'s finest materials in a clean, considered form. Small enough to tuck beside a sofa or bed, striking enough to hold its own in any space it occupies.',
   image: '/images/SAC079_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood, Travertine Marble',
    finish: 'Natural Wood Base, Polished Travertine Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Travertine marble top', 'Square pedestal base in solid mango wood', 'Material contrast', 'Compact footprint'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '44 cm',
     width: '42 cm',
     depth: '42 cm'
    },
    photos: ['/images/SAC079_01.png', '/images/SAC079_02.png']
   }
  },
  {
   id: 'SAC093',
   name: 'Ribbed Cylinder Side Table',
   price: 4999,
   description: 'Small, tactile, and quietly sculptural - the Ribbed Cylinder Side Table is a compact accent piece in solid mango wood that works wherever you need a surface. The cylindrical body features a ribbed or textured exterior that adds depth and a handcrafted feel, topped with a clean flat round surface. Compact enough for any corner, characterful enough to be noticed.',
   image: '/images/SAC093_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Mango Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Mango Wood', 'Ribbed cylindrical body', 'Flat round top', 'Compact proportions'],
    sustainability: 'Sustainably sourced mango wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '42 cm',
     width: '40 cm',
     depth: '40 cm'
    },
    photos: ['/images/SAC093_01.png', '/images/SAC093_02.png']
   }
  },
  {
   id: 'SAC095',
   name: 'Cube Shelf Side Table',
   price: 6999,
   description: 'Versatile, minimal, and built to last - the Cube Shelf Side Table is a compact accent piece in solid acacia wood that works as well beside a bed as it does next to a sofa. The clean square form features a flat top surface and an open lower shelf, providing two levels of display and storage within a footprint that fits anywhere. The natural acacia grain adds warmth and character to what is otherwise a beautifully restrained design.',
   image: '/images/SAC095_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Cube silhouette', 'Flat top with open lower shelf', 'Compact proportions'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '51 cm',
     width: '51 cm',
     depth: '51 cm'
    },
    photos: ['/images/SAC095_01.png', '/images/SAC095_02.png']
   }
  },
  {
   id: 'SAC102',
   name: 'Turned Leg Accent Side Table',
   price: 6999,
   description: 'Classic craftsmanship in a compact form - the Turned Leg Accent Side Table is a versatile bedside or living room accent in solid acacia wood. The clean square top sits on a set of hand-turned legs with a warm, traditional character, connected by a sturdy stretcher base that adds stability and visual interest. The natural acacia grain and warm finish make this a piece that works in both classic and contemporary interiors.',
   image: '/images/SAC102_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Clean square top', 'Hand-turned legs', 'Stretcher base'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '46 cm',
     width: '46 cm',
     depth: '44 cm'
    },
    photos: ['/images/SAC102_01.png', '/images/SAC102_02.png']
   }
  },
  {
   id: 'SAC107',
   name: 'Toronto Marble Top Side Table',
   price: 6999,
   description: 'A versatile accent piece with a genuinely luxurious material finish - the Toronto Marble Top Side Table pairs solid acacia wood with a clean Toronto marble surface for a compact side table that works in both living rooms and bedrooms. The naturally veined marble top sits on a solid acacia wood base, with the warm timber structure providing a natural counterpoint to the cool stone surface above.',
   image: '/images/SAC107_01.png',
   category: 'Side Table',
   room: 'living',
   inStock: true,
   details: {
    materials: 'Acacia Wood, Toronto Marble',
    finish: 'Natural Wood Base, Polished Marble Top',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Toronto marble top', 'Solid acacia wood base', 'Versatile proportions', 'Material contrast'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe wood with a dry cloth, clean marble with a damp cloth, avoid acidic substances on marble surface',
    dimensions: {
     height: '51 cm',
     width: '45 cm',
     depth: '49 cm'
    },
    photos: ['/images/SAC107_01.png', '/images/SAC107_02.png']
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
 dining: [
  {
   id: 'SAC073',
   name: 'Circular Cut Four-Bottle Wine Rack',
   price: 1999,
   description: 'Functional craft at its finest - the Circular Cut Four-Bottle Wine Rack is a tabletop wine holder that earns its place in any room it occupies. Crafted from solid acacia wood in a rich dark walnut finish, the rack is built around two large circular side panels with four circular cutouts each, connected by a pair of sturdy round dowel rods that hold the structure together and cradle the bottles securely in place. The dramatic circular side panels give the piece a bold, graphic quality, while the deep grain and natural character marks of the acacia wood add warmth and authenticity to every surface.',
   image: '/images/SAC073_01.png',
   category: 'Wine Rack',
   room: 'bar',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Holds 4 bottles securely', 'Round dowel rod connectors', 'Bold circular side panels', 'Dark walnut finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '29 cm',
     width: '33 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC073_01.png', '/images/SAC073_02.png']
   }
  },
  {
   id: 'SAC074',
   name: 'Hexagon Five-Bottle Wine Rack',
   price: 2499,
   description: 'Geometry meets craftsmanship in the most satisfying way - the Hexagon Five-Bottle Wine Rack is a tabletop wine rack that is as much a design object as it is a practical storage solution. Crafted from solid acacia wood in a warm honey walnut finish, the rack is built within a bold hexagonal frame with thick, cleanly mitered panels that give it a substantial, high-quality feel. Inside, two scalloped cradle rails with hand-cut bottle slots are positioned at staggered heights across three tiers, holding up to five bottles securely in a classic horizontal lay-flat arrangement.',
   image: '/images/SAC074_01.png',
   category: 'Wine Rack',
   room: 'bar',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Bold hexagonal frame', 'Holds 5 bottles across three tiers', 'Lay-flat horizontal storage', 'Honey walnut finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '29 cm',
     width: '33 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC074_01.png', '/images/SAC074_02.png']
   }
  },
  {
   id: 'SAC114',
   name: 'Open Back Dining Chair - Set of 2',
   price: 9999,
   description: 'Timeless craft for the dining room - the Open Back Dining Chair is a set of two solid acacia wood chairs that bring warmth, character, and traditional woodworking detail to any dining space. The open back design with its turned or slatted uprights keeps the form light and airy, while the solid acacia wood construction ensures each chair is built for everyday use. Sold as a set of two, they bring an instant sense of considered pairing to any dining table setup.',
   image: '/images/SAC114_01.png',
   category: 'Chair',
   room: 'dining',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Open back design', 'Traditional joinery', 'Sold as set of 2'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '83 cm',
     width: '48 cm',
     depth: '48 cm'
    },
    photos: ['/images/SAC114_01.png', '/images/SAC114_02.png']
   }
  },
  {
   id: 'SAC115',
   name: 'Classic Dining Chair - Set of 2',
   price: 9999,
   description: 'Solid, dependable, and built with genuine craft - the Classic Dining Chair is a set of two solid acacia wood chairs designed for dining rooms that value quality and character in equal measure. The clean, classic form with a structured back and solid seat provides comfortable, everyday dining seating with an artisan warmth that factory-made chairs simply cannot replicate. Sold as a set of two, they bring immediate cohesion to any dining table setup.',
   image: '/images/SAC115_01.png',
   category: 'Chair',
   room: 'dining',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Classic structured form', 'Solid construction', 'Sold as set of 2'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '80 cm',
     width: '47 cm',
     depth: '48 cm'
    },
    photos: ['/images/SAC115_01.png', '/images/SAC115_02.png']
   }
  },
  {
   id: 'SAC116',
   name: 'Upholstered Seat Dining Chair',
   price: 7999,
   description: 'Where comfort meets craft - the Upholstered Seat Dining Chair is a versatile seating piece that works as well at a home office desk as it does at a dining table. The structured back and upholstered seat provide a level of comfort that pure wood chairs cannot match, while the overall form retains a clean, contemporary character that suits a wide range of interior styles. A practical, stylish chair built for long sessions at the table or desk.',
   image: '/images/SAC116_01.png',
   category: 'Chair',
   room: 'dining',
   inStock: true,
   details: {
    materials: 'Wood Frame, Upholstered Seat',
    finish: 'Natural Frame, Fabric Seat',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['Upholstered seat', 'Structured back', 'Clean contemporary design', 'Dual purpose'],
    sustainability: 'Sustainably sourced wood frame',
    care: 'Wipe frame with a dry cloth, spot clean upholstery as needed',
    dimensions: {
     height: '88 cm',
     width: '58 cm',
     depth: '55 cm'
    },
    photos: ['/images/SAC116_01.png', '/images/SAC116_02.png']
   }
  }
 ],
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
  },
  {
   id: 'SAC112',
   name: 'Tall Multi-Shelf Cabinet Bookshelf',
   price: 9999,
   description: 'Tall, structured, and built for serious storage - the Tall Multi-Shelf Cabinet Bookshelf is a solid acacia wood storage piece designed for home libraries, offices, and living rooms that demand both capacity and character. Multiple open shelves provide generous display and storage space across the full height of the piece, while the solid acacia wood construction ensures it will stand up to years of daily use. The warm, natural finish brings a sense of craft and warmth to even the most utilitarian storage setup.',
   image: '/images/SAC112_01.png',
   category: 'Open Cabinet',
   room: 'library',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Multiple open shelves', 'Tall proportions', 'Natural warm finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '102 cm',
     width: '60 cm',
     depth: '30 cm'
    },
    photos: ['/images/SAC112_01.png', '/images/SAC112_02.png']
   }
  },
  {
   id: 'SAC113',
   name: 'Compact Open Cabinet Bookshelf',
   price: 7999,
   description: 'Compact, warm, and genuinely useful - the Compact Open Cabinet Bookshelf is a smaller-format storage piece in solid acacia wood that brings order and character to any home library, office, or living room corner. Multiple open shelves provide practical display and storage space within a footprint that fits almost anywhere, while the warm natural finish of the acacia wood adds craft and warmth to the overall form.',
   image: '/images/SAC113_01.png',
   category: 'Bookshelf',
   room: 'library',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Multiple open shelves', 'Compact format', 'Versatile placement'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '88 cm',
     width: '41 cm',
     depth: '36 cm'
    },
    photos: ['/images/SAC113_01.png', '/images/SAC113_02.png']
   }
  },
  {
   id: 'SAC123',
   name: 'Wide Open Bookshelf',
   price: 6999,
   description: 'Wide, open, and built for generous display - the Wide Open Bookshelf is a solid acacia wood storage piece that brings both practical capacity and warm craft character to any library, home office, or living room. Multiple open shelves span a generous width, providing ample display and storage space for books, plants, ceramics, and curated objects. The natural acacia grain flows across every shelf and panel, adding warmth and authenticity to a form that is as functional as it is handsome.',
   image: '/images/SAC123_01.png',
   category: 'Bookshelf',
   room: 'library',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Warm Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Wide open shelves', 'Multiple shelf levels', 'Open design'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '91 cm',
     width: '114 cm',
     depth: '36 cm'
    },
    photos: ['/images/SAC123_01.png', '/images/SAC123_02.png']
   }
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
 bar: [
  {
   id: 'SAC073',
   name: 'Circular Cut Four-Bottle Wine Rack',
   price: 1999,
   description: 'Functional craft at its finest - the Circular Cut Four-Bottle Wine Rack is a tabletop wine holder that earns its place in any room it occupies. Crafted from solid acacia wood in a rich dark walnut finish, the rack is built around two large circular side panels with four circular cutouts each, connected by a pair of sturdy round dowel rods that hold the structure together and cradle the bottles securely in place. The dramatic circular side panels give the piece a bold, graphic quality, while the deep grain and natural character marks of the acacia wood add warmth and authenticity to every surface.',
   image: '/images/SAC073_01.png',
   category: 'Wine Rack',
   room: 'bar',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Dark Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Holds 4 bottles securely', 'Round dowel rod connectors', 'Bold circular side panels', 'Dark walnut finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '29 cm',
     width: '33 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC073_01.png', '/images/SAC073_02.png']
   }
  },
  {
   id: 'SAC074',
   name: 'Hexagon Five-Bottle Wine Rack',
   price: 2499,
   description: 'Geometry meets craftsmanship in the most satisfying way - the Hexagon Five-Bottle Wine Rack is a tabletop wine rack that is as much a design object as it is a practical storage solution. Crafted from solid acacia wood in a warm honey walnut finish, the rack is built within a bold hexagonal frame with thick, cleanly mitered panels that give it a substantial, high-quality feel. Inside, two scalloped cradle rails with hand-cut bottle slots are positioned at staggered heights across three tiers, holding up to five bottles securely in a classic horizontal lay-flat arrangement.',
   image: '/images/SAC074_01.png',
   category: 'Wine Rack',
   room: 'bar',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Honey Walnut Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Bold hexagonal frame', 'Holds 5 bottles across three tiers', 'Lay-flat horizontal storage', 'Honey walnut finish'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '29 cm',
     width: '33 cm',
     depth: '17 cm'
    },
    photos: ['/images/SAC074_01.png', '/images/SAC074_02.png']
   }
  }
 ],
 entryway: [
  {
   id: 'SAC098',
   name: 'Slim Leg Console Table',
   price: 9999,
   description: 'Understated, functional, and built with genuine craft - the Slim Leg Console Table is an entryway piece in solid acacia wood that sets the tone for every room beyond it. Long, narrow, and tall, the clean rectangular top sits on a set of slim, clean legs that keep the form airy and unobtrusive. The natural acacia grain adds warmth and authenticity to an otherwise minimal silhouette. Practical enough for an entryway, elegant enough for a living room or dining room wall.',
   image: '/images/SAC098_01.png',
   category: 'Console Table',
   room: 'entryway',
   inStock: true,
   details: {
    materials: 'Acacia Wood',
    finish: 'Natural Honey Polish',
    origin: 'Made in Jodhpur, Rajasthan',
    shipping: 'Ships within 2-3 business days',
    delivery: '5-7 days pan India',
    returns: '7-day easy returns',
    usp: ['100% Solid Acacia Wood', 'Long narrow top', 'Slim leg structure', 'Versatile placement'],
    sustainability: 'Sustainably sourced acacia wood',
    care: 'Wipe with a dry or slightly damp cloth, avoid prolonged moisture exposure, keep away from direct sunlight',
    dimensions: {
     height: '77 cm',
     width: '121 cm',
     depth: '39 cm'
    },
    photos: ['/images/SAC098_01.png', '/images/SAC098_02.png']
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

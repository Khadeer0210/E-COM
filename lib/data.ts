export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'men' | 'women' | 'accessories';
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  sizes: string[];
  colors: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  reviews: Review[];
  inStock: boolean;
  featured?: boolean;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    slug: 'silk-evening-gown',
    category: 'women',
    price: 1299,
    originalPrice: 1699,
    description: 'Ethereal floor-length gown crafted from the finest mulberry silk. Features a sweeping train and delicate hand-sewn crystal embellishments along the neckline. Perfect for galas, red carpet events, and grand celebrations.',
    images: [
      'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?w=800',
      'https://images.unsplash.com/photo-1583847281739-20a6d80811e1?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Midnight', hex: '#1a1a2e' },
      { name: 'Champagne', hex: '#f1e3c3' },
    ],
    rating: 4.8,
    reviewCount: 124,
    reviews: [
      { id: 'r1', user: 'Sophia L.', rating: 5, comment: 'Absolutely stunning! The silk quality is extraordinary.', date: '2026-05-15' },
      { id: 'r2', user: 'Emma W.', rating: 5, comment: 'Received so many compliments. Worth every penny.', date: '2026-05-02' },
      { id: 'r3', user: 'Olivia M.', rating: 4, comment: 'Beautiful gown, runs slightly small. Size up.', date: '2026-04-20' },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Tailored Wool Blazer',
    slug: 'tailored-wool-blazer',
    category: 'men',
    price: 895,
    description: 'Impeccably tailored blazer in premium Italian wool. Double-breasted design with horn buttons and a subtle windowpane check. Fully canvassed construction for superior drape.',
    images: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#36454F' },
      { name: 'Navy', hex: '#000080' },
    ],
    rating: 4.9,
    reviewCount: 89,
    reviews: [
      { id: 'r4', user: 'James D.', rating: 5, comment: 'The fit is perfect. True Italian craftsmanship.', date: '2026-05-10' },
      { id: 'r5', user: 'William R.', rating: 5, comment: 'My new favorite blazer. Extraordinary quality.', date: '2026-04-28' },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Cashmere Wrap Coat',
    slug: 'cashmere-wrap-coat',
    category: 'women',
    price: 1850,
    originalPrice: 2200,
    description: 'Luxuriously soft cashmere wrap coat in a timeless silhouette. Features an oversized shawl collar and self-tie belt. The ultimate statement piece for the colder months.',
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800',
      'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    rating: 4.7,
    reviewCount: 67,
    reviews: [
      { id: 'r6', user: 'Charlotte B.', rating: 5, comment: 'The most beautiful coat I have ever owned.', date: '2026-04-15' },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '4',
    name: 'Leather Chronograph Watch',
    slug: 'leather-chronograph-watch',
    category: 'accessories',
    price: 750,
    description: 'Swiss-made automatic chronograph with a sapphire crystal face and Italian calfskin strap. Water-resistant to 100m. A timeless accessory for the discerning gentleman.',
    images: [
      'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Brown', hex: '#8B4513' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    rating: 4.9,
    reviewCount: 156,
    reviews: [
      { id: 'r7', user: 'Alexander K.', rating: 5, comment: 'Exceptional timepiece. Keeps perfect time.', date: '2026-05-20' },
      { id: 'r8', user: 'Marcus T.', rating: 5, comment: 'The leather strap is incredibly supple.', date: '2026-05-05' },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Linen Summer Dress',
    slug: 'linen-summer-dress',
    category: 'women',
    price: 485,
    description: 'Effortlessly chic A-line dress in premium Belgian linen. Features a flattering V-neckline, flutter sleeves, and side pockets. The perfect day-to-evening transition piece.',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Terracotta', hex: '#E2725B' },
      { name: 'Sage', hex: '#9CAF88' },
      { name: 'White', hex: '#FFFFFF' },
    ],
    rating: 4.6,
    reviewCount: 93,
    reviews: [
      { id: 'r9', user: 'Isabella F.', rating: 5, comment: 'So comfortable and elegant. Love the pockets!', date: '2026-04-30' },
    ],
    inStock: true,
  },
  {
    id: '6',
    name: 'Italian Leather Loafers',
    slug: 'italian-leather-loafers',
    category: 'men',
    price: 625,
    description: 'Handcrafted penny loafers in burnished Italian leather. Blake-stitched construction with leather soles. Break in beautifully and develop a unique patina over time.',
    images: [
      'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800',
      'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=800',
    ],
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'Cognac', hex: '#9A463D' },
      { name: 'Dark Brown', hex: '#3E2723' },
    ],
    rating: 4.8,
    reviewCount: 72,
    reviews: [
      { id: 'r10', user: 'David P.', rating: 5, comment: 'The craftsmanship is impeccable.', date: '2026-05-12' },
    ],
    inStock: true,
  },
  {
    id: '7',
    name: 'Pearl Drop Earrings',
    slug: 'pearl-drop-earrings',
    category: 'accessories',
    price: 340,
    originalPrice: 420,
    description: 'Elegant freshwater pearl drop earrings set in 18k gold vermeil. Each pearl is individually selected for its exceptional lustre and perfectly uniform shape.',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800',
      'https://images.unsplash.com/photo-1515562141589-67f0d569b834?w=800',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Gold', hex: '#FFD700' },
      { name: 'Rose Gold', hex: '#B76E79' },
    ],
    rating: 4.7,
    reviewCount: 108,
    reviews: [
      { id: 'r11', user: 'Victoria S.', rating: 5, comment: 'Timeless elegance. These are my go-to earrings.', date: '2026-05-08' },
    ],
    inStock: true,
  },
  {
    id: '8',
    name: 'Merino Wool Turtleneck',
    slug: 'merino-wool-turtleneck',
    category: 'men',
    price: 295,
    description: 'Ultra-fine merino wool turtleneck knitted in a ribbed pattern. Lightweight yet warm, with natural stretch for a flattering slim fit. Machine washable.',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Cream', hex: '#FFFDD0' },
      { name: 'Forest', hex: '#228B22' },
      { name: 'Burgundy', hex: '#722F37' },
    ],
    rating: 4.5,
    reviewCount: 45,
    reviews: [
      { id: 'r12', user: 'Thomas H.', rating: 4, comment: 'Great quality. Slightly pricey but worth it.', date: '2026-04-25' },
    ],
    inStock: true,
  },
  {
    id: '9',
    name: 'Silk Scarf Collection',
    slug: 'silk-scarf-collection',
    category: 'accessories',
    price: 195,
    description: 'Hand-rolled silk twill scarf with exclusive botanical print. Made in Como, Italy with traditional artisan techniques. Each piece is a small work of art.',
    images: [
      'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Floral', hex: '#FF69B4' },
      { name: 'Geometric', hex: '#4169E1' },
    ],
    rating: 4.8,
    reviewCount: 88,
    reviews: [
      { id: 'r13', user: 'Amelia C.', rating: 5, comment: 'The print is even more beautiful in person!', date: '2026-05-18' },
    ],
    inStock: true,
  },
  {
    id: '10',
    name: 'Pleated Midi Skirt',
    slug: 'pleated-midi-skirt',
    category: 'women',
    price: 425,
    description: 'Flowing accordion-pleated midi skirt in lustrous satin. Features an elasticated waist for comfort and a stunning light-catching finish. Pairs beautifully with both casual and formal tops.',
    images: [
      'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
      'https://images.unsplash.com/photo-1551163943-3f7fb0b59b43?w=800',
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Emerald', hex: '#50C878' },
      { name: 'Blush', hex: '#DE5D83' },
      { name: 'Gold', hex: '#FFD700' },
    ],
    rating: 4.6,
    reviewCount: 57,
    reviews: [
      { id: 'r14', user: 'Grace N.', rating: 5, comment: 'The pleating is exquisite. Feels so luxurious.', date: '2026-04-22' },
    ],
    inStock: true,
  },
  {
    id: '11',
    name: 'Slim Fit Dress Shirt',
    slug: 'slim-fit-dress-shirt',
    category: 'men',
    price: 245,
    description: 'Premium Egyptian cotton dress shirt with mother-of-pearl buttons. French cuffs and a spread collar for a modern, refined look. Wrinkle-resistant for effortless elegance.',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=800',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Lilac', hex: '#C8A2C8' },
    ],
    rating: 4.7,
    reviewCount: 134,
    reviews: [
      { id: 'r15', user: 'Benjamin L.', rating: 5, comment: 'Best dress shirt I\'ve ever owned. Period.', date: '2026-05-01' },
    ],
    inStock: true,
  },
  {
    id: '12',
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    category: 'accessories',
    price: 520,
    originalPrice: 650,
    description: 'Oversized cat-eye sunglasses with polarized lenses and acetate frames. UV400 protection with anti-reflective coating. Comes in a handcrafted leather case.',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
    ],
    sizes: ['One Size'],
    colors: [
      { name: 'Tortoise', hex: '#8B4513' },
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Crystal', hex: '#E0E0E0' },
    ],
    rating: 4.8,
    reviewCount: 76,
    reviews: [
      { id: 'r16', user: 'Scarlett J.', rating: 5, comment: 'So chic! The quality is outstanding.', date: '2026-05-16' },
    ],
    inStock: true,
    featured: true,
  },
];

export const categories = [
  { name: 'Women', slug: 'women', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600' },
  { name: 'Men', slug: 'men', image: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600' },
  { name: 'Accessories', slug: 'accessories', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600' },
];

export const testimonials = [
  { id: 1, name: 'Isabella R.', text: 'The quality is unmatched. Every piece feels like it was made just for me. It\'s an experience every time.', rating: 5 },
  { id: 2, name: 'Alexander M.', text: 'LUXE has redefined what I expect from luxury fashion. Impeccable craftsmanship and attention to detail.', rating: 5 },
  { id: 3, name: 'Sophia C.', text: 'From the packaging to the product, everything screams excellence. I\'m a customer for life.', rating: 5 },
  { id: 4, name: 'James W.', text: 'The tailoring is extraordinary. These are clothes that truly make you feel confident.', rating: 5 },
];

export const brandNames = ['GUCCI', 'PRADA', 'VERSACE', 'DIOR', 'CHANEL', 'HERMÈS', 'BALENCIAGA', 'FENDI'];

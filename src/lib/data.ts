import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: 'Cars' | 'Anime' | 'Music';
};

const findImage = (id: string) => {
  const img = PlaceHolderImages.find((p) => p.id === id);
  if (!img) {
    throw new Error(`Image with id ${id} not found in placeholder data.`);
  }
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic JDM Car T-Shirt',
    description: 'A tribute to the golden age of Japanese Domestic Market cars. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 24.99,
    ...findImage('car-shirt-1'),
    category: 'Cars',
  },
  {
    id: '2',
    name: 'Supercar Silhouette T-Shirt',
    description: 'Features a sleek and minimalist silhouette of a modern supercar. Perfect for fans of high-performance engineering.',
    price: 26.99,
    ...findImage('car-shirt-2'),
    category: 'Cars',
  },
  {
    id: '3',
    name: 'Vintage Muscle Car T-Shirt',
    description: 'Show your love for classic American muscle with this vintage-style tee. Features a distressed print for a retro look.',
    price: 25.99,
    ...findImage('car-shirt-3'),
    category: 'Cars',
  },
  {
    id: '4',
    name: 'Shonen Hero T-Shirt',
    description: 'Unleash your inner hero with this dynamic tee inspired by classic shonen anime. Vibrant colors and an action-packed design.',
    price: 24.99,
    ...findImage('anime-shirt-1'),
    category: 'Anime',
  },
  {
    id: '5',
    name: 'Kawaii Ramen Cat T-Shirt',
    description: 'An adorable and quirky design featuring a cat enjoying a bowl of ramen. A must-have for lovers of kawaii culture and good food.',
    price: 22.99,
    ...findImage('anime-shirt-2'),
    category: 'Anime',
  },
  {
    id: '6',
    name: 'Mecha Pilot Academy T-Shirt',
    description: 'Join the ranks of elite pilots with this tee from the "Mecha Pilot Academy". Features a cool, futuristic emblem.',
    price: 25.99,
    ...findImage('anime-shirt-3'),
    category: 'Anime',
  },
  {
    id: '7',
    name: 'Retro Vinyl Record T-Shirt',
    description: 'For the audiophiles and music lovers, this tee features a classic vinyl record design. Spin your style.',
    price: 23.99,
    ...findImage('music-shirt-1'),
    category: 'Music',
  },
  {
    id: '8',
    name: 'Rock On Hand Sign T-Shirt',
    description: 'The universal symbol of rock and roll. A simple yet powerful statement for any music fan. Made from soft, breathable cotton.',
    price: 21.99,
    ...findImage('music-shirt-2'),
    category: 'Music',
  },
    {
    id: '9',
    name: '80s Cassette Mixtape T-Shirt',
    description: 'A nostalgic throwback to the era of mixtapes. This colorful design is perfect for those who appreciate the classics.',
    price: 23.99,
    ...findImage('music-shirt-3'),
    category: 'Music',
  },
];

export const categories = [
  { name: 'Cars', href: '/products?category=Cars' },
  { name: 'Anime', href: '/products?category=Anime' },
  { name: 'Music', href: '/products?category=Music' },
];

export type Order = {
    id: string;
    date: string;
    status: 'Pending' | 'Shipped' | 'Delivered';
    total: number;
    items: {
        product: Product;
        quantity: number;
    }[];
};

export const orders: Order[] = [
    {
        id: 'ORD-001',
        date: '2023-10-26',
        status: 'Delivered',
        total: 51.98,
        items: [
            { product: products[0], quantity: 1 },
            { product: products[3], quantity: 1 },
        ],
    },
    {
        id: 'ORD-002',
        date: '2023-11-15',
        status: 'Shipped',
        total: 45.98,
        items: [
            { product: products[4], quantity: 1 },
            { product: products[7], quantity: 1 },
        ],
    },
        {
        id: 'ORD-003',
        date: '2023-12-01',
        status: 'Pending',
        total: 77.97,
        items: [
            { product: products[2], quantity: 1 },
            { product: products[5], quantity: 1 },
            { product: products[8], quantity: 1 },
        ],
    },
];

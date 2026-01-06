import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  imageHint: string;
  category: 'Cars' | 'Anime' | 'Music';
  color?: 'BLACK' | 'WHITE';
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
    id: 'porsche-black-1',
    name: 'Porshe oversized t-shirt BLACK',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-black'),
    category: 'Cars',
    color: 'BLACK'
  },
  {
    id: 'porsche-white-1',
    name: 'Porshe oversized t-shirt WHITE',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-white'),
    category: 'Cars',
    color: 'WHITE'
  },
  {
    id: 'porsche-black-2',
    name: 'Porshe oversized t-shirt BLACK',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-black'),
    category: 'Cars',
    color: 'BLACK'
  },
  {
    id: 'porsche-white-2',
    name: 'Porshe oversized t-shirt WHITE',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-white'),
    category: 'Cars',
    color: 'WHITE'
  },
  {
    id: 'porsche-black-3',
    name: 'Porshe oversized t-shirt BLACK',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-black'),
    category: 'Cars',
    color: 'BLACK'
  },
  {
    id: 'porsche-white-3',
    name: 'Porshe oversized t-shirt WHITE',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-white'),
    category: 'Cars',
    color: 'WHITE'
  },
  {
    id: 'porsche-black-4',
    name: 'Porshe oversized t-shirt BLACK',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-black'),
    category: 'Cars',
    color: 'BLACK'
  },
  {
    id: 'porsche-white-4',
    name: 'Porshe oversized t-shirt WHITE',
    description: 'A tribute to the iconic Porsche 911 GT3 RS. Made from 100% premium cotton for a soft and comfortable fit.',
    price: 799,
    originalPrice: 1500,
    ...findImage('porsche-white'),
    category: 'Cars',
    color: 'WHITE'
  },
];

export const categories = [
  { name: 'ANIME', href: '/products?category=Anime' },
  { name: 'MUSIC', href: '/products?category=Music' },
  { name: 'CARS', href: '/products?category=Cars' },
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

export const orders: Order[] = [];

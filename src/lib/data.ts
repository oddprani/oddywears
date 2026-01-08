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
    // Fallback to a default image if not found to prevent crashes
    const defaultImg = PlaceHolderImages.find(p => p.id === 'porsche-black');
    if (defaultImg) return { imageUrl: defaultImg.imageUrl, imageHint: defaultImg.imageHint };
    // If even default is not there, hardcode a fallback
    return { imageUrl: 'https://picsum.photos/seed/1/600/800', imageHint: 'placeholder' };
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
    id: 'anime-goku-1',
    name: 'Goku Super Saiyan T-Shirt',
    description: 'Unleash your inner Saiyan with this electrifying Goku graphic tee. Feel the power of Super Saiyan Blue.',
    price: 899,
    originalPrice: 1600,
    ...findImage('anime-1'),
    category: 'Anime',
    color: 'BLACK'
  },
  {
    id: 'music-daftpunk-1',
    name: 'Daft Punk Retro Funk Tee',
    description: 'Get lost in the music with this retro-inspired Daft Punk t-shirt. A tribute to the legends of electronic music.',
    price: 850,
    originalPrice: 1550,
    ...findImage('music-1'),
    category: 'Music',
    color: 'BLACK'
  },
  {
    id: 'car-bmw-1',
    name: 'BMW M-Series Power Tee',
    description: 'Showcase your love for German engineering with this sleek BMW M-Series t-shirt. Ultimate driving machine apparel.',
    price: 799,
    originalPrice: 1500,
    ...findImage('car-1'),
    category: 'Cars',
    color: 'WHITE'
  },
  {
    id: 'anime-naruto-1',
    name: 'Naruto Sage Mode T-Shirt',
    description: 'Embrace the power of the Sage of Six Paths with this iconic Naruto graphic tee. Believe it!',
    price: 899,
    originalPrice: 1600,
    ...findImage('anime-2'),
    category: 'Anime',
    color: 'BLACK'
  },
  {
    id: 'music-rhcp-1',
    name: 'Red Hot Chili Peppers Tee',
    description: 'A classic tee for a classic band. Show your love for the funk-rock legends, Red Hot Chili Peppers.',
    price: 850,
    originalPrice: 1550,
    ...findImage('music-2'),
    category: 'Music',
    color: 'WHITE'
  },
  {
    id: 'car-lambo-1',
    name: 'Lamborghini Aventador Tee',
    description: 'Unleash the bull with this aggressive Lamborghini Aventador graphic t-shirt. Italian supercar style.',
    price: 999,
    originalPrice: 1800,
    ...findImage('car-2'),
    category: 'Cars',
    color: 'BLACK'
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

import { PlaceHolderImages } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrls: { url: string; hint: string }[];
  category: 'Cars' | 'Anime' | 'Music';
  color?: 'BLACK' | 'WHITE';
};

export const products: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `product-${i + 1}`,
  name: 'Product Name',
  description: 'This is a placeholder product description.',
  price: 999,
  originalPrice: 1500,
  imageUrls: [
    { url: '', hint: 'tshirt front' },
    { url: '', hint: 'tshirt back' },
    { url: '', hint: 'tshirt lifestyle' },
    { url: '', hint: 'tshirt detail' },
  ],
  category: i % 3 === 0 ? 'Cars' : i % 3 === 1 ? 'Anime' : 'Music',
}));

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

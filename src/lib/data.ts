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
    const defaultImg = PlaceHolderImages.find(p => p.id === 'placeholder');
    if (defaultImg) return { imageUrl: defaultImg.imageUrl, imageHint: defaultImg.imageHint };
    // If even default is not there, hardcode a fallback
    return { imageUrl: 'https://picsum.photos/seed/placeholder/600/800', imageHint: 'placeholder' };
  }
  return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};

export const products: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `product-${i + 1}`,
  name: 'Product Name',
  description: 'This is a placeholder product description.',
  price: 999,
  originalPrice: 1500,
  imageUrl: '',
  imageHint: '',
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

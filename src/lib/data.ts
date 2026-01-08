
export type ImageInfo = {
  url: string;
  hint: string;
};

export type Banner = {
  id: string;
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  price: string;
  image: ImageInfo;
};

export type Category = {
  name: 'ANIME' | 'MUSIC' | 'CARS';
  href: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrls: ImageInfo[];
  category: Category['name'];
  color?: 'BLACK' | 'WHITE';
};

export const banners: Banner[] = [
  {
    id: 'banner-1',
    titleLine1: 'Limited',
    titleLine2: 'Offer',
    subtitle: 'Buy 2 for',
    price: '₹999',
    image: {
      url: 'https://images.unsplash.com/photo-1700177421838-7030f56be9d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtb2RlbCUyMHRzaGlydHxlbnwwfHx8fDE3Njc4NTE5MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hint: 'model tshirt',
    },
  },
  {
    id: 'banner-2',
    titleLine1: 'New',
    titleLine2: 'Arrivals',
    subtitle: 'Fresh Anime Drops',
    price: 'From ₹799',
    image: {
      url: 'https://images.unsplash.com/photo-1615592389070-bcc97e05ad01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxhbmltZSUyMGNoYXJhY3RlcnxlbnwwfHx8fDE3Njc4MDkyNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hint: 'anime character',
    },
  },
  {
    id: 'banner-3',
    titleLine1: 'Rock On',
    titleLine2: 'Sale',
    subtitle: 'Band Tees',
    price: '30% Off',
    image: {
      url: 'https://images.unsplash.com/photo-1710052803043-9d9761f32ad6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxiYW5kJTIwbG9nb3xlbnwwfHx8fDE3Njc4NTE5MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      hint: 'band logo',
    },
  },
];

export const categories: Category[] = [
  { name: 'ANIME', href: '/products?category=Anime' },
  { name: 'MUSIC', href: '/products?category=Music' },
  { name: 'CARS', href: '/products?category=Cars' },
];

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

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroBanners = PlaceHolderImages.filter((img) => img.id.startsWith('hero'));
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="space-y-12">
      <section className="w-full">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroBanners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[300px] md:h-[500px] w-full">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.description}
                    fill
                    className="object-cover"
                    data-ai-hint={banner.imageHint}
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight">
                      {index === 0 ? 'New Arrivals are Here!' : 'Special Offer: 20% Off'}
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
                      {index === 0 ? 'Check out our latest collection of unique t-shirts.' : 'Get your favorite designs at an unbeatable price for a limited time.'}
                    </p>
                    <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                      <Link href="/products">Shop Now</Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:inline-flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:inline-flex" />
        </Carousel>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-headline font-bold">Featured Products</h2>
          <p className="mt-2 text-lg text-muted-foreground">Hand-picked just for you</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
                <Link href="/products">View All Products</Link>
            </Button>
        </div>
      </section>
    </div>
  );
}

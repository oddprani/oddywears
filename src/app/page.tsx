"use client";

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProductCard } from '@/components/product-card';
import { products, categories } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const heroBanners = PlaceHolderImages.filter((img) => img.id.startsWith('hero'));
  const featuredProducts = products.slice(0, 8);

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="space-y-20">
      <section className="w-full">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {heroBanners.map((banner, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[300px] md:h-[500px] w-full bg-primary text-primary-foreground">
                  <div className="container mx-auto h-full flex items-center">
                    <div className="w-1/2 flex flex-col justify-center">
                      <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">
                        Limited
                        <br />
                        Offer
                      </h1>
                      <p className="mt-4 text-xl">
                        Buy 2 for <span className="font-bold text-2xl">₹999</span>
                      </p>
                    </div>
                    <div className="w-1/2 h-full relative">
                       <Image
                        src={banner.imageUrl}
                        alt={banner.description}
                        fill
                        className="object-contain"
                        data-ai-hint={banner.imageHint}
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
           <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
            <CarouselPrevious className="static -translate-y-0 text-primary-foreground" />
            <div className="flex gap-2">
              {heroBanners.map((_, i) => (
                <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground/50 data-[active='true']:bg-primary-foreground" />
              ))}
            </div>
            <CarouselNext className="static -translate-y-0 text-primary-foreground" />
           </div>
        </Carousel>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-light italic">our collections</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-2 border-primary rounded-none hover:bg-primary hover:text-primary-foreground">
                <Link href="/products">View more</Link>
            </Button>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-light italic">Shop By FANDOM</h2>
        </div>
        <div className="flex justify-center items-center gap-8 md:gap-16">
          {categories.map((category) => (
            <Link key={category.name} href={category.href} className="flex flex-col items-center gap-4 group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border border-primary flex items-center justify-center group-hover:bg-primary transition-colors">
                <span className="text-lg font-semibold group-hover:text-primary-foreground">{category.name.toUpperCase()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

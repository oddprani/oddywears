"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/data';
import { Heart, Send } from 'lucide-react';
import React from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const product = products.find((p) => p.id === params.id);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  };

   const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    toast({
      title: "Added to wishlist!",
      description: `${product.name} has been added to your wishlist.`,
    });
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <Carousel
            opts={{
                loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            >
            <CarouselContent>
                {(product.imageUrls.length > 0 ? product.imageUrls : Array(4).fill({url: '', hint: 'placeholder'})).map((image, index) => (
                <CarouselItem key={index}>
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
                        {image.url ? (
                            <Image
                            src={image.url}
                            alt={`${product.name} image ${index + 1}`}
                            fill
                            className="object-cover"
                            data-ai-hint={image.hint}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-secondary"></div>
                        )}
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
        </Carousel>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-wide">{product.name}</h1>
            <p className="mt-2 text-2xl font-semibold">
              ₹{product.price.toFixed(2)}
              {product.originalPrice && (
                <span className="ml-4 text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-semibold uppercase">Description</h2>
            <p className="mt-2 text-muted-foreground">{product.description}</p>
          </div>
          
          <Separator />

          <div className="flex items-center gap-4">
            <Button size="lg" onClick={handleAddToCart} className="w-full">
              <Send className="mr-2 h-4 w-4 -rotate-45" /> Add to Cart
            </Button>
            <Button size="icon" variant="outline" onClick={handleLike}>
              <Heart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

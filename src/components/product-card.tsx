"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";
import { Heart, Send } from 'lucide-react';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="group relative">
      <div className="aspect-[3/4] w-full overflow-hidden bg-secondary">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={product.imageHint}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <Button size="icon" variant="ghost" className="absolute top-2 right-2 rounded-full h-8 w-8 bg-background/50 hover:bg-background/80">
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium uppercase pr-2">{product.name}</h3>
            <Button size="icon" variant="ghost" onClick={handleAddToCart} className="h-8 w-8 flex-shrink-0">
              <Send className="h-4 w-4 -rotate-45" />
            </Button>
        </div>
        <div className="flex items-center gap-2">
            <p className="text-base font-medium">
            ₹{product.price.toFixed(0)}
            </p>
            {product.originalPrice && (
                <p className="text-sm text-muted-foreground line-through">
                ₹{product.originalPrice.toFixed(0)}
                </p>
            )}
        </div>
      </div>
    </div>
  );
}

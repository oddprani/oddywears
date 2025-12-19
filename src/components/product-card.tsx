"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/hooks/use-cart';
import type { Product } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from 'lucide-react';

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
    <Card className="flex flex-col overflow-hidden h-full transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-square relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <CardTitle className="text-lg leading-tight mb-1">
          {product.name}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{product.category}</p>
        <div className="flex-grow" />
        <p className="text-xl font-semibold mt-4">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

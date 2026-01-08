"use client";

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/lib/data';
import { Heart, Send } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { dispatch } = useCart();
  const { toast } = useToast();
  const product = products.find((p) => p.id === params.id);

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
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-secondary">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint={product.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="w-full h-full bg-secondary"></div>
          )}
        </div>

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

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '@/context/cart-context';

export default function CartView() {
  const { state, dispatch } = useCart();
  const { items } = state;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h2 className="mt-6 text-2xl font-headline font-semibold">Your cart is empty</h2>
        <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild className="mt-6">
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        {items.map((item) => (
          <CartItemCard key={item.product.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
        ))}
      </div>
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function CartItemCard({ item, onUpdateQuantity, onRemove }: { item: CartItem; onUpdateQuantity: (id: string, q: number) => void; onRemove: (id: string) => void; }) {
  return (
    <Card>
        <CardContent className="flex items-center gap-4 p-4">
            <div className="relative h-24 w-24 flex-shrink-0">
            <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover rounded-md" data-ai-hint={item.product.imageHint} />
            </div>
            <div className="flex-grow">
            <h3 className="font-semibold font-headline">{item.product.name}</h3>
            <p className="text-sm text-muted-foreground">${item.product.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}><Minus className="h-4 w-4" /></Button>
                <Input type="number" value={item.quantity} onChange={(e) => onUpdateQuantity(item.product.id, parseInt(e.target.value))} className="h-8 w-12 text-center" />
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(item.product.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="h-5 w-5" />
            </Button>
        </CardContent>
    </Card>
  )
}

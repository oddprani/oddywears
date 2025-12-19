import { Suspense } from 'react';
import CartView from './cart-view';

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">Your Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">Review your items and proceed to checkout.</p>
      </div>
      <Suspense fallback={<p>Loading your cart...</p>}>
        <CartView />
      </Suspense>
    </div>
  );
}

import { Suspense } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { products, categories } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const currentCategory = searchParams?.category;

  const filteredProducts = currentCategory
    ? products.filter((p) => p.category === currentCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-headline font-bold">Our Collection</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find the t-shirt that expresses you.</p>
      </div>

      <div className="flex justify-center gap-2 md:gap-4 mb-8 flex-wrap">
        <Button asChild variant={!currentCategory ? 'default' : 'outline'}>
          <Link href="/products">All</Link>
        </Button>
        {categories.map((category) => (
          <Button
            key={category.name}
            asChild
            variant={currentCategory === category.name ? 'default' : 'outline'}
          >
            <Link href={`/products?category=${category.name}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
      
      <Suspense fallback={<div>Loading products...</div>}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
            <div className="text-center col-span-full py-16">
                <p className="text-xl text-muted-foreground">No products found in this category.</p>
            </div>
        )}
      </Suspense>
    </div>
  );
}

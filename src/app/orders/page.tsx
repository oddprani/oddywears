import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { orders } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Package } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">Your Orders</h1>
        <p className="mt-2 text-lg text-muted-foreground">Track your past purchases.</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
            <Package className="mx-auto h-24 w-24 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">No Orders Yet</h2>
            <p className="mt-2 text-muted-foreground">You haven't placed any orders with us.</p>
        </div>
      ) : (
      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {orders.map((order) => (
              <AccordionItem value={order.id} key={order.id}>
                <AccordionTrigger className="px-6 py-4 hover:bg-secondary/50">
                  <div className="flex justify-between items-center w-full pr-4">
                    <div className="text-left">
                        <p className="font-semibold">Order #{order.id}</p>
                        <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                    </div>
                    <div className="text-right">
                        <p className="font-semibold">₹{order.total.toFixed(2)}</p>
                        <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Shipped' ? 'secondary' : 'destructive'} 
                               className={cn(
                                   {'bg-green-500 text-white': order.status === 'Delivered'},
                                   {'bg-blue-500 text-white': order.status === 'Shipped'}
                               )}>
                            {order.status}
                        </Badge>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 border-t bg-secondary/30">
                  <div className="space-y-4">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 flex-shrink-0">
                            <Image src={product.imageUrl} alt={product.name} fill className="rounded-md object-cover" data-ai-hint={product.imageHint} />
                        </div>
                        <div className="flex-grow">
                          <p className="font-semibold">{product.name}</p>
                          <p className="text-sm text-muted-foreground">Quantity: {quantity}</p>
                        </div>
                        <p className="font-medium">₹{(product.price * quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
      )}
    </div>
  );
}

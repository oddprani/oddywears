"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  shippingName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  shippingAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
  shippingCity: z.string().min(2, { message: "City must be at least 2 characters." }),
  shippingZip: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).refine(data => {
    if (paymentMethod === 'card') {
        return !!data.cardName && !!data.cardNumber && !!data.cardExpiry && !!data.cardCvc;
    }
    return true;
}, {
    message: "Card details are required for card payment",
    path: ["cardName"] // you can choose any field to show the error
});

let paymentMethod: 'card' | 'upi' = 'card';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedUpi, setSelectedUpi] = useState<string | null>(null);
  const total = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      shippingName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingZip: "",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  function onPaymentSubmit(values: z.infer<typeof formSchema>) {
    console.log(`Checkout submitted with ${paymentMethod}`, values);
    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. Your order is being processed.",
    });
    dispatch({ type: 'CLEAR_CART' });
    router.push('/orders');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onPaymentSubmit)} className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="shippingName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="shippingAddress" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl><Input placeholder="123 Main St, Apt 4B" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="shippingCity" render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="shippingZip" render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP Code</FormLabel>
                    <FormControl><Input placeholder="12345" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full" onValueChange={(value) => paymentMethod = value as 'card' | 'upi'}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card"><CreditCard className="mr-2 h-4 w-4" />Card</TabsTrigger>
                    <TabsTrigger value="upi"><QrCode className="mr-2 h-4 w-4" />UPI</TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="mt-6 space-y-4">
                    <FormField control={form.control} name="cardName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input placeholder="•••• •••• •••• ••••" {...field} />
                            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry (MM/YY)</FormLabel>
                          <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="cardCvc" render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVC</FormLabel>
                          <FormControl><Input placeholder="123" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </TabsContent>
                  <TabsContent value="upi" className="mt-6">
                    <p className="text-sm text-muted-foreground mb-4">Select your preferred UPI app.</p>
                    <div className="grid grid-cols-3 gap-4">
                        <UpiButton name="Google Pay" onClick={() => setSelectedUpi('gpay')} selected={selectedUpi === 'gpay'} icon={<GPayIcon />} />
                        <UpiButton name="PhonePe" onClick={() => setSelectedUpi('phonepe')} selected={selectedUpi === 'phonepe'} icon={<PhonePeIcon />} />
                        <UpiButton name="Paytm" onClick={() => setSelectedUpi('paytm')} selected={selectedUpi === 'paytm'} icon={<PaytmIcon />} />
                    </div>
                    {selectedUpi && (
                        <div className="mt-6 flex flex-col items-center text-center">
                            <p className="text-muted-foreground">Scan the QR code with your UPI app</p>
                            <div className="p-4 border rounded-lg bg-white mt-2">
                                <Image src="https://picsum.photos/seed/qr/200/200" alt="QR Code" width={200} height={200} data-ai-hint="qr code"/>
                            </div>
                        </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.length > 0 ? state.items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <span className="truncate pr-2">{item.product.name} x {item.quantity}</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                )) : <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
                 <div className="flex justify-between font-bold text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardContent>
                 <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={state.items.length === 0}>
                    Pay ${total.toFixed(2)}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

const UpiButton = ({ name, icon, selected, onClick }: { name: string, icon: React.ReactNode, selected: boolean, onClick: () => void }) => (
    <Button variant={selected ? "default" : "outline"} className="h-16 flex-col gap-1" onClick={onClick}>
        {icon}
        <span className="text-xs">{name}</span>
    </Button>
);

const GPayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.15 12.84c.11-.2.16-.42.16-.65 0-.44-.22-.85-.59-1.09l-3.3-2.12a.5.5 0 0 0-.76.42v10.19a.5.5 0 0 0 .76.42l3.3-2.12c.37-.24.59-.65.59-1.09 0-.23-.05-.45-.16-.65zM5.33 4.87l3.3 2.12a2.5 2.5 0 0 1 1.25 2.16c0 .8-.41 1.52-1.07 1.96l-.01.01-1.09.7-.01.01c-.66.44-1.07 1.16-1.07 1.96a2.5 2.5 0 0 1 1.25 2.16l3.3 2.12"/><path d="M14.9 14.89c-.18.31-.48.54-.83.62s-.73.04-1.05-.08l-3.3-2.12a.5.5 0 0 1 0-.84l3.3-2.12c.32-.12.69-.1.97-.01s.53.28.68.52z"/></svg>

const PhonePeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg>

const PaytmIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z"/><path d="m14 10-4 4 4 4"/><path d="M10 10h4"/></svg>

    
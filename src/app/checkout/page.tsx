"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { Wallet } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  shippingName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  shippingAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
  shippingCity: z.string().min(2, { message: "City must be at least 2 characters." }),
  shippingZip: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),
  paymentMethod: z.enum(["card", "upi"]),
  cardName: z.string().optional(),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCvc: z.string().optional(),
}).refine(data => {
    if (data.paymentMethod === 'card') {
        return !!data.cardName && data.cardName.length >= 2 &&
               !!data.cardNumber && data.cardNumber.length === 16 &&
               !!data.cardExpiry && /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.cardExpiry) &&
               !!data.cardCvc && data.cardCvc.length === 3;
    }
    return true;
}, {
    message: "Card details are incomplete.",
    path: ["cardName"],
});

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const total = state.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      shippingName: "",
      shippingAddress: "",
      shippingCity: "",
      shippingZip: "",
      paymentMethod: "card",
      cardName: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
    },
  });

  const paymentMethod = form.watch("paymentMethod");

  function onUpiSubmit(appName: string) {
    const values = form.getValues();
    console.log(`Checkout submitted with ${appName}`, values);
    toast({
        title: "Order Placed!",
        description: `Thank you for your purchase. Your order paid with ${appName} is being processed.`,
    });
    dispatch({ type: 'CLEAR_CART' });
    router.push('/orders');
  }

  function onCardSubmit(values: z.infer<typeof formSchema>) {
    console.log("Checkout submitted with Card", values);
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
        <form onSubmit={form.handleSubmit(onCardSubmit)} className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="shippingName" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="shippingAddress" render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Address</FormLabel>
                    <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
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
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Payment Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="card" id="card" />
                            </FormControl>
                            <FormLabel htmlFor="card" className="font-normal">Card</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <RadioGroupItem value="upi" id="upi" />
                            </FormControl>
                            <FormLabel htmlFor="upi" className="font-normal">UPI</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {paymentMethod === 'card' && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <FormField control={form.control} name="cardName" render={({ field }) => (
                      <FormItem className="md:col-span-4">
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                      <FormItem className="md:col-span-4">
                        <FormLabel>Card Number</FormLabel>
                        <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="cardExpiry" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Expiry (MM/YY)</FormLabel>
                        <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="cardCvc" render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>CVC</FormLabel>
                        <FormControl><Input placeholder="123" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                )}

                {paymentMethod === 'upi' && (
                  <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">Select your preferred UPI app to complete the payment.</p>
                      <div className="grid grid-cols-2 gap-4">
                          <Button type="button" variant="outline" className="h-14" onClick={() => onUpiSubmit('Google Pay')}>
                            <Image src="https://picsum.photos/seed/gpay/50/50" alt="Google Pay" width={24} height={24} className="mr-2 rounded-full" />
                            Google Pay
                          </Button>
                          <Button type="button" variant="outline" className="h-14" onClick={() => onUpiSubmit('Paytm')}>
                            <Image src="https://picsum.photos/seed/paytm/50/50" alt="Paytm" width={24} height={24} className="mr-2" />
                            Paytm
                          </Button>
                          <Button type="button" variant="outline" className="h-14" onClick={() => onUpiSubmit('PhonePe')}>
                             <Image src="https://picsum.photos/seed/phonepe/50/50" alt="PhonePe" width={24} height={24} className="mr-2" />
                            PhonePe
                          </Button>
                          <Button type="button" variant="outline" className="h-14" onClick={() => onUpiSubmit('Other UPI App')}>
                            <Wallet className="mr-2 h-6 w-6"/>
                            Other UPI App
                          </Button>
                      </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-sm">
                    <span className="truncate pr-2">{item.product.name} x {item.quantity}</span>
                    <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                 <div className="flex justify-between font-bold text-lg pt-4 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardContent>
                 <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={state.items.length === 0 || paymentMethod === 'upi'}>
                    Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}

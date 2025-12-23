"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';
import Script from 'next/script';
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

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  shippingName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  shippingAddress: z.string().min(5, { message: "Address must be at least 5 characters." }),
  shippingCity: z.string().min(2, { message: "City must be at least 2 characters." }),
  shippingZip: z.string().min(5, { message: "ZIP code must be at least 5 characters." }),
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
    },
  });

  const makePayment = async (values: z.infer<typeof formSchema>) => {
    if (total <= 0) {
        toast({ variant: 'destructive', title: 'Your cart is empty.'});
        return;
    }

    try {
        const res = await fetch('/api/razorpay', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: total }),
        });

        if (!res.ok) {
            throw new Error('Failed to create Razorpay order');
        }

        const { orderId, amount } = await res.json();
        
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "OddyWears",
            description: "T-Shirt Purchase",
            image: "/main black logo.png",
            order_id: orderId,
            handler: function (response: any) {
                console.log('Payment successful', response);
                toast({
                    title: "Order Placed!",
                    description: "Thank you for your purchase. Your order is being processed.",
                });
                dispatch({ type: 'CLEAR_CART' });
                router.push('/orders');
            },
            prefill: {
                name: values.shippingName,
                email: values.email,
            },
            theme: {
                color: "#3F51B5"
            }
        };

        const rzp = new (window as any).Razorpay(options);
        rzp.open();

    } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Could not initiate payment.",
        });
    }
  }


  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(makePayment)} className="grid md:grid-cols-3 gap-8">
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
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>You will be redirected to Razorpay to complete your purchase securely.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                      Razorpay supports all major credit/debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking from all major banks, and multiple mobile wallets.
                  </p>
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
                      <span className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  )) : <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
                  <div className="flex justify-between font-bold text-lg pt-4 border-t">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardContent>
                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={state.items.length === 0}>
                      Pay ₹{total.toFixed(2)}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

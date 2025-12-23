import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { z } from 'zod';

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

const requestBodySchema = z.object({
  amount: z.number().positive(),
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsedBody = requestBodySchema.safeParse(body);

  if (!parsedBody.success) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { amount } = parsedBody.data;

  // Razorpay expects the amount in the smallest currency unit (e.g., paise for INR)
  // We'll assume the amount from the client is in the main unit (e.g., rupees)
  // And also that the price is in USD, so we convert to INR first. (1 USD ~ 83 INR)
  const amountInPaise = Math.round(amount * 83 * 100); 

  const options = {
    amount: amountInPaise,
    currency: 'INR',
    receipt: `receipt_order_${new Date().getTime()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ orderId: order.id, amount: order.amount }, { status: 200 });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: 'Could not create order' }, { status: 500 });
  }
}

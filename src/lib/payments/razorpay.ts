import Razorpay from 'razorpay';
import { createHmac, timingSafeEqual } from 'crypto';

/**
 * Razorpay server helpers. Keys come from the environment only:
 *   RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET (server)
 *   NEXT_PUBLIC_RAZORPAY_KEY_ID (client, key id only — never the secret)
 */

export function razorpayConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

let client: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!razorpayConfigured()) {
    throw new Error('Razorpay keys are not configured');
  }
  if (!client) {
    client = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return client;
}

/**
 * Verifies a Standard Checkout payment signature:
 * HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET) must equal the
 * signature Razorpay returned to the client.
 */
export function verifyPaymentSignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!process.env.RAZORPAY_KEY_SECRET) return false;
  const expected = createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  return a.length === b.length && timingSafeEqual(a, b);
}

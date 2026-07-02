'use client';

import { apiPost } from '@/lib/api/client';

/**
 * Razorpay Standard Web Checkout, client side.
 * Loads checkout.js on demand, creates the order server-side, opens the
 * modal, and verifies the signature server-side before reporting success.
 * Only the public key id ever reaches the browser.
 */

declare global {
  interface Window {
    Razorpay?: any;
  }
}

let scriptPromise: Promise<void> | null = null;

function loadCheckoutScript(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://checkout.razorpay.com/v1/checkout.js';
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('Could not load the payment window. Check your connection.'));
      };
      document.body.appendChild(s);
    });
  }
  return scriptPromise;
}

interface FundCampaignOptions {
  campaignId: string;
  campaignTitle: string;
  brandName?: string;
  email?: string;
  onSuccess: () => void;
  onError: (message: string) => void;
  /** Called when the user closes the modal without paying. */
  onDismiss?: () => void;
}

export async function fundCampaignWithRazorpay(opts: FundCampaignOptions): Promise<void> {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  if (!keyId) {
    opts.onError('Payments are not configured yet — add the Razorpay keys.');
    return;
  }

  try {
    await loadCheckoutScript();
    const order = await apiPost<{ order_id: string; amount: number; currency: string }>(
      '/api/payments/razorpay/order',
      { campaignId: opts.campaignId }
    );

    const rzp = new window.Razorpay({
      key: keyId,
      amount: order.amount,
      currency: order.currency,
      order_id: order.order_id,
      name: 'VeroLinkr',
      description: `Fund campaign — ${opts.campaignTitle}`,
      prefill: {
        name: opts.brandName ?? '',
        email: opts.email ?? '',
      },
      theme: { color: '#08080c' },
      modal: {
        ondismiss: () => opts.onDismiss?.(),
      },
      handler: async (response: {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
      }) => {
        try {
          await apiPost('/api/payments/razorpay/verify', response);
          opts.onSuccess();
        } catch (e: any) {
          opts.onError(e.message || 'Payment verification failed. Contact support with your payment id.');
        }
      },
    });

    rzp.on('payment.failed', (resp: any) => {
      opts.onError(resp?.error?.description || 'The payment failed. Try again.');
    });

    rzp.open();
  } catch (e: any) {
    opts.onError(e.message || 'Could not start the payment.');
  }
}

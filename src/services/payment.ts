export type PaymentMethod = {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  requiresRedirect: boolean
  isComingSoon?: boolean
}

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    name: "Cash on Delivery",
    slug: "cod",
    description: "Pay with cash when your order is delivered",
    icon: "banknote",
    requiresRedirect: false,
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    slug: "mpesa",
    description: "Pay via M-Pesa — you will receive an STK push prompt",
    icon: "smartphone",
    requiresRedirect: false,
  },
  {
    id: "bank-transfer",
    name: "Bank Transfer",
    slug: "bank-transfer",
    description: "Pay via direct bank transfer to our account",
    icon: "building",
    requiresRedirect: false,
  },
  {
    id: "online",
    name: "Online Payment",
    slug: "online",
    description: "Card, Mobile Money, and other online options",
    icon: "credit-card",
    requiresRedirect: true,
    isComingSoon: true,
  },
]

export function getPaymentMethod(slug: string): PaymentMethod | undefined {
  return PAYMENT_METHODS.find((m) => m.slug === slug)
}

// Future integration points:
// - Daraja API:   integrate with Safaricom's M-Pesa API
// - Stripe:       integrate for card payments
// - Flutterwave:  integrate for pan-African payments
// - PayPal:       integrate for international customers
export interface PaymentGateway {
  name: string
  processPayment(
    amount: number,
    currency: string,
    metadata: Record<string, unknown>
  ): Promise<PaymentResult>
  verifyPayment(reference: string): Promise<PaymentResult>
}

export type PaymentResult = {
  success: boolean
  transactionId?: string
  message?: string
  error?: string
}

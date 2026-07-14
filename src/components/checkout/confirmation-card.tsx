"use client"

import { CheckCircle, Package, MessageCircle, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice, formatDate } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { routes } from "@/config/routes"

export type OrderData = {
  orderNumber: string
  email: string
  status: string
  subtotal: number
  shipping: number
  total: number
  currency: string
  deliveryMethod: string | null
  paymentMethod: string | null
  createdAt: Date
  deliveryNotes: string | null
  items: Array<{
    quantity: number
    price: number
    product: { name: string; slug: string; weight: string | null }
  }>
  shippingAddress: {
    firstName: string
    lastName: string
    line1: string
    line2: string | null
    city: string
    state: string | null
    phone: string | null
  } | null
}

export function ConfirmationCard({ order }: { order: OrderData }) {
  const methodLabels: Record<string, string> = {
    standard: "Standard Delivery",
    express: "Express Delivery",
    pickup: "Store Pickup",
    cod: "Cash on Delivery",
    mpesa: "M-Pesa",
    "bank-transfer": "Bank Transfer",
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center mb-8">
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
        </div>
        <h1 className="font-heading text-3xl font-semibold">
          Order Confirmed!
        </h1>
        <p className="mt-2 text-muted-foreground">
          {`Thank you for your order. We'll send a confirmation to`}{" "}
          <strong>{order.email}</strong>.
        </p>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Order Number
            </p>
            <p className="font-heading text-lg font-semibold">
              {order.orderNumber}
            </p>
          </div>
          <Package className="h-8 w-8 text-muted-foreground/30" />
        </div>

        <Separator className="mb-4" />

        <div className="space-y-3 text-sm">
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty: {item.quantity}
                </p>
              </div>
              <span className="tabular-nums">
                {formatPrice(Number(item.price) * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="tabular-nums">
              {formatPrice(Number(order.subtotal))}
            </span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Shipping</span>
            <span className="tabular-nums">
              {Number(order.shipping) === 0
                ? "Free"
                : formatPrice(Number(order.shipping))}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between">
          <span className="font-heading text-lg font-semibold">Total</span>
          <span className="font-heading text-xl font-semibold tabular-nums">
            {formatPrice(Number(order.total))}
          </span>
        </div>
      </Card>

      {/* Shipping & Payment info */}
      <Card className="p-6 mb-6 space-y-4">
        {order.shippingAddress && (
          <div>
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
              Shipping To
            </h3>
            <p className="text-sm">
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.line1}
              {order.shippingAddress.line2
                ? `, ${order.shippingAddress.line2}`
                : ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.city}
              {order.shippingAddress.state
                ? `, ${order.shippingAddress.state}`
                : ""}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.shippingAddress.phone}
            </p>
          </div>
        )}

        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Delivery Method
          </h3>
          <p className="text-sm">
            {methodLabels[order.deliveryMethod || ""] || order.deliveryMethod}
          </p>
        </div>

        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Payment Method
          </h3>
          <p className="text-sm">
            {methodLabels[order.paymentMethod || ""] || order.paymentMethod}
          </p>
        </div>

        <div>
          <h3 className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
            Order Date
          </h3>
          <p className="text-sm">{formatDate(order.createdAt)}</p>
        </div>
      </Card>

      <Card className="p-6 mb-8">
        <h3 className="font-heading mb-2 text-lg font-semibold">
          {`What's Next?`}
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="font-semibold text-foreground">1.</span>
            You will receive an order confirmation via email.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-foreground">2.</span>
            We will process your order and notify you when it ships.
          </li>
          <li className="flex gap-2">
            <span className="font-semibold text-foreground">3.</span>
            Your order will be delivered to your specified address.
          </li>
        </ol>

        <div className="mt-4 rounded-xl bg-primary/5 p-4 flex items-center gap-3">
          <MessageCircle className="h-5 w-5 text-primary shrink-0" />
          <div className="text-sm">
            <p className="font-medium">Need help with your order?</p>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Tullia Tea, I have a question about my order ${order.orderNumber}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Contact us on WhatsApp
            </a>
          </div>
        </div>
      </Card>

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href={routes.products}>
          <Button>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}

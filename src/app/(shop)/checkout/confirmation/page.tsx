import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/ui/container"
import { getOrderByNumber } from "@/services/order"
import { ConfirmationCard } from "@/components/checkout/confirmation-card"
import type { OrderData } from "@/components/checkout/confirmation-card"

export const metadata: Metadata = {
  title: "Order Confirmation",
  description: "Your order has been placed successfully.",
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ order?: string }>
}

export default async function ConfirmationPage({ searchParams }: Props) {
  const { order } = await searchParams
  if (!order) notFound()

  const raw = await getOrderByNumber(order)
  if (!raw) notFound()

  const orderData: OrderData = {
    orderNumber: raw.orderNumber,
    email: raw.email,
    status: raw.status,
    subtotal: Number(raw.subtotal),
    shipping: Number(raw.shipping),
    total: Number(raw.total),
    currency: raw.currency,
    deliveryMethod: raw.deliveryMethod,
    paymentMethod: raw.paymentMethod,
    createdAt: raw.createdAt,
    deliveryNotes: raw.deliveryNotes,
    items: raw.items.map((i) => ({
      quantity: i.quantity,
      price: Number(i.price),
      product: {
        name: i.product.name,
        slug: i.product.slug,
        weight: i.product.weight || null,
      },
    })),
    shippingAddress: raw.shippingAddress
      ? {
          firstName: raw.shippingAddress.firstName,
          lastName: raw.shippingAddress.lastName,
          line1: raw.shippingAddress.line1,
          line2: raw.shippingAddress.line2,
          city: raw.shippingAddress.city,
          state: raw.shippingAddress.state,
          phone: raw.shippingAddress.phone,
        }
      : null,
  }

  return (
    <Container className="py-8 sm:py-12">
      <ConfirmationCard order={orderData} />
    </Container>
  )
}

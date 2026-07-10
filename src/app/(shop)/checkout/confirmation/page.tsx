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

  const orderData = await getOrderByNumber(order)
  if (!orderData) notFound()

  return (
    <Container className="py-8 sm:py-12">
      <ConfirmationCard order={orderData as unknown as OrderData} />
    </Container>
  )
}

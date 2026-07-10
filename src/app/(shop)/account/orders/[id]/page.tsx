import type { Metadata } from "next"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { OrderTimeline } from "@/components/dashboard/order-timeline"
import { formatDate, formatPrice } from "@/lib/utils"
import { getCurrentUser } from "@/lib/current-user"
import { getOrderByNumber } from "@/services/order"
import { siteConfig } from "@/config/site"
import { routes } from "@/config/routes"

export const metadata: Metadata = {
  title: "Order Details",
  robots: { index: false, follow: false },
}

type Props = { params: Promise<{ id: string }> }

export default async function OrderDetailPage({ params }: Props) {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  const { id } = await params
  const order = await getOrderByNumber(id)
  if (!order || (order.userId && order.userId !== user.id)) notFound()

  const methodLabels: Record<string, string> = {
    standard: "Standard Delivery",
    express: "Express Delivery",
    pickup: "Store Pickup",
    cod: "Cash on Delivery",
    mpesa: "M-Pesa",
    "bank-transfer": "Bank Transfer",
  }

  return (
    <div className="space-y-6">
      <Link
        href={routes.account.orders}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            {order.orderNumber}
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <Badge variant="outline" className="w-fit text-sm px-3 py-1">
          {order.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="font-heading mb-4 text-lg font-semibold">
              Order Timeline
            </h2>
            <OrderTimeline status={order.status} />
          </Card>

          {/* Items */}
          <Card className="p-6">
            <h2 className="font-heading mb-4 text-lg font-semibold">Items</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <Link
                      href={routes.product(item.product.slug)}
                      className="text-sm font-medium hover:text-primary transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="text-sm font-semibold tabular-nums shrink-0 ml-4">
                    {formatPrice(Number(item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="font-heading mb-4 text-lg font-semibold">
              Order Summary
            </h2>
            <div className="space-y-2 text-sm">
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
              {Number(order.discount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="tabular-nums">
                    -{formatPrice(Number(order.discount))}
                  </span>
                </div>
              )}
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span className="tabular-nums">
                {formatPrice(Number(order.total))}
              </span>
            </div>
          </Card>

          {order.shippingAddress && (
            <Card className="p-6">
              <h2 className="font-heading mb-3 text-lg font-semibold">
                Shipping Address
              </h2>
              <div className="text-sm text-muted-foreground space-y-0.5">
                <p className="font-medium text-foreground">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && (
                  <p>{order.shippingAddress.line2}</p>
                )}
                <p>
                  {order.shippingAddress.city}
                  {order.shippingAddress.state
                    ? `, ${order.shippingAddress.state}`
                    : ""}
                </p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="font-heading mb-3 text-lg font-semibold">Details</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-foreground">
                  {methodLabels[order.deliveryMethod || ""] ||
                    order.deliveryMethod}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment</span>
                <span className="text-foreground">
                  {methodLabels[order.paymentMethod || ""] ||
                    order.paymentMethod}
                </span>
              </div>
              {order.deliveryNotes && (
                <div className="pt-2 border-t mt-2">
                  <p className="text-xs mb-1">Delivery Notes</p>
                  <p className="text-foreground text-xs">
                    {order.deliveryNotes}
                  </p>
                </div>
              )}
            </div>
          </Card>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi Tullia Tea, I have a question about my order ${order.orderNumber}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-5 w-5 text-green-600" />
            <div className="flex-1 text-sm">
              <p className="font-medium">Need help?</p>
              <p className="text-muted-foreground text-xs">
                Contact us on WhatsApp
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

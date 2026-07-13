export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MessageCircle, Mail, Phone } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate, formatPrice } from "@/lib/utils"
import { PrintButton } from "@/components/admin/print-button"
import { OrderStatusUpdater } from "./order-status-updater"
import { AdminNotesSection } from "./admin-notes-section"

type Props = { params: Promise<{ id: string }> }

const methodLabels: Record<string, string> = {
  standard: "Standard Delivery",
  express: "Express Delivery",
  pickup: "Store Pickup",
  cod: "Cash on Delivery",
  mpesa: "M-Pesa",
  "bank-transfer": "Bank Transfer",
}

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: { include: { product: { select: { name: true, slug: true } } } },
      shippingAddress: true,
      statusHistory: { orderBy: { createdAt: "desc" } },
      adminNotes: { orderBy: { createdAt: "desc" } },
    },
  })

  if (!order) notFound()

  const waMsg = encodeURIComponent(
    `Hi Tullia Tea, I have a question about order ${order.orderNumber}.`
  )

  return (
    <div className="space-y-6">
      <Link
        href="/admin/orders"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-semibold">
            {order.orderNumber}
          </h1>
          <p className="text-sm text-muted-foreground">
            Placed {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <Card className="p-5">
            <h2 className="font-heading text-lg font-semibold mb-4">Items</h2>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm"
                >
                  <div>
                    <Link
                      href={`/products/${item.product.slug}`}
                      target="_blank"
                      className="font-medium hover:text-primary"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × {formatPrice(Number(item.price))}
                    </p>
                  </div>
                  <span className="font-semibold tabular-nums">
                    {formatPrice(Number(item.price) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="space-y-1 text-sm">
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
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="tabular-nums">
                {formatPrice(Number(order.total))}
              </span>
            </div>
          </Card>

          {/* Status Timeline */}
          {order.statusHistory.length > 0 && (
            <Card className="p-5">
              <h2 className="font-heading text-lg font-semibold mb-4">
                Status Timeline
              </h2>
              <ol className="space-y-3">
                {[...order.statusHistory].reverse().map((h) => (
                  <li key={h.id} className="flex items-center gap-3 text-sm">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{h.status}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(h.createdAt, {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          )}

          {/* Admin Notes */}
          <Card className="p-5">
            <h2 className="font-heading text-lg font-semibold mb-4">
              Internal Notes
            </h2>
            <AdminNotesSection
              orderId={order.id}
              notes={order.adminNotes.map((n) => ({
                id: n.id,
                content: n.content,
                createdAt: n.createdAt,
                createdBy: "Admin",
              }))}
            />
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="font-heading text-lg font-semibold mb-3">
              Customer
            </h2>
            <div className="space-y-2 text-sm">
              {order.shippingAddress && (
                <>
                  <p className="font-medium">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.line1}
                  </p>
                  {order.shippingAddress.line2 && (
                    <p className="text-muted-foreground">
                      {order.shippingAddress.line2}
                    </p>
                  )}
                  <p className="text-muted-foreground">
                    {order.shippingAddress.city}
                    {order.shippingAddress.state
                      ? `, ${order.shippingAddress.state}`
                      : ""}
                  </p>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.phone}
                  </p>
                </>
              )}
              <p className="text-muted-foreground">{order.email}</p>
            </div>
            <Separator className="my-3" />
            <div className="flex flex-col gap-2">
              {order.shippingAddress?.phone && (
                <a
                  href={`https://wa.me/${order.shippingAddress.phone.replace(/\D/g, "")}?text=${waMsg}`}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 rounded-lg border p-2.5 text-sm hover:bg-muted transition-colors"
                >
                  <MessageCircle className="h-4 w-4 text-green-600" />{" "}
                  <span>WhatsApp</span>
                </a>
              )}
              <a
                href={`mailto:${order.email}`}
                className="flex items-center gap-2 rounded-lg border p-2.5 text-sm hover:bg-muted transition-colors"
              >
                <Mail className="h-4 w-4 text-blue-600" /> <span>Email</span>
              </a>
              {order.shippingAddress?.phone && (
                <a
                  href={`tel:${order.shippingAddress.phone}`}
                  className="flex items-center gap-2 rounded-lg border p-2.5 text-sm hover:bg-muted transition-colors"
                >
                  <Phone className="h-4 w-4" /> <span>Call</span>
                </a>
              )}
            </div>
          </Card>

          <Card className="p-5">
            <h2 className="font-heading text-lg font-semibold mb-3">Details</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>
                  {methodLabels[order.deliveryMethod || ""] ||
                    order.deliveryMethod ||
                    "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment</span>
                <span>
                  {methodLabels[order.paymentMethod || ""] ||
                    order.paymentMethod ||
                    "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Paid</span>
                <span>{order.isPaid ? "Yes" : "No"}</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-2">
            <PrintButton />
          </div>
        </div>
      </div>
    </div>
  )
}

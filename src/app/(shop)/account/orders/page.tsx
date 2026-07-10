import type { Metadata } from "next"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Package, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate, formatPrice } from "@/lib/utils"
import { getCurrentUser } from "@/lib/current-user"
import { getOrdersByUser } from "@/services/order"
import { routes } from "@/config/routes"

export const metadata: Metadata = {
  title: "My Orders",
  robots: { index: false, follow: false },
}

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  PROCESSING: "bg-purple-100 text-purple-700 border-purple-200",
  SHIPPED: "bg-cyan-100 text-cyan-700 border-cyan-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
  REFUNDED: "bg-gray-100 text-gray-700 border-gray-200",
}

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  const orders = await getOrdersByUser(user.id)

  return (
    <div className="space-y-8">
      <PageHeader title="My Orders" description="View your order history" />

      {orders.length === 0 ? (
        <EmptyState
          icon={<Package className="h-8 w-8" />}
          title="No orders yet"
          description="When you place an order, it will appear here."
          action={
            <Link href={routes.products}>
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link key={order.id} href={routes.account.order(order.orderNumber)}>
              <Card className="p-4 sm:p-5 hover:bg-muted/50 transition-colors group">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)} &middot;{" "}
                      {order.items.length} item
                      {order.items.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge
                        variant="outline"
                        className={`text-[11px] px-2 py-0.5 ${statusColors[order.status] || ""}`}
                      >
                        {order.status}
                      </Badge>
                      <p className="text-sm font-semibold mt-1 tabular-nums">
                        {formatPrice(Number(order.total))}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

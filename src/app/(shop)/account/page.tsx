import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatPrice } from "@/lib/utils"
import { getCurrentUser } from "@/lib/current-user"
import { getOrdersByUser } from "@/services/order"
import { getUserAddresses } from "@/services/address"
import { routes } from "@/config/routes"
import Link from "next/link"
import { ArrowRight, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Your Tullia Tea account dashboard.",
  robots: { index: false, follow: false },
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  const orders = await getOrdersByUser(user.id)
  const addresses = await getUserAddresses(user.id)

  const totalOrders = orders.length
  const pendingOrders = orders.filter(
    (o) => o.status === "PENDING" || o.status === "CONFIRMED"
  ).length
  const completedOrders = orders.filter((o) => o.status === "DELIVERED").length
  const savedAddresses = addresses.length

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Welcome back, ${user.name?.split(" ")[0] || "there"}!`}
        description="Manage your account and view your orders."
      />

      <DashboardStats
        totalOrders={totalOrders}
        pendingOrders={pendingOrders}
        completedOrders={completedOrders}
        savedAddresses={savedAddresses}
      />

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-lg font-semibold">Recent Orders</h2>
          {orders.length > 0 && (
            <Link href={routes.account.orders}>
              <Button variant="link" size="sm">
                View All <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          )}
        </div>

        {orders.length === 0 ? (
          <Card className="p-8 text-center">
            <Package className="mx-auto mb-3 h-10 w-10 text-muted-foreground/30" />
            <p className="text-sm text-muted-foreground mb-3">No orders yet</p>
            <Link href={routes.products}>
              <Button size="sm">Start Shopping</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-3">
            {orders.slice(0, 5).map((order) => (
              <Link
                key={order.id}
                href={routes.account.order(order.orderNumber)}
              >
                <Card className="p-4 flex items-center justify-between gap-4 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{order.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <Badge variant="outline" className="text-[10px]">
                      {order.status}
                    </Badge>
                    <p className="text-sm font-semibold mt-1 tabular-nums">
                      {formatPrice(Number(order.total))}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

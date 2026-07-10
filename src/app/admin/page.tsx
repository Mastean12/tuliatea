export const dynamic = "force-dynamic"

import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
} from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { routes } from "@/config/routes"

export default async function AdminDashboard() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [
    totalOrders,
    todayOrders,
    pendingOrders,
    processingOrders,
    deliveredOrders,
    cancelledOrders,
    totalProducts,
    totalCustomers,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count(),
    prisma.order.count({ where: { createdAt: { gte: today } } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "PROCESSING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.order.count({ where: { status: "CANCELLED" } }),
    prisma.product.count(),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { shippingAddress: true },
    }),
  ])

  const revenueResult = await prisma.order.aggregate({
    _sum: { total: true },
    where: { status: { notIn: ["CANCELLED", "REFUNDED"] } },
  })
  const totalRevenue = Number(revenueResult._sum.total || 0)

  const stats = [
    {
      label: "Total Revenue",
      value: formatPrice(totalRevenue),
      icon: DollarSign,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Today's Orders",
      value: todayOrders,
      icon: TrendingUp,
      color: "text-indigo-600 bg-indigo-100",
    },
    {
      label: "Pending",
      value: pendingOrders,
      icon: Clock,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Processing",
      value: processingOrders,
      icon: Package,
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Delivered",
      value: deliveredOrders,
      icon: CheckCircle,
      color: "text-green-600 bg-green-100",
    },
    {
      label: "Cancelled",
      value: cancelledOrders,
      icon: XCircle,
      color: "text-red-600 bg-red-100",
    },
    {
      label: "Customers",
      value: totalCustomers,
      icon: Users,
      color: "text-cyan-600 bg-cyan-100",
    },
  ]

  const orderStatusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700",
    CONFIRMED: "bg-blue-100 text-blue-700",
    PROCESSING: "bg-purple-100 text-purple-700",
    SHIPPED: "bg-cyan-100 text-cyan-700",
    DELIVERED: "bg-green-100 text-green-700",
    CANCELLED: "bg-red-100 text-red-700",
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description={`${totalProducts} products · ${totalOrders} orders`}
      >
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </PageHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4 flex items-center gap-4">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${s.color}`}
            >
              <s.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold">
              Recent Orders
            </h2>
            <Link href={routes.admin.orders}>
              <Button variant="link" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((o) => (
              <Link
                key={o.id}
                href={`/admin/orders/${o.id}`}
                className="flex items-center justify-between text-sm hover:bg-muted/50 rounded-lg p-2 -mx-2 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{o.orderNumber}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.shippingAddress
                      ? `${o.shippingAddress.firstName} ${o.shippingAddress.lastName}`
                      : o.email}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <Badge
                    variant="outline"
                    className={`text-[10px] ${orderStatusColors[o.status] || ""}`}
                  >
                    {o.status}
                  </Badge>
                  <p className="text-xs font-semibold mt-0.5 tabular-nums">
                    {formatPrice(Number(o.total))}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-heading text-lg font-semibold mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/products/new">
              <Button className="w-full">Add Product</Button>
            </Link>
            <Link href={routes.admin.orders}>
              <Button variant="outline" className="w-full">
                View Orders
              </Button>
            </Link>
            <Link href={routes.admin.categories}>
              <Button variant="outline" className="w-full">
                Categories
              </Button>
            </Link>
            <Link href={routes.admin.products}>
              <Button variant="outline" className="w-full">
                Products
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

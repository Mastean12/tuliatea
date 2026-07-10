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
import { cn } from "@/lib/utils"
import { formatPrice } from "@/lib/utils"
import Link from "next/link"
import { routes } from "@/config/routes"

const iconStyles = [
  { bg: "bg-primary/10 text-primary" },
  { bg: "bg-secondary/20 text-secondary" },
  { bg: "bg-accent/15 text-accent" },
  { bg: "bg-amber-100 text-amber-700" },
  { bg: "bg-purple-100 text-purple-700" },
  { bg: "bg-emerald-100 text-emerald-700" },
  { bg: "bg-red-100 text-red-700" },
  { bg: "bg-cyan-100 text-cyan-700" },
]

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
    },
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag },
    { label: "Today's Orders", value: todayOrders, icon: TrendingUp },
    { label: "Pending", value: pendingOrders, icon: Clock },
    { label: "Processing", value: processingOrders, icon: Package },
    { label: "Delivered", value: deliveredOrders, icon: CheckCircle },
    { label: "Cancelled", value: cancelledOrders, icon: XCircle },
    { label: "Customers", value: totalCustomers, icon: Users },
  ]

  const orderStatusColors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-700 border-amber-200",
    CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
    PROCESSING: "bg-purple-100 text-purple-700 border-purple-200",
    SHIPPED: "bg-cyan-100 text-cyan-700 border-cyan-200",
    DELIVERED: "bg-emerald-100 text-emerald-700 border-emerald-200",
    CANCELLED: "bg-red-100 text-red-700 border-red-200",
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
        {stats.map((s, i) => (
          <Card
            key={s.label}
            className="p-4 flex items-center gap-4 border-l-4 border-l-primary/20"
          >
            <div
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                iconStyles[i % iconStyles.length].bg
              )}
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
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-lg font-semibold">
              Recent Orders
            </h2>
            <Link href={routes.admin.orders}>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-2">
            {recentOrders.map((o) => (
              <Link
                key={o.id}
                href={`/admin/orders/${o.id}`}
                className="flex items-center justify-between text-sm rounded-lg bg-muted/30 p-3 hover:bg-muted/60 transition-colors"
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
                    className={cn(
                      "text-[10px] px-2",
                      orderStatusColors[o.status] || ""
                    )}
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

        <Card className="p-6">
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

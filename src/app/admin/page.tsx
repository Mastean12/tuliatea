export const dynamic = "force-dynamic"

import { Package, Tags, Star, AlertTriangle } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import Link from "next/link"
import { routes } from "@/config/routes"

export default async function AdminDashboard() {
  const [
    totalProducts,
    totalCategories,
    featuredCount,
    outOfStock,
    _discounted,
    recentProducts,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.product.count({ where: { isFeatured: true, status: "PUBLISHED" } }),
    prisma.product.count({ where: { stock: 0, status: "PUBLISHED" } }),
    prisma.product.count({
      where: { comparePrice: { not: null }, status: "PUBLISHED" },
    }),
    prisma.product.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: { select: { name: true } } },
    }),
  ])

  const stats = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "text-blue-600 bg-blue-100",
    },
    {
      label: "Categories",
      value: totalCategories,
      icon: Tags,
      color: "text-purple-600 bg-purple-100",
    },
    {
      label: "Featured",
      value: featuredCount,
      icon: Star,
      color: "text-amber-600 bg-amber-100",
    },
    {
      label: "Out of Stock",
      value: outOfStock,
      icon: AlertTriangle,
      color: "text-red-600 bg-red-100",
    },
  ]

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Overview of your Tullia Tea store"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              Recent Products
            </h2>
            <Link href={routes.admin.products}>
              <Button variant="link" size="sm">
                View All
              </Button>
            </Link>
          </div>
          <div className="space-y-3">
            {recentProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/admin/products/${p.id}`}
                    className="font-medium hover:text-primary transition-colors truncate block"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {p.category.name}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground shrink-0 ml-4">
                  {formatDate(p.createdAt)}
                </span>
              </div>
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
            <Link href={routes.admin.categories}>
              <Button variant="outline" className="w-full">
                Manage Categories
              </Button>
            </Link>
            <Link href={routes.products} target="_blank">
              <Button variant="outline" className="w-full">
                View Store
              </Button>
            </Link>
            <Link href={routes.admin.products}>
              <Button variant="outline" className="w-full">
                All Products
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

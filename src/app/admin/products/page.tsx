export const dynamic = "force-dynamic"

import Link from "next/link"
import { Plus } from "lucide-react"
import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { AdminProductTable } from "./admin-product-table"

type Props = {
  searchParams: Promise<{
    search?: string
    category?: string
    status?: string
    page?: string
  }>
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const sp = await searchParams
  const page = Number(sp.page) || 1
  const pageSize = 20
  const search = sp.search
  const category = sp.category
  const status = sp.status

  const where: Record<string, unknown> = {}

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" as const } },
      { description: { contains: search, mode: "insensitive" as const } },
    ]
  }
  if (category && category !== "all") where.categoryId = category
  if (status && status !== "all") where.status = status

  const [products, total, categories] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: { select: { id: true, name: true } },
        images: { where: { isPrimary: true }, take: 1 },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ])

  const productsData = products.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: Number(p.price),
    comparePrice: p.comparePrice ? Number(p.comparePrice) : null,
    stock: p.stock,
    status: p.status,
    isFeatured: p.isFeatured,
    categoryName: p.category.name,
    categoryId: p.category.id,
    imageUrl: p.images[0]?.url || null,
    createdAt: p.createdAt,
  }))

  return (
    <div className="space-y-6">
      <PageHeader title="Products" description="Manage your product catalogue">
        <Link href="/admin/products/new">
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </PageHeader>

      <AdminProductTable
        products={productsData}
        total={total}
        page={page}
        pageSize={pageSize}
        categories={categories}
        searchParams={{ search, category, status }}
      />
    </div>
  )
}

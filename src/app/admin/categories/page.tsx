export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { AdminCategoryManager } from "./admin-category-manager"

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  })

  return (
    <div className="space-y-6">
      <PageHeader title="Categories" description="Manage product categories" />
      <AdminCategoryManager categories={categories} />
    </div>
  )
}

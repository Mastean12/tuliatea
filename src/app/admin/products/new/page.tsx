export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { AdminProductForm } from "@/components/admin/product-form"

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { name: "asc" },
  })

  return (
    <div className="max-w-3xl">
      <AdminProductForm categories={categories} />
    </div>
  )
}

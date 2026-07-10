export const dynamic = "force-dynamic"

import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { AdminProductForm } from "@/components/admin/product-form"

type Props = { params: Promise<{ id: string }> }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
      include: {
        category: { select: { id: true, name: true } },
        images: { orderBy: { sortOrder: "asc" } },
      },
    }),
    prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    }),
  ])

  if (!product) notFound()

  const serialized = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    shortDesc: product.shortDesc,
    ingredients: product.ingredients,
    benefits: product.benefits,
    brewingGuide: product.brewingGuide,
    deliveryInfo: product.deliveryInfo,
    returnInfo: product.returnInfo,
    tags: product.tags,
    metaTitle: product.metaTitle,
    metaDesc: product.metaDesc,
    price: Number(product.price),
    comparePrice: product.comparePrice ? Number(product.comparePrice) : null,
    stock: product.stock,
    lowStock: product.lowStock,
    weight: product.weight,
    servings: product.servings,
    isFeatured: product.isFeatured,
    status: product.status,
    categoryId: product.categoryId,
    images: product.images.map((img) => ({
      id: img.id,
      url: img.url,
      alt: img.alt,
      isPrimary: img.isPrimary,
    })),
  }

  return (
    <div className="max-w-3xl">
      <AdminProductForm product={serialized} categories={categories} />
    </div>
  )
}

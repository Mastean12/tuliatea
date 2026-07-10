import { prisma } from "@/lib/prisma"
import type { Prisma } from "@prisma/client"

export type ProductListParams = {
  search?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featured?: boolean
  discounted?: boolean
  sort?: string
  page?: number
  pageSize?: number
}

const productInclude = {
  category: { select: { id: true, name: true, slug: true } },
  images: { orderBy: { sortOrder: "asc" as const }, take: 5 },
} satisfies Prisma.ProductInclude

export type ProductListItem = Prisma.ProductGetPayload<{
  include: typeof productInclude
}>

export async function getProducts(params: ProductListParams = {}) {
  const {
    search,
    category,
    minPrice,
    maxPrice,
    inStock,
    featured,
    discounted,
    sort = "newest",
    page = 1,
    pageSize = 12,
  } = params

  const where: Prisma.ProductWhereInput = { isActive: true }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { ingredients: { contains: search, mode: "insensitive" } },
      { tags: { contains: search, mode: "insensitive" } },
    ]
  }

  if (category) {
    where.category = { slug: category }
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {}
    if (minPrice !== undefined) where.price.gte = minPrice
    if (maxPrice !== undefined) where.price.lte = maxPrice
  }

  if (inStock) {
    where.stock = { gt: 0 }
  }

  if (featured) {
    where.isFeatured = true
  }

  if (discounted) {
    where.comparePrice = { not: null }
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput[] = (() => {
    switch (sort) {
      case "price-asc":
        return [{ price: "asc" }]
      case "price-desc":
        return [{ price: "desc" }]
      case "name-asc":
        return [{ name: "asc" }]
      case "name-desc":
        return [{ name: "desc" }]
      case "featured":
        return [{ isFeatured: "desc" }, { createdAt: "desc" }]
      default:
        return [{ createdAt: "desc" }]
    }
  })()

  const skip = (page - 1) * pageSize

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: productInclude,
      orderBy,
      skip,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ])

  return {
    items,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug, isActive: true },
    include: {
      ...productInclude,
      images: { orderBy: { sortOrder: "asc" } },
      reviews: {
        where: { isActive: true },
        select: {
          id: true,
          rating: true,
          title: true,
          comment: true,
          createdAt: true,
        },
      },
    },
  })
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  take = 4
) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      categoryId,
      id: { not: productId },
    },
    include: productInclude,
    take,
    orderBy: { createdAt: "desc" },
  })
}

export async function getCategories() {
  return prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  })
}

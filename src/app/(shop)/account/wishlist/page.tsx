import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Heart } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { getCurrentUser } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"
import { routes } from "@/config/routes"
import { ProductCard } from "@/components/products/product-card"

export const metadata: Metadata = {
  title: "My Wishlist",
  robots: { index: false, follow: false },
}

export default async function WishlistPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  const items = await prisma.wishlistItem.findMany({
    where: { userId: user.id },
    include: {
      product: {
        include: {
          category: { select: { name: true, slug: true } },
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Wishlist"
        description="Products you have saved for later"
      />

      {items.length === 0 ? (
        <EmptyState
          icon={<Heart className="h-8 w-8" />}
          title="Your wishlist is empty"
          description="Save products you love to your wishlist and come back to them anytime."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProductCard
              key={item.id}
              product={{
                id: item.product.id,
                name: item.product.name,
                slug: item.product.slug,
                description: item.product.description,
                price: Number(item.product.price),
                comparePrice: item.product.comparePrice
                  ? Number(item.product.comparePrice)
                  : null,
                weight: item.product.weight,
                stock: item.product.stock,
                isFeatured: item.product.isFeatured,
                category: item.product.category,
                images: item.product.images.map((img) => ({
                  url: img.url,
                  alt: img.alt,
                })),
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

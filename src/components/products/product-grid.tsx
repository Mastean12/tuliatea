import { ProductCard } from "./product-card"
import { EmptyProducts } from "./empty-products"
import { LoadingProducts } from "./loading-products"

type ProductGridProps = {
  products: Array<{
    id: string
    name: string
    slug: string
    description: string
    price: number
    comparePrice?: number | null
    weight?: string | null
    stock: number
    isFeatured?: boolean
    category: { name: string; slug: string }
    images: Array<{ url: string; alt?: string | null }>
  }>
  isLoading?: boolean
  isEmpty?: boolean
  onClearFilters?: () => void
}

export function ProductGrid({
  products,
  isLoading,
  isEmpty,
  onClearFilters,
}: ProductGridProps) {
  if (isLoading) return <LoadingProducts />
  if (isEmpty || products.length === 0)
    return <EmptyProducts onClear={onClearFilters} />

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </div>
  )
}

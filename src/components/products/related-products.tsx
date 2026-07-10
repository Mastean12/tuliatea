import { ProductCard } from "./product-card"

type RelatedProductsProps = {
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
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="border-t py-16">
      <h2 className="font-heading mb-8 text-2xl font-semibold">
        Related Products
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}

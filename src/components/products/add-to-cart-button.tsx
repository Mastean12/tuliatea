"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { toast } from "sonner"

type AddToCartButtonProps = {
  product: {
    id: string
    name: string
    slug: string
    price: number
    image: string
    weight: string
  }
  quantity?: number
  disabled?: boolean
  className?: string
}

export function AddToCartButton({
  product,
  quantity = 1,
  disabled,
  className,
}: AddToCartButtonProps) {
  const addItem = useCart((s) => s.addItem)

  return (
    <Button
      size="lg"
      disabled={disabled}
      onClick={() => {
        addItem(product, quantity)
        toast.success(`${product.name} added to cart`)
      }}
      className={className}
    >
      <ShoppingCart className="mr-2 h-4 w-4" />
      Add to Cart
    </Button>
  )
}

"use client"

import { useRouter } from "next/navigation"
import { Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { routes } from "@/config/routes"

type BuyNowButtonProps = {
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
}

export function BuyNowButton({
  product,
  quantity = 1,
  disabled,
}: BuyNowButtonProps) {
  const router = useRouter()
  const addItem = useCart((s) => s.addItem)

  return (
    <Button
      size="lg"
      variant="secondary"
      disabled={disabled}
      onClick={() => {
        addItem(product, quantity)
        router.push(routes.checkout)
      }}
    >
      <Zap className="mr-2 h-4 w-4" />
      Buy Now
    </Button>
  )
}

import { NextRequest } from "next/server"
import { getProductBySlug, getRelatedProducts } from "@/lib/api/products"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const product = await getProductBySlug(slug)

    if (!product) {
      return errorResponse("Product not found", 404)
    }

    const related = await getRelatedProducts(product.id, product.categoryId)

    return successResponse({ product, related })
  } catch {
    return errorResponse("Failed to fetch product", 500)
  }
}

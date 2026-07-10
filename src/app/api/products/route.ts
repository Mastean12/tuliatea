import { NextRequest } from "next/server"
import { getProducts } from "@/lib/api/products"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const params = {
      search: searchParams.get("search") || undefined,
      category: searchParams.get("category") || undefined,
      minPrice: searchParams.get("minPrice")
        ? Number(searchParams.get("minPrice"))
        : undefined,
      maxPrice: searchParams.get("maxPrice")
        ? Number(searchParams.get("maxPrice"))
        : undefined,
      inStock: searchParams.get("inStock") === "true" || undefined,
      featured: searchParams.get("featured") === "true" || undefined,
      discounted: searchParams.get("discounted") === "true" || undefined,
      sort: searchParams.get("sort") || "newest",
      page: Number(searchParams.get("page")) || 1,
      pageSize: Math.min(Number(searchParams.get("pageSize")) || 12, 48),
    }

    const result = await getProducts(params)
    return successResponse(result)
  } catch {
    return errorResponse("Failed to fetch products", 500)
  }
}

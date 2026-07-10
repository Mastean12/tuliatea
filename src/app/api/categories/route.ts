import { getCategories } from "@/lib/api/products"
import { successResponse, errorResponse } from "@/lib/api-utils"

export async function GET() {
  try {
    const categories = await getCategories()
    return successResponse(categories)
  } catch {
    return errorResponse("Failed to fetch categories", 500)
  }
}

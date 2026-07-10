"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/current-user"
import { routes } from "@/config/routes"

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  sortOrder: z.string().optional(),
})

export type CategoryFormState = {
  success?: boolean
  error?: string
}

export async function createCategory(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  try {
    await requireAdmin()

    const parsed = categorySchema.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      sortOrder: formData.get("sortOrder"),
    })

    if (!parsed.success) return { error: parsed.error.issues[0].message }

    await prisma.category.create({
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        sortOrder: parsed.data.sortOrder ? parseInt(parsed.data.sortOrder) : 0,
      },
    })

    revalidatePath(routes.admin.categories)
    return { success: true }
  } catch (error) {
    const err = error as { code?: string; message?: string }
    if (err?.code === "P2002")
      return { error: "A category with this name or slug already exists" }
    return { error: err?.message || "Failed to create category" }
  }
}

export async function updateCategory(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  try {
    await requireAdmin()
    const id = formData.get("id") as string
    if (!id) return { error: "Category ID required" }

    const parsed = categorySchema.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      sortOrder: formData.get("sortOrder"),
    })

    if (!parsed.success) return { error: parsed.error.issues[0].message }

    await prisma.category.update({
      where: { id },
      data: {
        name: parsed.data.name,
        slug: parsed.data.slug,
        description: parsed.data.description || null,
        sortOrder: parsed.data.sortOrder ? parseInt(parsed.data.sortOrder) : 0,
      },
    })

    revalidatePath(routes.admin.categories)
    return { success: true }
  } catch (error) {
    const err = error as { code?: string; message?: string }
    if (err?.code === "P2002")
      return { error: "A category with this name or slug already exists" }
    return { error: err?.message || "Failed to update category" }
  }
}

export async function deleteCategory(
  prevState: CategoryFormState,
  formData: FormData
): Promise<CategoryFormState> {
  try {
    await requireAdmin()
    const id = formData.get("id") as string
    if (!id) return { error: "Category ID required" }

    const productCount = await prisma.product.count({
      where: { categoryId: id },
    })
    if (productCount > 0) {
      return {
        error: `Cannot delete category with ${productCount} product(s). Move them first.`,
      }
    }

    await prisma.category.delete({ where: { id } })
    revalidatePath(routes.admin.categories)
    return { success: true }
  } catch (error) {
    const err = error as { message?: string }
    return { error: err?.message || "Failed to delete category" }
  }
}

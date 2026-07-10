"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/current-user"
import { routes } from "@/config/routes"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  shortDesc: z.string().optional(),
  ingredients: z.string().optional(),
  benefits: z.string().optional(),
  brewingGuide: z.string().optional(),
  deliveryInfo: z.string().optional(),
  returnInfo: z.string().optional(),
  tags: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDesc: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  comparePrice: z.string().optional(),
  stock: z.string().optional(),
  lowStock: z.string().optional(),
  weight: z.string().optional(),
  servings: z.string().optional(),
  isFeatured: z.string().optional(),
  status: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
})

export type ProductFormState = {
  success?: boolean
  error?: string
}

export async function createProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    const admin = await requireAdmin()

    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      shortDesc: formData.get("shortDesc"),
      ingredients: formData.get("ingredients"),
      benefits: formData.get("benefits"),
      brewingGuide: formData.get("brewingGuide"),
      deliveryInfo: formData.get("deliveryInfo"),
      returnInfo: formData.get("returnInfo"),
      tags: formData.get("tags"),
      metaTitle: formData.get("metaTitle"),
      metaDesc: formData.get("metaDesc"),
      price: formData.get("price"),
      comparePrice: formData.get("comparePrice"),
      stock: formData.get("stock"),
      lowStock: formData.get("lowStock"),
      weight: formData.get("weight"),
      servings: formData.get("servings"),
      isFeatured: formData.get("isFeatured"),
      status: formData.get("status"),
      categoryId: formData.get("categoryId"),
    })

    if (!parsed.success) {
      return { error: parsed.error.issues[0].message }
    }

    const data = parsed.data

    await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc || null,
        ingredients: data.ingredients || null,
        benefits: data.benefits || null,
        brewingGuide: data.brewingGuide || null,
        deliveryInfo: data.deliveryInfo || null,
        returnInfo: data.returnInfo || null,
        tags: data.tags || null,
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
        price: parseFloat(data.price),
        comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
        stock: data.stock ? parseInt(data.stock) : 0,
        lowStock: data.lowStock ? parseInt(data.lowStock) : 5,
        weight: data.weight || null,
        servings: data.servings || null,
        isFeatured: data.isFeatured === "on",
        status: (data.status || "DRAFT") as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        categoryId: data.categoryId,
        createdBy: admin.id,
        updatedBy: admin.id,
      },
    })

    revalidatePath(routes.admin.products)
    return { success: true }
  } catch (error) {
    const err = error as { code?: string; message?: string }
    if (err?.code === "P2002")
      return { error: "A product with this slug already exists" }
    return { error: err?.message || "Failed to create product" }
  }
}

export async function updateProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    const admin = await requireAdmin()
    const id = formData.get("id") as string
    if (!id) return { error: "Product ID required" }

    const parsed = productSchema.safeParse({
      name: formData.get("name"),
      slug: formData.get("slug"),
      description: formData.get("description"),
      shortDesc: formData.get("shortDesc"),
      ingredients: formData.get("ingredients"),
      benefits: formData.get("benefits"),
      brewingGuide: formData.get("brewingGuide"),
      deliveryInfo: formData.get("deliveryInfo"),
      returnInfo: formData.get("returnInfo"),
      tags: formData.get("tags"),
      metaTitle: formData.get("metaTitle"),
      metaDesc: formData.get("metaDesc"),
      price: formData.get("price"),
      comparePrice: formData.get("comparePrice"),
      stock: formData.get("stock"),
      lowStock: formData.get("lowStock"),
      weight: formData.get("weight"),
      servings: formData.get("servings"),
      isFeatured: formData.get("isFeatured"),
      status: formData.get("status"),
      categoryId: formData.get("categoryId"),
    })

    if (!parsed.success) {
      return { error: parsed.error.issues[0].message }
    }

    const data = parsed.data

    await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDesc: data.shortDesc || null,
        ingredients: data.ingredients || null,
        benefits: data.benefits || null,
        brewingGuide: data.brewingGuide || null,
        deliveryInfo: data.deliveryInfo || null,
        returnInfo: data.returnInfo || null,
        tags: data.tags || null,
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
        price: parseFloat(data.price),
        comparePrice: data.comparePrice ? parseFloat(data.comparePrice) : null,
        stock: data.stock ? parseInt(data.stock) : 0,
        lowStock: data.lowStock ? parseInt(data.lowStock) : 5,
        weight: data.weight || null,
        servings: data.servings || null,
        isFeatured: data.isFeatured === "on",
        status: (data.status || "DRAFT") as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        categoryId: data.categoryId,
        updatedBy: admin.id,
      },
    })

    revalidatePath(routes.admin.products)
    return { success: true }
  } catch (error) {
    const err = error as { code?: string; message?: string }
    if (err?.code === "P2002")
      return { error: "A product with this slug already exists" }
    return { error: err?.message || "Failed to update product" }
  }
}

export async function deleteProduct(
  prevState: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  try {
    await requireAdmin()
    const id = formData.get("id") as string
    if (!id) return { error: "Product ID required" }

    await prisma.product.update({
      where: { id },
      data: { status: "ARCHIVED", isActive: false },
    })

    revalidatePath(routes.admin.products)
    return { success: true }
  } catch (error) {
    const err = error as { message?: string }
    return { error: err?.message || "Failed to delete product" }
  }
}

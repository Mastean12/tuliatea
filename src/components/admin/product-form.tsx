"use client"

import { useActionState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import {
  createProduct,
  updateProduct,
  type ProductFormState,
} from "@/lib/actions/admin/products"
import { slugify } from "@/lib/utils"
import { routes } from "@/config/routes"

type CategoryItem = { id: string; name: string }

export type AdminProductFormProduct = {
  id: string
  name: string
  slug: string
  description: string
  shortDesc: string | null
  ingredients: string | null
  benefits: string | null
  brewingGuide: string | null
  deliveryInfo: string | null
  returnInfo: string | null
  tags: string | null
  metaTitle: string | null
  metaDesc: string | null
  price: number
  comparePrice: number | null
  stock: number
  lowStock: number
  weight: string | null
  servings: string | null
  isFeatured: boolean
  status: string
  categoryId: string
  images: Array<{
    id: string
    url: string
    alt: string | null
    isPrimary: boolean
  }>
}

type AdminProductFormProps = {
  product?: AdminProductFormProduct
  categories: CategoryItem[]
}

export function AdminProductForm({
  product,
  categories,
}: AdminProductFormProps) {
  const router = useRouter()
  const isEdit = !!product
  const action = isEdit ? updateProduct : createProduct
  const [state, formAction, pending] = useActionState<
    ProductFormState,
    FormData
  >(action, {})

  const handleSlugify = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target
      const slugInput = document.getElementById("slug") as HTMLInputElement
      if (slugInput && !slugInput.dataset.manuallyEdited) {
        slugInput.value = slugify(input.value)
      }
    },
    []
  )

  if (state?.success) {
    router.push(routes.admin.products)
    return null
  }

  return (
    <div className="space-y-6">
      <Link
        href={routes.admin.products}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Products
      </Link>

      <h1 className="font-heading text-2xl font-semibold">
        {isEdit ? "Edit Product" : "Add Product"}
      </h1>

      <form action={formAction} className="space-y-8">
        {product && <input type="hidden" name="id" value={product.id} />}

        {state?.error && (
          <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {state.error}
          </div>
        )}

        {/* Basic Information */}
        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold">
            Basic Information
          </h2>

          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              name="name"
              required
              defaultValue={product?.name || ""}
              onChange={handleSlugify}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              name="slug"
              required
              defaultValue={product?.slug || ""}
              onChange={(e) => {
                e.target.dataset.manuallyEdited = "true"
              }}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category *</Label>
              <Select
                name="categoryId"
                defaultValue={product?.categoryId || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={product?.status || "DRAFT"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="shortDesc">Short Description</Label>
            <Textarea
              id="shortDesc"
              name="shortDesc"
              rows={2}
              defaultValue={product?.shortDesc || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Full Description *</Label>
            <Textarea
              id="description"
              name="description"
              required
              rows={5}
              defaultValue={product?.description || ""}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isFeatured"
              name="isFeatured"
              defaultChecked={product?.isFeatured || false}
            />
            <Label
              htmlFor="isFeatured"
              className="text-sm font-normal cursor-pointer"
            >
              Featured product
            </Label>
          </div>
        </Card>

        {/* Pricing */}
        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold">Pricing</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (KES) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                required
                defaultValue={product?.price || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="comparePrice">Compare Price (KES)</Label>
              <Input
                id="comparePrice"
                name="comparePrice"
                type="number"
                step="0.01"
                defaultValue={product?.comparePrice || ""}
              />
            </div>
          </div>
        </Card>

        {/* Inventory */}
        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold">Inventory</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                defaultValue={product?.stock || "0"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lowStock">Low Stock Threshold</Label>
              <Input
                id="lowStock"
                name="lowStock"
                type="number"
                defaultValue={product?.lowStock || "5"}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                name="weight"
                placeholder="e.g. 100g"
                defaultValue={product?.weight || ""}
              />
            </div>
          </div>
        </Card>

        {/* Details */}
        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold">Details</h2>
          <div className="space-y-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              rows={2}
              defaultValue={product?.ingredients || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea
              id="benefits"
              name="benefits"
              rows={2}
              defaultValue={product?.benefits || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="brewingGuide">Brewing Guide</Label>
            <Textarea
              id="brewingGuide"
              name="brewingGuide"
              rows={3}
              defaultValue={product?.brewingGuide || ""}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="deliveryInfo">Delivery Info</Label>
              <Textarea
                id="deliveryInfo"
                name="deliveryInfo"
                rows={2}
                defaultValue={product?.deliveryInfo || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="returnInfo">Return Info</Label>
              <Textarea
                id="returnInfo"
                name="returnInfo"
                rows={2}
                defaultValue={product?.returnInfo || ""}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              name="tags"
              placeholder="green-tea, wellness, organic"
              defaultValue={product?.tags || ""}
            />
          </div>
        </Card>

        {/* SEO */}
        <Card className="p-6 space-y-4">
          <h2 className="font-heading text-lg font-semibold">SEO</h2>
          <div className="space-y-2">
            <Label htmlFor="metaTitle">Meta Title</Label>
            <Input
              id="metaTitle"
              name="metaTitle"
              defaultValue={product?.metaTitle || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="metaDesc">Meta Description</Label>
            <Textarea
              id="metaDesc"
              name="metaDesc"
              rows={2}
              defaultValue={product?.metaDesc || ""}
            />
          </div>
        </Card>

        <div className="flex gap-3">
          <Button type="submit" disabled={pending} size="lg">
            {pending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : isEdit ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </Button>
          <Link href={routes.admin.products}>
            <Button type="button" variant="outline" size="lg">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}

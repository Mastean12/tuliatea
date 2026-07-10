"use client"

import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions/admin/categories"
import { slugify } from "@/lib/utils"
import { toast } from "sonner"

type CategoryRow = {
  id: string
  name: string
  slug: string
  description: string | null
  sortOrder: number
  _count: { products: number }
}

type AdminCategoryManagerProps = {
  categories: CategoryRow[]
}

export function AdminCategoryManager({
  categories: initial,
}: AdminCategoryManagerProps) {
  const [categories, _setCategories] = useState(initial)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [sortOrder, setSortOrder] = useState("0")
  const [manuallyEdited, setManuallyEdited] = useState(false)

  function resetForm() {
    setName("")
    setSlug("")
    setDescription("")
    setSortOrder("0")
    setEditId(null)
    setManuallyEdited(false)
  }

  function startEdit(cat: CategoryRow) {
    setEditId(cat.id)
    setName(cat.name)
    setSlug(cat.slug)
    setDescription(cat.description || "")
    setSortOrder(String(cat.sortOrder))
    setManuallyEdited(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    if (editId) fd.set("id", editId)
    fd.set("name", name)
    fd.set("slug", slug)
    fd.set("description", description)
    fd.set("sortOrder", sortOrder)

    const action = editId ? updateCategory : createCategory
    const res = await action({}, fd)

    if (res.success) {
      toast.success(editId ? "Category updated" : "Category created")
      resetForm()
      window.location.reload()
    } else {
      toast.error(res.error || "Failed to save")
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    const fd = new FormData()
    fd.set("id", deleteId)
    const res = await deleteCategory({}, fd)
    if (res.success) {
      toast.success("Category deleted")
      setDeleteId(null)
      window.location.reload()
    } else {
      toast.error(res.error || "Failed to delete")
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div>
        <Card className="p-5">
          <h2 className="font-heading mb-4 text-lg font-semibold">
            {editId ? "Edit Category" : "Add Category"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="catName">Name *</Label>
              <Input
                id="catName"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (!manuallyEdited) setSlug(slugify(e.target.value))
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catSlug">Slug *</Label>
              <Input
                id="catSlug"
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value)
                  setManuallyEdited(true)
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catDesc">Description</Label>
              <Input
                id="catDesc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="catOrder">Sort Order</Label>
              <Input
                id="catOrder"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit">{editId ? "Update" : "Create"}</Button>
              {editId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-3">
        {categories.map((cat) => (
          <Card
            key={cat.id}
            className="p-4 flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{cat.name}</p>
                <Badge variant="outline" className="text-[10px]">
                  {cat._count.products} products
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {cat.slug}
              </p>
            </div>
            <div className="flex gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => startEdit(cat)}
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => setDeleteId(cat.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Category"
        description="Are you sure? Categories with products cannot be deleted."
      />
    </div>
  )
}

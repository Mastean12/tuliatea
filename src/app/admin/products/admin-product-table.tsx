"use client"

import { useRouter } from "next/navigation"
import { Search, Edit, Trash2, Star, Eye } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { formatDate, formatPrice, cn } from "@/lib/utils"
import { deleteProduct } from "@/lib/actions/admin/products"
import { toast } from "sonner"
import { PlaceholderImage } from "@/components/ui/placeholder-image"

type ProductRow = {
  id: string
  name: string
  slug: string
  price: number
  comparePrice: number | null
  stock: number
  status: string
  isFeatured: boolean
  categoryName: string
  categoryId: string
  imageUrl: string | null
  createdAt: Date
}

type AdminProductTableProps = {
  products: ProductRow[]
  total: number
  page: number
  pageSize: number
  categories: Array<{ id: string; name: string }>
  searchParams: { search?: string; category?: string; status?: string }
}

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PUBLISHED: "bg-green-100 text-green-700",
  ARCHIVED: "bg-red-100 text-red-700",
}

export function AdminProductTable({
  products,
  total,
  page,
  pageSize,
  categories,
  searchParams,
}: AdminProductTableProps) {
  const router = useRouter()
  const [search, setSearch] = useState(searchParams.search || "")
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const totalPages = Math.ceil(total / pageSize)

  function applyParam(key: string, value: string) {
    const params = new URLSearchParams()
    if (searchParams.search) params.set("search", searchParams.search)
    if (searchParams.category) params.set("category", searchParams.category)
    if (searchParams.status) params.set("status", searchParams.status)
    if (value) params.set(key, value)
    if (key === "search" && !value && search) params.delete("search")
    if (key === "clear") {
      router.push("/admin/products")
      return
    }
    router.push(`/admin/products?${params.toString()}`)
  }

  function handleSearch() {
    applyParam("search", search)
  }

  async function handleDelete() {
    if (!deleteId) return
    const fd = new FormData()
    fd.set("id", deleteId)
    const res = await deleteProduct({}, fd)
    if (res.success) {
      toast.success("Product archived")
      setDeleteId(null)
      router.refresh()
    } else {
      toast.error(res.error || "Failed to delete")
    }
  }

  return (
    <div className="space-y-4">
      {/* Search + Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="max-w-xs"
          />
          <Button variant="outline" size="icon" onClick={handleSearch}>
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Select
          value={searchParams.category || "all"}
          onValueChange={(v) => v && applyParam("category", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.status || "all"}
          onValueChange={(v) => v && applyParam("status", v)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>

        {(searchParams.search ||
          searchParams.category ||
          searchParams.status) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearch("")
              applyParam("clear", "")
            }}
          >
            Clear
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="hidden md:table-cell">Stock</TableHead>
              <TableHead className="hidden lg:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Featured</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <PlaceholderImage
                    label={p.name}
                    className="h-10 w-10 rounded-lg"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-medium text-sm truncate max-w-[200px]">
                    {p.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(p.createdAt)}
                  </p>
                </TableCell>
                <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                  {p.categoryName}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <span className="font-medium tabular-nums">
                      {formatPrice(p.price)}
                    </span>
                    {p.comparePrice && (
                      <span className="text-xs text-muted-foreground line-through ml-1">
                        {formatPrice(p.comparePrice)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <span
                    className={cn(
                      "text-sm tabular-nums",
                      p.stock === 0 && "text-destructive font-medium"
                    )}
                  >
                    {p.stock}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge
                    variant="outline"
                    className={`text-[10px] px-1.5 py-0 ${statusColors[p.status] || ""}`}
                  >
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {p.isFeatured ? (
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ) : (
                    <span className="text-muted-foreground/40">—</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <a
                      href={`/products/${p.slug}`}
                      target="_blank"
                      rel="noopener"
                    >
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                    <a href={`/admin/products/${p.id}`}>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                    </a>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          {total} product{total !== 1 ? "s" : ""}
        </p>
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => applyParam("page", String(page - 1))}
            >
              Previous
            </Button>
            <span className="tabular-nums">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => applyParam("page", String(page + 1))}
            >
              Next
            </Button>
          </div>
        )}
      </div>

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Archive Product"
        description="This will archive the product. It can be restored later."
      />
    </div>
  )
}

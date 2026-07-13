"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductFilters } from "@/components/products/product-filters"
import { SortDropdown } from "@/components/products/sort-dropdown"
import { ProductGrid } from "@/components/products/product-grid"
import { Pagination } from "@/components/products/pagination"
import { useDebounce } from "@/hooks/use-debounce"
import { routes } from "@/config/routes"

type FilterCategory = {
  slug: string
  name: string
  _count: { products: number }
}
type ProductItem = {
  id: string
  name: string
  slug: string
  description: string
  price: number
  comparePrice: number | null
  weight: string | null
  stock: number
  isFeatured: boolean
  category: { name: string; slug: string }
  images: Array<{ url: string; alt: string | null }>
}

export function ProductsPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mounted = useRef(true)

  const [categories, setCategories] = useState<FilterCategory[]>([])
  const [products, setProducts] = useState<ProductItem[]>([])
  const [total, setTotal] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [filterOpen, setFilterOpen] = useState(false)

  const [search, setSearch] = useState(searchParams.get("search") || "")
  const [sort, setSort] = useState(searchParams.get("sort") || "newest")
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || undefined
  )
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [inStock, setInStock] = useState(searchParams.get("inStock") === "true")
  const [featured, setFeatured] = useState(
    searchParams.get("featured") === "true"
  )
  const [discounted, setDiscounted] = useState(
    searchParams.get("discounted") === "true"
  )

  const debouncedSearch = useDebounce(search, 300)
  const hasActiveFilters = !!(
    selectedCategory ||
    minPrice ||
    maxPrice ||
    inStock ||
    featured ||
    discounted ||
    search
  )

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${routes.api.categories}`)
        const json = await res.json()
        if (json.success && json.data && mounted.current)
          setCategories(json.data)
      } catch {
        /* ignore */
      }
    }
    load()
  }, [])

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      try {
        const params = new URLSearchParams()
        if (debouncedSearch) params.set("search", debouncedSearch)
        if (selectedCategory) params.set("category", selectedCategory)
        if (minPrice) params.set("minPrice", minPrice)
        if (maxPrice) params.set("maxPrice", maxPrice)
        if (inStock) params.set("inStock", "true")
        if (featured) params.set("featured", "true")
        if (discounted) params.set("discounted", "true")
        if (sort !== "newest") params.set("sort", sort)
        params.set("page", String(page))
        params.set("pageSize", "12")
        const res = await fetch(`${routes.api.products}?${params.toString()}`)
        const json = await res.json()
        if (json.success && json.data && mounted.current) {
          setProducts(json.data.items)
          setTotal(json.data.total)
          setTotalPages(json.data.totalPages)
        }
      } catch {
        if (mounted.current) {
          setProducts([])
          setTotal(0)
        }
      } finally {
        if (mounted.current) setIsLoading(false)
      }
    }
    load()
  }, [
    debouncedSearch,
    selectedCategory,
    minPrice,
    maxPrice,
    inStock,
    featured,
    discounted,
    sort,
    page,
  ])

  useEffect(() => {
    const params = new URLSearchParams()
    if (search) params.set("search", search)
    if (sort !== "newest") params.set("sort", sort)
    if (page > 1) params.set("page", String(page))
    if (selectedCategory) params.set("category", selectedCategory)
    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (inStock) params.set("inStock", "true")
    if (featured) params.set("featured", "true")
    if (discounted) params.set("discounted", "true")
    const qs = params.toString()
    router.replace(`/products${qs ? `?${qs}` : ""}`, { scroll: false })
  }, [
    search,
    sort,
    page,
    selectedCategory,
    minPrice,
    maxPrice,
    inStock,
    featured,
    discounted,
    router,
  ])

  function handleClear() {
    setSearch("")
    setSelectedCategory(undefined)
    setMinPrice("")
    setMaxPrice("")
    setInStock(false)
    setFeatured(false)
    setDiscounted(false)
    setPage(1)
    setSort("newest")
  }

  const filterProps = {
    categories,
    selectedCategory,
    minPrice,
    maxPrice,
    inStock,
    featured,
    discounted,
    searchQuery: search,
    onSearchChange: (v: string) => {
      setSearch(v)
      setPage(1)
    },
    onCategoryChange: (s: string | undefined) => {
      setSelectedCategory(s)
      setPage(1)
    },
    onMinPriceChange: setMinPrice,
    onMaxPriceChange: setMaxPrice,
    onInStockChange: (v: boolean) => {
      setInStock(v)
      setPage(1)
    },
    onFeaturedChange: (v: boolean) => {
      setFeatured(v)
      setPage(1)
    },
    onDiscountedChange: (v: boolean) => {
      setDiscounted(v)
      setPage(1)
    },
    onClear: handleClear,
    hasActiveFilters,
  }

  return (
    <div className="flex flex-col lg:flex-row lg:gap-8">
      {/* Mobile filter toggle (visible only on small screens, outside sidebar) */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setFilterOpen(!filterOpen)}
          className="gap-2 text-xs h-9"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-0.5 h-4 w-4 rounded-full p-0 text-[8px]"
            >
              !
            </Badge>
          )}
        </Button>
        <div className="flex items-center gap-3">
          <p className="text-xs text-muted-foreground/50 tabular-nums">
            {total} product{total !== 1 ? "s" : ""}
          </p>
          <SortDropdown
            value={sort}
            onChange={(v) => {
              setSort(v)
              setPage(1)
            }}
            total={total}
          />
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40"
            onClick={() => setFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-background p-6 overflow-y-auto shadow-xl animate-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setFilterOpen(false)}
                className="text-muted-foreground/50 hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {categories.length > 0 && <ProductFilters {...filterProps} />}
          </div>
        </div>
      )}

      {/* Sidebar — desktop */}
      <aside className="hidden lg:block w-[260px] shrink-0">
        <div className="sticky top-24">
          {categories.length > 0 && <ProductFilters {...filterProps} />}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Desktop toolbar */}
        <div className="hidden lg:flex items-center justify-between mb-6">
          <p className="text-xs text-muted-foreground/50 tabular-nums">
            {total} product{total !== 1 ? "s" : ""}
          </p>
          <SortDropdown
            value={sort}
            onChange={(v) => {
              setSort(v)
              setPage(1)
            }}
            total={total}
          />
        </div>

        <ProductGrid
          products={products}
          isLoading={isLoading}
          onClearFilters={handleClear}
        />
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type FilterCategory = {
  slug: string
  name: string
  _count: { products: number }
}

type ProductFiltersProps = {
  categories: FilterCategory[]
  selectedCategory?: string
  minPrice: string
  maxPrice: string
  inStock: boolean
  featured: boolean
  discounted: boolean
  onCategoryChange: (slug: string | undefined) => void
  onMinPriceChange: (value: string) => void
  onMaxPriceChange: (value: string) => void
  onInStockChange: (value: boolean) => void
  onFeaturedChange: (value: boolean) => void
  onDiscountedChange: (value: boolean) => void
  onClear: () => void
  isOpen: boolean
  onToggle: () => void
  hasActiveFilters: boolean
}

export function ProductFilters({
  categories,
  selectedCategory,
  minPrice,
  maxPrice,
  inStock,
  featured,
  discounted,
  onCategoryChange,
  onMinPriceChange,
  onMaxPriceChange,
  onInStockChange,
  onFeaturedChange,
  onDiscountedChange,
  onClear,
  isOpen,
  onToggle,
  hasActiveFilters,
}: ProductFiltersProps) {
  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h4 className="mb-3 text-sm font-semibold">Category</h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={cn(
              "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
              !selectedCategory
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                selectedCategory === cat.slug
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <span className="flex items-center justify-between">
                {cat.name}
                <span className="text-xs text-muted-foreground">
                  ({cat._count.products})
                </span>
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h4 className="mb-3 text-sm font-semibold">Price Range (KES)</h4>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="h-9"
            aria-label="Minimum price"
          />
          <span className="text-muted-foreground">—</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="h-9"
            aria-label="Maximum price"
          />
        </div>
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="filter-in-stock"
            checked={inStock}
            onCheckedChange={(v) => onInStockChange(v === true)}
          />
          <Label
            htmlFor="filter-in-stock"
            className="text-sm font-normal cursor-pointer"
          >
            In Stock Only
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="filter-featured"
            checked={featured}
            onCheckedChange={(v) => onFeaturedChange(v === true)}
          />
          <Label
            htmlFor="filter-featured"
            className="text-sm font-normal cursor-pointer"
          >
            Featured Products
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="filter-discounted"
            checked={discounted}
            onCheckedChange={(v) => onDiscountedChange(v === true)}
          />
          <Label
            htmlFor="filter-discounted"
            className="text-sm font-normal cursor-pointer"
          >
            On Sale
          </Label>
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          size="sm"
          onClick={onToggle}
          className="relative"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-1 h-5 w-5 rounded-full p-0 text-[10px]"
            >
              !
            </Badge>
          )}
        </Button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden lg:hidden"
          >
            <div className="border rounded-xl bg-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {filterContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="rounded-xl border bg-card p-5">{filterContent}</div>
      </div>
    </>
  )
}

"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
        <h4 className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Category
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border",
              !selectedCategory
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-200 border",
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground border-border hover:border-primary/30 hover:text-foreground"
              )}
            >
              {cat.name}
              <span className="ml-1 opacity-60">({cat._count.products})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/60" />

      {/* Price range */}
      <div>
        <h4 className="mb-3.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/70">
          Price Range (KES)
        </h4>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/50">
              KES
            </span>
            <Input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => onMinPriceChange(e.target.value)}
              className="h-9 pl-9 text-sm"
              aria-label="Minimum price"
            />
          </div>
          <span className="text-muted-foreground/30 text-xs">—</span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground/50">
              KES
            </span>
            <Input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => onMaxPriceChange(e.target.value)}
              className="h-9 pl-9 text-sm"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      <div className="h-px bg-border/60" />

      {/* Toggle filters */}
      <div className="space-y-3.5">
        {(
          [
            {
              id: "filter-in-stock",
              label: "In Stock Only",
              value: inStock,
              onChange: onInStockChange,
            },
            {
              id: "filter-featured",
              label: "Featured Products",
              value: featured,
              onChange: onFeaturedChange,
            },
            {
              id: "filter-discounted",
              label: "On Sale",
              value: discounted,
              onChange: onDiscountedChange,
            },
          ] as const
        ).map(({ id, label, value, onChange }) => (
          <label
            key={id}
            htmlFor={id}
            className="flex items-center justify-between cursor-pointer group"
          >
            <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              {label}
            </span>
            <button
              id={id}
              role="switch"
              aria-checked={value}
              onClick={() => onChange(!value)}
              className={cn(
                "relative h-5 w-9 rounded-full transition-all duration-200",
                value ? "bg-primary" : "bg-input"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all duration-200",
                  value ? "translate-x-4" : "translate-x-0"
                )}
              />
            </button>
          </label>
        ))}
      </div>

      <div className="h-px bg-border/60" />

      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={onClear}
          className="w-full gap-1.5 text-xs h-9"
        >
          <RotateCcw className="h-3 w-3" />
          Reset Filters
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
          className="relative gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="ml-0.5 h-5 w-5 rounded-full p-0 text-[10px]"
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
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-sm font-semibold">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  className="h-7 w-7"
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
        <div className="rounded-2xl bg-card p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border">
          {filterContent}
        </div>
      </div>
    </>
  )
}

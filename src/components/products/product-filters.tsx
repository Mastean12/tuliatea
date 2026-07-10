"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, X, RotateCcw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type FilterCategory = {
  slug: string
  name: string
  _count: { products: number }
}

const PRICE_PRESETS = [
  { label: "Any Price", min: "", max: "" },
  { label: "Under KES 1,000", min: "", max: "1000" },
  { label: "KES 1,000 - 2,000", min: "1000", max: "2000" },
  { label: "KES 2,000 - 3,000", min: "2000", max: "3000" },
  { label: "Over KES 3,000", min: "3000", max: "" },
]

type ProductFiltersProps = {
  categories: FilterCategory[]
  selectedCategory?: string
  minPrice: string
  maxPrice: string
  inStock: boolean
  featured: boolean
  discounted: boolean
  searchQuery: string
  onSearchChange: (value: string) => void
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
  searchQuery,
  onSearchChange,
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
      {/* Search */}
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground/40" />
        <Input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search teas..."
          className="h-9 pl-9 pr-8 text-xs rounded-lg border-border/60 bg-muted/30 placeholder:text-muted-foreground/40"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>

      <div className="h-px bg-border/50" />

      {/* Categories */}
      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Category
        </h4>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => onCategoryChange(undefined)}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-medium transition-all border",
              !selectedCategory
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => onCategoryChange(cat.slug)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-medium transition-all border",
                selectedCategory === cat.slug
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-border/50" />

      {/* Price range */}
      <div>
        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/50">
          Price Range
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {PRICE_PRESETS.map((preset) => {
            const isActive =
              (preset.min === minPrice && preset.max === maxPrice) ||
              (preset.min === "" &&
                preset.max === "" &&
                minPrice === "" &&
                maxPrice === "")
            return (
              <button
                key={preset.label}
                onClick={() => {
                  onMinPriceChange(preset.min)
                  onMaxPriceChange(preset.max)
                }}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium transition-all border",
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                )}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="h-px bg-border/50" />

      {/* Toggle filters */}
      <div className="space-y-3">
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
              label: "Featured",
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
            className="flex items-center justify-between cursor-pointer group"
          >
            <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
              {label}
            </span>
            <button
              role="switch"
              aria-checked={value}
              onClick={() => onChange(!value)}
              className={cn(
                "relative h-4 w-7 rounded-full transition-all duration-200 shrink-0",
                value ? "bg-primary" : "bg-input"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 left-0.5 h-3 w-3 rounded-full bg-white shadow-sm transition-all duration-200",
                  value ? "translate-x-3" : "translate-x-0"
                )}
              />
            </button>
          </label>
        ))}
      </div>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-foreground transition-colors pt-1"
        >
          <RotateCcw className="h-3 w-3" />
          Clear Filters
        </button>
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
          className="relative gap-2 text-xs h-9"
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
            <div className="rounded-xl border bg-card p-5 shadow-sm mb-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-heading text-sm font-semibold">Filters</h3>
                <button
                  onClick={onToggle}
                  className="text-muted-foreground/50 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              {filterContent}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="rounded-xl bg-card p-5 border shadow-sm">
          {filterContent}
        </div>
      </div>
    </>
  )
}

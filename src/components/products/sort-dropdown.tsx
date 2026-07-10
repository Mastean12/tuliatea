"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
  { value: "featured", label: "Featured" },
]

type SortDropdownProps = {
  value: string
  onChange: (value: string) => void
  total: number
}

export function SortDropdown({ value, onChange, total }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <p className="hidden text-sm text-muted-foreground sm:block">
        {total} product{total !== 1 ? "s" : ""}
      </p>
      <Select value={value} onValueChange={(v) => v && onChange(v)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

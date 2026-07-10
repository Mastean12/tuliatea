"use client"

import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </Button>
      <div className="flex h-9 w-14 items-center justify-center rounded-lg border bg-background text-sm font-medium tabular-nums">
        {value}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}

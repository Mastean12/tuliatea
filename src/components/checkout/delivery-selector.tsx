"use client"

import { formatPrice } from "@/lib/utils"
import { Truck, Zap, Store } from "lucide-react"
import { cn } from "@/lib/utils"
import { DEFAULT_DELIVERY_OPTIONS } from "@/services/delivery"

const iconMap: Record<string, React.ReactNode> = {
  standard: <Truck className="h-5 w-5" />,
  express: <Zap className="h-5 w-5" />,
  pickup: <Store className="h-5 w-5" />,
}

type DeliverySelectorProps = {
  selected: string
  onChange: (slug: string) => void
}

export function DeliverySelector({
  selected,
  onChange,
}: DeliverySelectorProps) {
  return (
    <div className="space-y-3">
      {DEFAULT_DELIVERY_OPTIONS.map((option) => (
        <button
          key={option.slug}
          type="button"
          onClick={() => onChange(option.slug)}
          className={cn(
            "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all",
            selected === option.slug
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : "hover:border-muted-foreground/25"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              selected === option.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {iconMap[option.slug] || <Truck className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <p className="font-medium text-sm">{option.name}</p>
              <span className="font-semibold text-sm whitespace-nowrap">
                {option.price === 0 ? "Free" : formatPrice(option.price)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {option.description}
            </p>
            <p className="text-xs text-muted-foreground/70 mt-0.5">
              Estimated: {option.estimatedDays}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

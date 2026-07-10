"use client"

import { Banknote, Smartphone, Building, CreditCard } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { PAYMENT_METHODS } from "@/services/payment"

const iconMap: Record<string, React.ReactNode> = {
  banknote: <Banknote className="h-5 w-5" />,
  smartphone: <Smartphone className="h-5 w-5" />,
  building: <Building className="h-5 w-5" />,
  "credit-card": <CreditCard className="h-5 w-5" />,
}

type PaymentSelectorProps = {
  selected: string
  onChange: (slug: string) => void
}

export function PaymentSelector({ selected, onChange }: PaymentSelectorProps) {
  return (
    <div className="space-y-3">
      {PAYMENT_METHODS.map((method) => (
        <button
          key={method.slug}
          type="button"
          onClick={() => !method.isComingSoon && onChange(method.slug)}
          disabled={method.isComingSoon}
          className={cn(
            "flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-all",
            selected === method.slug
              ? "border-primary bg-primary/5 ring-1 ring-primary"
              : method.isComingSoon
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-muted-foreground/25"
          )}
        >
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
              selected === method.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {iconMap[method.icon] || <CreditCard className="h-5 w-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium text-sm">{method.name}</p>
              {method.isComingSoon && (
                <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                  Coming Soon
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {method.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  )
}

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

const statusSteps = [
  { key: "PENDING", label: "Order Placed" },
  { key: "CONFIRMED", label: "Confirmed" },
  { key: "PROCESSING", label: "Processing" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Delivered" },
]

type OrderTimelineProps = {
  status: string
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentIndex = statusSteps.findIndex((s) => s.key === status)
  const isCancelled = status === "CANCELLED"

  if (isCancelled) {
    return (
      <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
        This order has been cancelled.
      </div>
    )
  }

  return (
    <ol className="space-y-4">
      {statusSteps.map((step, i) => {
        const isCompleted = i <= currentIndex
        const isCurrent = i === currentIndex

        return (
          <li key={step.key} className="flex items-start gap-3">
            <div
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                isCompleted
                  ? "bg-primary text-primary-foreground"
                  : "border bg-muted text-muted-foreground"
              )}
            >
              {isCompleted ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <div className="pt-0.5">
              <p
                className={cn(
                  "text-sm font-medium",
                  isCurrent && "text-foreground",
                  isCompleted && "text-primary",
                  !isCompleted && "text-muted-foreground"
                )}
              >
                {step.label}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

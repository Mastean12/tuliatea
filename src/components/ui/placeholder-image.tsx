import { cn } from "@/lib/utils"
import { Leaf } from "lucide-react"

type PlaceholderImageProps = {
  label?: string
  className?: string
  variant?: "product" | "hero" | "avatar"
}

const variantStyles = {
  product: "h-64",
  hero: "h-[70vh]",
  avatar: "h-12 w-12 rounded-full",
}

export function PlaceholderImage({
  label,
  className,
  variant = "product",
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/20",
        variantStyles[variant],
        className
      )}
      role="img"
      aria-label={label || "Placeholder image"}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground/40">
        <Leaf className="h-12 w-12" />
        {label && <span className="text-xs font-medium">{label}</span>}
      </div>
    </div>
  )
}

import { cn } from "@/lib/utils"
import { Leaf } from "lucide-react"

type PlaceholderImageProps = {
  label?: string
  className?: string
  variant?: "product" | "hero" | "avatar"
  seed?: string
}

const variantStyles = {
  product: "aspect-[4/3]",
  hero: "h-[70vh]",
  avatar: "h-12 w-12 rounded-full",
}

function hashColor(seed: string): { from: string; via: string; to: string } {
  const palettes = [
    { from: "from-primary/30", via: "via-accent/15", to: "to-secondary/25" },
    { from: "from-primary/25", via: "via-secondary/15", to: "to-warm/20" },
    { from: "from-accent/20", via: "via-primary/10", to: "to-warm/15" },
    { from: "from-secondary/25", via: "via-primary/15", to: "to-accent/20" },
    { from: "from-warm/20", via: "via-accent/10", to: "to-primary/20" },
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i++)
    hash = (hash << 5) - hash + seed.charCodeAt(i)
  return palettes[Math.abs(hash) % palettes.length]
}

export function PlaceholderImage({
  label,
  className,
  variant = "product",
  seed,
}: PlaceholderImageProps) {
  const colors = hashColor(seed || label || "default")

  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gradient-to-br",
        colors.from,
        colors.via,
        colors.to,
        variantStyles[variant],
        className
      )}
      role="img"
      aria-label={label || "Placeholder image"}
    >
      <div className="flex flex-col items-center gap-2 text-white/35">
        <Leaf className="h-12 w-12" />
        {label && (
          <span className="text-xs font-medium text-white/50">{label}</span>
        )}
      </div>
    </div>
  )
}

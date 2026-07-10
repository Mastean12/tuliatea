import { cn } from "@/lib/utils"
import { Leaf } from "lucide-react"

type PlaceholderImageProps = {
  label?: string
  className?: string
  variant?: "product" | "hero" | "avatar"
  seed?: string
}

const variantStyles = {
  product: "h-64",
  hero: "h-[70vh]",
  avatar: "h-12 w-12 rounded-full",
}

function hashColor(seed: string): { from: string; via: string; to: string } {
  const palettes = [
    {
      from: "from-emerald-800/40",
      via: "via-emerald-700/20",
      to: "to-amber-800/30",
    },
    { from: "from-green-900/40", via: "via-teal-700/20", to: "to-lime-800/30" },
    { from: "from-primary/30", via: "via-primary/15", to: "to-accent/25" },
    {
      from: "from-emerald-700/40",
      via: "via-green-600/20",
      to: "to-yellow-700/30",
    },
    {
      from: "from-teal-800/35",
      via: "via-green-700/15",
      to: "to-amber-700/25",
    },
  ]
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
  }
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
      <div className="flex flex-col items-center gap-2 text-white/30">
        <Leaf className="h-12 w-12" />
        {label && (
          <span className="text-xs font-medium text-white/50">{label}</span>
        )}
      </div>
    </div>
  )
}

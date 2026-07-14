import { cn } from "@/lib/utils"

type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 space-y-2",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-muted-foreground">{subtitle}</p>
      )}
    </div>
  )
}

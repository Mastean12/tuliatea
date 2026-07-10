import { cn } from "@/lib/utils"
import { Skeleton } from "./skeleton"

type SkeletonCardProps = {
  className?: string
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn("space-y-3 rounded-lg border p-4", className)}>
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-4 w-1/4" />
    </div>
  )
}

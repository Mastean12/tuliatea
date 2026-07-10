import { Package } from "lucide-react"
import { EmptyState } from "@/components/ui/empty-state"

export function EmptyProducts() {
  return (
    <div className="col-span-full">
      <EmptyState
        icon={<Package className="h-8 w-8 text-muted-foreground" />}
        title="No products found"
        description="Try adjusting your search or filter criteria."
      />
    </div>
  )
}

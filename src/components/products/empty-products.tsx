import { SearchX } from "lucide-react"

type EmptyProductsProps = {
  onClear?: () => void
}

export function EmptyProducts({ onClear }: EmptyProductsProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-muted/50">
        <SearchX className="h-7 w-7 text-muted-foreground/40" />
      </div>
      <h3 className="font-heading text-lg font-medium text-foreground">
        No products found
      </h3>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground/70 leading-relaxed">
        {`Try adjusting your search or filter criteria to find what you're`}
        looking for.
      </p>
      {onClear && (
        <button
          onClick={onClear}
          className="mt-5 text-sm font-medium text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}

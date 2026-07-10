export function LoadingProducts() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card overflow-hidden">
          <div className="aspect-[4/3] bg-muted/40 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-16 bg-muted/60 rounded-full animate-pulse" />
            <div className="h-4 w-3/4 bg-muted/60 rounded-full animate-pulse" />
            <div className="h-3 w-full bg-muted/40 rounded-full animate-pulse" />
            <div className="h-3 w-1/2 bg-muted/40 rounded-full animate-pulse" />
            <div className="flex items-center justify-between pt-1">
              <div className="h-4 w-16 bg-muted/60 rounded-full animate-pulse" />
              <div className="h-3 w-14 bg-muted/40 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

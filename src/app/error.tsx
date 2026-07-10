"use client"

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h2 className="font-heading text-4xl font-semibold">
        Something went wrong
      </h2>
      <p className="max-w-md text-muted-foreground">
        An unexpected error occurred. Please try again later.
      </p>
      <button
        onClick={reset}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Try again
      </button>
    </div>
  )
}

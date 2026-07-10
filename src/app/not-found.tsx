import Link from "next/link"
import { routes } from "@/config/routes"

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-heading text-7xl font-semibold tracking-tight">
        404
      </h1>
      <div className="space-y-2">
        <h2 className="font-heading text-2xl font-medium">Page not found</h2>
        <p className="text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link
        href={routes.home}
        className="inline-flex h-10 items-center justify-center rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Back to home
      </Link>
    </div>
  )
}

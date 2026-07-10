import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="font-heading text-5xl font-semibold tracking-tight">
          Welcome to Tullia Tea
        </h1>
        <p className="max-w-lg text-lg text-muted-foreground">
          Premium Kenyan wellness teas crafted for your daily ritual.
        </p>
        <Link
          href="/products"
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-8 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Shop Now
        </Link>
      </section>
    </div>
  )
}

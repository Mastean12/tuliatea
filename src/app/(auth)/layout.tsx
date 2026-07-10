import { Container } from "@/components/ui/container"
import { Leaf } from "lucide-react"
import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-center border-b py-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-xl font-semibold"
        >
          <Leaf className="h-5 w-5 text-primary" />
          Tullia Tea
        </Link>
      </div>
      <Container className="flex flex-1 items-center justify-center py-12">
        <div className="w-full max-w-md">{children}</div>
      </Container>
    </div>
  )
}

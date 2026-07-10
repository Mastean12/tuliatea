import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { Package } from "lucide-react"
import { getCurrentUser } from "@/lib/current-user"
import { routes } from "@/config/routes"

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your Tullia Tea order history.",
  openGraph: { title: `My Orders | ${siteConfig.name}` },
}

export default async function OrdersPage() {
  const user = await getCurrentUser()
  if (!user) redirect(routes.auth.login)

  return (
    <Container className="py-8 sm:py-12">
      <PageHeader title="My Orders" description="View your order history" />
      <EmptyState
        icon={<Package className="h-8 w-8" />}
        title="No orders yet"
        description="When you place an order, it will appear here."
      />
    </Container>
  )
}

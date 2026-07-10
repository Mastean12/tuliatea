import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { MapPin } from "lucide-react"
import { getCurrentUser } from "@/lib/current-user"
import { routes } from "@/config/routes"

export const metadata: Metadata = {
  title: "My Addresses",
  description: "Manage your Tullia Tea shipping addresses.",
  openGraph: { title: `My Addresses | ${siteConfig.name}` },
}

export default async function AddressesPage() {
  const user = await getCurrentUser()
  if (!user) redirect(routes.auth.login)

  return (
    <Container className="py-8 sm:py-12">
      <PageHeader
        title="My Addresses"
        description="Manage your shipping addresses"
      />
      <EmptyState
        icon={<MapPin className="h-8 w-8" />}
        title="No addresses saved"
        description="Save your shipping addresses for faster checkout."
      />
    </Container>
  )
}

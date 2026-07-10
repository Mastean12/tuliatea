import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { siteConfig } from "@/config/site"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/auth/profile-form"
import { PasswordForm } from "@/components/auth/password-form"
import { getCurrentUser } from "@/lib/current-user"
import { routes } from "@/config/routes"
import { Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your Tullia Tea account profile and settings.",
  openGraph: { title: `My Account | ${siteConfig.name}` },
}

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user || !user.id) {
    redirect(routes.auth.login)
  }

  return (
    <Container className="py-8 sm:py-12">
      <PageHeader
        title="My Account"
        description="Manage your profile and account settings"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile summary */}
        <div>
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <span className="font-heading text-xl font-semibold text-primary">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="font-heading text-lg font-semibold">
                {user.name}
              </h2>
              <p className="text-sm capitalize text-muted-foreground">
                {(user.role || "CUSTOMER").toLowerCase()}
              </p>
              <Separator className="my-4" />
              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </div>
              </div>
            </div>
          </Card>

          <Card className="mt-4 p-4">
            <nav className="space-y-1 text-sm">
              <a
                href={routes.account.root}
                className="block rounded-lg bg-primary/10 px-3 py-2 font-medium text-primary"
              >
                Profile
              </a>
              <a
                href={routes.account.orders}
                className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                Orders
              </a>
              <a
                href={routes.account.addresses}
                className="block rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
              >
                Addresses
              </a>
            </nav>
          </Card>
        </div>

        {/* Profile forms */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <h3 className="font-heading mb-1 text-lg font-semibold">
              Profile Information
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Update your personal details
            </p>
            <ProfileForm
              userId={user.id}
              firstName={null}
              lastName={null}
              phone={null}
            />
          </Card>

          <Card className="p-6">
            <h3 className="font-heading mb-1 text-lg font-semibold">
              Change Password
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Update your account password
            </p>
            <PasswordForm userId={user.id} />
          </Card>
        </div>
      </div>
    </Container>
  )
}

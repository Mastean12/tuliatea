import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { PasswordForm } from "@/components/auth/password-form"
import { getCurrentUser } from "@/lib/current-user"
import { routes } from "@/config/routes"

export const metadata: Metadata = {
  title: "Change Password",
  robots: { index: false, follow: false },
}

export default async function PasswordPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  return (
    <div className="space-y-8">
      <PageHeader
        title="Change Password"
        description="Update your account password"
      />

      <div className="max-w-lg">
        <Card className="p-6">
          <PasswordForm userId={user.id} />
        </Card>
      </div>
    </div>
  )
}

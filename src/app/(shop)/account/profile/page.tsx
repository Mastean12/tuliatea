import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/auth/profile-form"
import { getCurrentUser } from "@/lib/current-user"
import { prisma } from "@/lib/prisma"
import { routes } from "@/config/routes"
import { Mail, CalendarDays } from "lucide-react"
import { formatDate } from "@/lib/utils"

export const metadata: Metadata = {
  title: "My Profile",
  robots: { index: false, follow: false },
}

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { firstName: true, lastName: true, phone: true, createdAt: true },
  })

  return (
    <div className="space-y-8">
      <PageHeader
        title="My Profile"
        description="Manage your personal information"
      />

      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <span className="font-heading text-2xl font-semibold text-primary">
                  {(user.name || "U").charAt(0).toUpperCase()}
                </span>
              </div>
              <h2 className="font-heading text-lg font-semibold">
                {user.name}
              </h2>
              <Separator className="my-4" />
              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                {dbUser?.createdAt && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="h-4 w-4 shrink-0" />
                    <span>Joined {formatDate(dbUser.createdAt)}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="font-heading mb-1 text-lg font-semibold">
              Personal Information
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Update your name and contact details
            </p>
            <ProfileForm
              userId={user.id}
              firstName={dbUser?.firstName || null}
              lastName={dbUser?.lastName || null}
              phone={dbUser?.phone || null}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}

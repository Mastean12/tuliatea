import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { Container } from "@/components/ui/container"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { routes } from "@/config/routes"

export default async function AccountDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) redirect(routes.auth.login)
  if (session.user.role !== "CUSTOMER") redirect(routes.admin.root)

  return (
    <Container className="py-8 sm:py-12">
      <div className="flex gap-8">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 pt-12 lg:pt-0">{children}</main>
      </div>
    </Container>
  )
}

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
    <>
      <DashboardSidebar />
      <div className="lg:pl-64 pt-16">
        <Container className="py-4 sm:py-6">{children}</Container>
      </div>
    </>
  )
}

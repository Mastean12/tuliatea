import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/sidebar"
import { routes } from "@/config/routes"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) redirect("/admin/login")
  if (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN") {
    redirect(routes.home)
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-x-auto bg-muted/20 p-6 sm:p-8 lg:ml-64">
        {children}
      </main>
    </div>
  )
}

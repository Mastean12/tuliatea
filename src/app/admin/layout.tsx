import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-x-auto bg-muted/20 p-6 sm:p-8 lg:ml-64">
        {children}
      </main>
    </div>
  )
}

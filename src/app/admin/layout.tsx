import { AdminSidebar } from "@/components/admin/sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="bg-muted/20 p-6 sm:p-8 min-h-screen">{children}</main>
      </div>
    </>
  )
}

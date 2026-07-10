import { Container } from "@/components/ui/container"
import { DashboardSidebar } from "@/components/dashboard/sidebar"

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container className="py-8 sm:py-12">
      <div className="flex gap-8">
        <DashboardSidebar />
        <main className="flex-1 min-w-0 pt-12 lg:pt-0">{children}</main>
      </div>
    </Container>
  )
}

export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { AdminOrdersTable } from "./admin-orders-table"

type Props = {
  searchParams: Promise<{ search?: string; status?: string; page?: string }>
}

export default async function AdminOrdersPage({ searchParams }: Props) {
  const sp = await searchParams
  const page = Number(sp.page) || 1
  const pageSize = 20

  const where: Record<string, unknown> = {}
  if (sp.search) {
    where.OR = [
      { orderNumber: { contains: sp.search, mode: "insensitive" as const } },
      { email: { contains: sp.search, mode: "insensitive" as const } },
    ]
  }
  if (sp.status && sp.status !== "all") where.status = sp.status

  const [orders, total, statusCounts] = await Promise.all([
    prisma.order.findMany({
      where,
      include: { shippingAddress: true, items: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.order.count({ where }),
    Promise.all([
      prisma.order.count({ where: { status: "PENDING" } }),
      prisma.order.count({ where: { status: "CONFIRMED" } }),
      prisma.order.count({ where: { status: "PROCESSING" } }),
      prisma.order.count({ where: { status: "SHIPPED" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
      prisma.order.count({ where: { status: "CANCELLED" } }),
    ]),
  ])

  const counts = {
    PENDING: statusCounts[0],
    CONFIRMED: statusCounts[1],
    PROCESSING: statusCounts[2],
    SHIPPED: statusCounts[3],
    DELIVERED: statusCounts[4],
    CANCELLED: statusCounts[5],
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description={`${total} total orders`} />
      <AdminOrdersTable
        orders={JSON.parse(JSON.stringify(orders))}
        total={total}
        page={page}
        pageSize={pageSize}
        statusCounts={counts}
        currentStatus={sp.status}
        currentSearch={sp.search}
      />
    </div>
  )
}

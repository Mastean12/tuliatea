"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Search, Eye, MessageCircle, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate, formatPrice } from "@/lib/utils"

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  PROCESSING: "bg-purple-100 text-purple-700",
  SHIPPED: "bg-cyan-100 text-cyan-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

type OrderRow = {
  id: string
  orderNumber: string
  email: string
  status: string
  total: number
  createdAt: Date
  shippingAddress?: {
    firstName: string
    lastName: string
    phone?: string | null
  } | null
  items?: Array<unknown>
}

type AdminOrdersTableProps = {
  orders: OrderRow[]
  total: number
  page: number
  pageSize: number
  statusCounts: Record<string, number>
  currentStatus?: string
  currentSearch?: string
}

export function AdminOrdersTable({
  orders,
  total,
  page,
  pageSize,
  statusCounts,
  currentStatus,
  currentSearch,
}: AdminOrdersTableProps) {
  const router = useRouter()
  const [search, setSearch] = useState(currentSearch || "")
  const totalPages = Math.ceil(total / pageSize)
  const statuses = [
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]

  function go(params: Record<string, string>) {
    const sp = new URLSearchParams()
    if (params.search || search) sp.set("search", params.search || search)
    if (params.status && params.status !== "all")
      sp.set("status", params.status)
    if (params.page) sp.set("page", params.page)
    router.push(`/admin/orders?${sp.toString()}`)
  }

  function whatsappUrl(phone?: string | null, name?: string) {
    const p = phone?.replace(/\D/g, "")
    if (!p) return null
    const msg = encodeURIComponent(
      `Hi ${name || "there"}, this is Tullia Tea Admin following up on your order.`
    )
    return `https://wa.me/${p}?text=${msg}`
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 gap-2">
          <Input
            placeholder="Search by order number or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              go({ search: search, status: currentStatus || "", page: "1" })
            }
            className="max-w-xs"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              go({ search, status: currentStatus || "", page: "1" })
            }
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-1">
          <button
            onClick={() => go({ search: "", status: "", page: "1" })}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${!currentStatus ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
          >
            All ({total})
          </button>
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => go({ search: "", status: s, page: "1" })}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${currentStatus === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              {s} ({statusCounts[s] || 0})
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3 font-medium">Order</th>
              <th className="text-left p-3 font-medium hidden md:table-cell">
                Customer
              </th>
              <th className="text-left p-3 font-medium hidden sm:table-cell">
                Date
              </th>
              <th className="text-right p-3 font-medium">Total</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => {
              const addr = o.shippingAddress
              const name = addr ? `${addr.firstName} ${addr.lastName}` : o.email
              return (
                <tr
                  key={o.id}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="p-3">
                    <p className="font-medium">{o.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.items?.length || 0} item(s)
                    </p>
                  </td>
                  <td className="p-3 hidden md:table-cell">
                    <p className="truncate max-w-[200px]">{name}</p>
                    <p className="text-xs text-muted-foreground">{o.email}</p>
                  </td>
                  <td className="p-3 hidden sm:table-cell text-muted-foreground">
                    {formatDate(o.createdAt)}
                  </td>
                  <td className="p-3 text-right font-semibold tabular-nums">
                    {formatPrice(Number(o.total))}
                  </td>
                  <td className="p-3">
                    <Badge
                      variant="outline"
                      className={`text-[10px] ${statusColors[o.status] || ""}`}
                    >
                      {o.status}
                    </Badge>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={
                          whatsappUrl(o.shippingAddress?.phone, name) || "#"
                        }
                        target="_blank"
                        rel="noopener"
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                      >
                        <MessageCircle className="h-3.5 w-3.5 text-green-600" />
                      </a>
                      <a
                        href={`mailto:${o.email}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                      >
                        <Mail className="h-3.5 w-3.5 text-blue-600" />
                      </a>
                      <a
                        href={`/admin/orders/${o.id}`}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted transition-colors"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>
            {total} order{total !== 1 ? "s" : ""}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page <= 1}
              onClick={() => go({ page: String(page - 1) })}
            >
              Previous
            </Button>
            <span className="tabular-nums">
              {page} / {totalPages}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => go({ page: String(page + 1) })}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

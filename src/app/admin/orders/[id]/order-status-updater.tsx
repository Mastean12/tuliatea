"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { updateOrderStatus } from "@/lib/actions/admin/orders"
import { toast } from "sonner"

const STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "REFUNDED",
]

type OrderStatusUpdaterProps = {
  orderId: string
  currentStatus: string
}

export function OrderStatusUpdater({
  orderId,
  currentStatus,
}: OrderStatusUpdaterProps) {
  const [status, setStatus] = useState(currentStatus)
  const [pending, setPending] = useState(false)

  async function handleUpdate() {
    setPending(true)
    const fd = new FormData()
    fd.set("id", orderId)
    fd.set("status", status)
    const result = await updateOrderStatus({}, fd)
    if (result.success) toast.success("Status updated")
    else toast.error(result.error || "Failed to update")
    setPending(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Select value={status} onValueChange={(v) => v && setStatus(v)}>
        <SelectTrigger className="w-[160px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STATUSES.map((s) => (
            <SelectItem key={s} value={s} disabled={s === currentStatus}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button
        size="sm"
        onClick={handleUpdate}
        disabled={pending || status === currentStatus}
      >
        {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
      </Button>
    </div>
  )
}

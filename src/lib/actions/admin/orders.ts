"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/current-user"
import type { OrderStatus } from "@prisma/client"
import { routes } from "@/config/routes"

export type OrderActionState = { success?: boolean; error?: string }

export async function updateOrderStatus(
  prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  try {
    await requireAdmin()
    const id = formData.get("id") as string
    const status = formData.get("status") as string
    if (!id || !status) return { error: "Missing required fields" }

    const order = await prisma.order.findUnique({ where: { id } })
    if (!order) return { error: "Order not found" }

    const validStatuses = [
      "PENDING",
      "CONFIRMED",
      "PROCESSING",
      "SHIPPED",
      "DELIVERED",
      "CANCELLED",
      "REFUNDED",
    ] as const
    type ValidStatus = (typeof validStatuses)[number]

    if (!validStatuses.includes(status as ValidStatus)) {
      return { error: "Invalid status" }
    }

    await prisma.order.update({
      where: { id },
      data: {
        status: status as OrderStatus,
        ...(status === "SHIPPED" ? { shippedAt: new Date() } : {}),
        ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}),
        ...(status === "CANCELLED" ? { cancelledAt: new Date() } : {}),
      },
    })

    await prisma.orderStatusHistory.create({
      data: { orderId: id, status },
    })

    revalidatePath(routes.admin.orders)
    revalidatePath(`/admin/orders/${id}`)
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message || "Failed to update status" }
  }
}

export async function addAdminNote(
  prevState: OrderActionState,
  formData: FormData
): Promise<OrderActionState> {
  try {
    const admin = await requireAdmin()
    const orderId = formData.get("orderId") as string
    const content = formData.get("content") as string
    if (!orderId || !content) return { error: "Missing required fields" }

    await prisma.adminNote.create({
      data: { orderId, content, createdBy: admin.id },
    })

    revalidatePath(`/admin/orders/${orderId}`)
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message || "Failed to add note" }
  }
}

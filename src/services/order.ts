import { prisma } from "@/lib/prisma"
import { generateOrderNumber } from "@/lib/utils"

export type CreateOrderInput = {
  userId?: string
  email: string
  firstName: string
  lastName: string
  phone: string
  county: string
  city: string
  street: string
  building?: string
  postalCode?: string
  deliveryNotes?: string
  deliveryMethod: string
  paymentMethod: string
  items: Array<{
    productId: string
    name: string
    price: number
    quantity: number
    weight?: string
  }>
  subtotal: number
  shipping: number
  total: number
  notes?: string
}

export async function createOrder(input: CreateOrderInput) {
  const orderNumber = generateOrderNumber()

  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId: input.userId || null,
      email: input.email,
      subtotal: input.subtotal,
      shipping: input.shipping,
      tax: 0,
      discount: 0,
      total: input.total,
      currency: "KES",
      deliveryMethod: input.deliveryMethod,
      paymentMethod: input.paymentMethod,
      deliveryNotes: input.deliveryNotes || null,
      notes: input.notes || null,
      shippingAddress: {
        create: {
          firstName: input.firstName,
          lastName: input.lastName,
          line1: input.street,
          line2: input.building || null,
          city: input.city,
          state: input.county,
          postalCode: input.postalCode || null,
          country: "KE",
          phone: input.phone,
        },
      },
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          productName: item.name || null,
          productWeight: item.weight || null,
        })),
      },
    },
    include: {
      items: {
        include: {
          product: { select: { name: true, slug: true, weight: true } },
        },
      },
      shippingAddress: true,
    },
  })

  return order
}

export async function getOrderByNumber(orderNumber: string) {
  return prisma.order.findUnique({
    where: { orderNumber },
    include: {
      items: {
        include: {
          product: { select: { name: true, slug: true, weight: true } },
        },
      },
      shippingAddress: true,
    },
  })
}

export async function getOrdersByUser(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: { select: { name: true, slug: true } } },
      },
      shippingAddress: true,
    },
    orderBy: { createdAt: "desc" },
  })
}

export async function getOrderCount() {
  return prisma.order.count()
}

export async function validateStock(
  items: Array<{ productId: string; quantity: number }>
): Promise<{ valid: boolean; errors?: string[] }> {
  const errors: string[] = []

  for (const item of items) {
    const product = await prisma.product.findUnique({
      where: { id: item.productId },
      select: { id: true, name: true, stock: true, isActive: true },
    })

    if (!product || !product.isActive) {
      errors.push(`Product not found or unavailable`)
      continue
    }

    if (product.stock < item.quantity) {
      errors.push(
        `Insufficient stock for ${product.name}. Available: ${product.stock}`
      )
    }
  }

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  }
}

export function calculateTotal(
  items: Array<{ price: number; quantity: number }>,
  shipping: number
): { subtotal: number; total: number } {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  return { subtotal, total: subtotal + shipping }
}

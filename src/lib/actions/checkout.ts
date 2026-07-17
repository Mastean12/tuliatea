"use server"

import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createOrder, validateStock } from "@/services/order"
import { getDeliveryPrice } from "@/services/delivery"
import { getPaymentMethod } from "@/services/payment"
import { sendOrderNotification } from "@/services/notification"

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone is required"),
  county: z.string().min(1, "County is required"),
  city: z.string().min(1, "City/Town is required"),
  street: z.string().min(1, "Street address is required"),
  building: z.string().optional(),
  postalCode: z.string().optional(),
  deliveryNotes: z.string().optional(),
  deliveryMethod: z.string().min(1, "Delivery method is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  subtotal: z.number().positive(),
  shipping: z.number().min(0),
  total: z.number().positive(),
})

export type CheckoutState = {
  success?: boolean
  error?: string
  orderNumber?: string
  fields?: Record<string, string | undefined>
}

export async function placeOrder(
  prevState: CheckoutState,
  formData: FormData
): Promise<CheckoutState> {
  const raw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    county: formData.get("county") as string,
    city: formData.get("city") as string,
    street: formData.get("street") as string,
    building: (formData.get("building") as string) || undefined,
    postalCode: (formData.get("postalCode") as string) || undefined,
    deliveryNotes: (formData.get("deliveryNotes") as string) || undefined,
    deliveryMethod: formData.get("deliveryMethod") as string,
    paymentMethod: formData.get("paymentMethod") as string,
    subtotal: Number(formData.get("subtotal")) || 0,
    shipping: Number(formData.get("shipping")) || 0,
    total: Number(formData.get("total")) || 0,
  }

  const parsed = checkoutSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    const cartJson = formData.get("cartItems") as string
    if (!cartJson) return { error: "Cart is empty" }

    const cartItems: Array<{ id: string; price: number; quantity: number }> =
      JSON.parse(cartJson)

    if (cartItems.length === 0) return { error: "Cart is empty" }

    // Validate stock
    const stockCheck = await validateStock(
      cartItems.map((i) => ({ productId: i.id, quantity: i.quantity }))
    )
    if (!stockCheck.valid) {
      return { error: stockCheck.errors?.[0] || "Some items are out of stock" }
    }

    // Validate delivery method
    const calculatedShipping = getDeliveryPrice(
      parsed.data.deliveryMethod,
      parsed.data.county
    )
    if (calculatedShipping !== parsed.data.shipping) {
      return { error: "Delivery price mismatch. Please refresh and try again." }
    }

    // Validate payment method
    const paymentMethod = getPaymentMethod(parsed.data.paymentMethod)
    if (!paymentMethod || paymentMethod.isComingSoon) {
      return { error: "Selected payment method is not available" }
    }

    // Recalculate total server-side
    const calculatedSubtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
    const calculatedTotal = calculatedSubtotal + calculatedShipping

    // Validate against client-provided values to prevent price manipulation
    if (
      Math.abs(calculatedSubtotal - parsed.data.subtotal) > 1 ||
      Math.abs(calculatedTotal - parsed.data.total) > 1
    ) {
      return { error: "Order total mismatch. Please refresh and try again." }
    }

    const order = await createOrder({
      email: parsed.data.email,
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      phone: parsed.data.phone,
      county: parsed.data.county,
      city: parsed.data.city,
      street: parsed.data.street,
      building: parsed.data.building,
      postalCode: parsed.data.postalCode,
      deliveryNotes: parsed.data.deliveryNotes,
      deliveryMethod: parsed.data.deliveryMethod,
      paymentMethod: parsed.data.paymentMethod,
      items: cartItems.map((item) => ({
        productId: item.id,
        name: "",
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: calculatedSubtotal,
      shipping: calculatedShipping,
      total: calculatedTotal,
    })

    // Decrement stock
    const itemNames: string[] = []
    for (const item of cartItems) {
      const p = await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } },
        select: { name: true },
      })
      itemNames.push(p.name)
    }

    // Send WhatsApp notification
    try {
      await sendOrderNotification({
        orderNumber: order.orderNumber,
        customerName: `${parsed.data.firstName} ${parsed.data.lastName}`,
        email: parsed.data.email,
        phone: parsed.data.phone,
        items: cartItems.map((item, i) => ({
          name: itemNames[i] || "Product",
          quantity: item.quantity,
          price: item.price,
        })),
        total: calculatedTotal,
        deliveryMethod: parsed.data.deliveryMethod,
        paymentMethod: parsed.data.paymentMethod,
      })
    } catch {
      // Notification failure is non-blocking
    }

    return { success: true, orderNumber: order.orderNumber }
  } catch (error) {
    console.error("Checkout error:", error)
    return { error: "Something went wrong. Please try again." }
  }
}

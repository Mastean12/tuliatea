import { siteConfig } from "@/config/site"
import { formatPrice } from "@/lib/utils"

type OrderNotification = {
  orderNumber: string
  customerName: string
  email: string
  phone: string
  items: Array<{ name: string; quantity: number; price: number }>
  total: number
  deliveryMethod: string
  paymentMethod: string
}

const methodLabels: Record<string, string> = {
  standard: "Standard Delivery",
  express: "Express Delivery",
  pickup: "Store Pickup",
  cod: "Cash on Delivery",
  mpesa: "M-Pesa",
  "bank-transfer": "Bank Transfer",
}

export async function sendOrderNotification(order: OrderNotification) {
  const itemsList = order.items
    .map(
      (i) =>
        `• ${i.name} × ${i.quantity} — ${formatPrice(i.price * i.quantity)}`
    )
    .join("\n")

  const message = `🆕 *New Order Received!*\n\n📋 *Order:* ${order.orderNumber}\n👤 *Customer:* ${order.customerName}\n📧 ${order.email}\n📞 ${order.phone}\n📦 *Delivery:* ${methodLabels[order.deliveryMethod] || order.deliveryMethod}\n💳 *Payment:* ${methodLabels[order.paymentMethod] || order.paymentMethod}\n\n━━━ Items ━━━\n${itemsList}\n\n━━━━━━━━━━━\n💰 *Total:* ${formatPrice(order.total)}`

  const phone = siteConfig.contact.whatsapp.replace(/\D/g, "")

  // WhatsApp Business API endpoint (when configured)
  // For now, log the notification and return the click-to-chat URL
  console.log("=== Order Notification ===")
  console.log(message)
  console.log("==========================")

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  return { sent: true, waUrl, message }
}

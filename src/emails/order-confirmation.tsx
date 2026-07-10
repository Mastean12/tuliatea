type OrderConfirmationEmailProps = {
  name: string
  orderNumber: string
  items: Array<{ name: string; quantity: number; price: string }>
  total: string
  deliveryMethod: string
}

export function OrderConfirmationEmail({
  name,
  orderNumber,
  items,
  total,
  deliveryMethod,
}: OrderConfirmationEmailProps) {
  const itemsHtml = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; font-size: 14px;">${item.name}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; font-size: 14px; text-align: center;">${item.quantity}</td>
          <td style="padding: 8px 0; border-bottom: 1px solid #E5E7EB; font-size: 14px; text-align: right;">${item.price}</td>
        </tr>
      `
    )
    .join("")

  return {
    subject: `Order Confirmed – ${orderNumber}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="text-align: center; padding: 32px 0;">
          <h1 style="color: #2E7D32; font-size: 24px; margin: 0;">Tullia Tea</h1>
        </div>
        <div style="background: #FAF8F3; padding: 32px; border-radius: 12px;">
          <h2 style="margin: 0 0 8px;">Order Confirmed!</h2>
          <p style="color: #6B7280; margin: 0 0 16px;">Hi ${name}, your order has been placed successfully.</p>
          <div style="background: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            <p style="font-size: 12px; color: #6B7280; margin: 0 0 4px;">ORDER NUMBER</p>
            <p style="font-size: 18px; font-weight: 600; margin: 0;">${orderNumber}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: left; padding: 8px 0; border-bottom: 2px solid #E5E7EB; font-size: 12px; color: #6B7280;">Item</th>
                <th style="text-align: center; padding: 8px 0; border-bottom: 2px solid #E5E7EB; font-size: 12px; color: #6B7280;">Qty</th>
                <th style="text-align: right; padding: 8px 0; border-bottom: 2px solid #E5E7EB; font-size: 12px; color: #6B7280;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHtml}
            </tbody>
          </table>
          <div style="text-align: right; padding: 16px 0; font-size: 18px; font-weight: 600;">
            Total: ${total}
          </div>
          <p style="color: #6B7280; font-size: 14px; margin: 0;">Delivery: ${deliveryMethod}</p>
        </div>
        <div style="text-align: center; padding: 24px; color: #9CA3AF; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Rectangular Foods. All rights reserved.</p>
        </div>
      </div>
    `,
  }
}

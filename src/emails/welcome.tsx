type WelcomeEmailProps = {
  name: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return {
    subject: "Welcome to Tullia Tea",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="text-align: center; padding: 32px 0;">
          <h1 style="color: #2E7D32; font-size: 24px; margin: 0;">Tullia Tea</h1>
        </div>
        <div style="background: #FAF8F3; padding: 32px; border-radius: 12px;">
          <h2 style="margin: 0 0 16px;">Welcome, ${name}!</h2>
          <p style="color: #6B7280; line-height: 1.6;">
            Thank you for creating an account with Tullia Tea. We're excited to have you join our community of wellness tea lovers.
          </p>
          <p style="color: #6B7280; line-height: 1.6;">
            Start exploring our collection of premium Kenyan wellness teas and discover your new favorite blend.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/products"
               style="background: #2E7D32; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
              Shop Now
            </a>
          </div>
        </div>
        <div style="text-align: center; padding: 24px; color: #9CA3AF; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Rectangular Foods. All rights reserved.</p>
        </div>
      </div>
    `,
  }
}

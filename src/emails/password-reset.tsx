type PasswordResetEmailProps = {
  name: string
  resetUrl: string
}

export function PasswordResetEmail({
  name,
  resetUrl,
}: PasswordResetEmailProps) {
  return {
    subject: "Reset your Tullia Tea password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="text-align: center; padding: 32px 0;">
          <h1 style="color: #2E7D32; font-size: 24px; margin: 0;">Tullia Tea</h1>
        </div>
        <div style="background: #FAF8F3; padding: 32px; border-radius: 12px;">
          <h2 style="margin: 0 0 16px;">Password Reset</h2>
          <p style="color: #6B7280; line-height: 1.6;">
            Hi ${name},
          </p>
          <p style="color: #6B7280; line-height: 1.6;">
            We received a request to reset your password. Click the button below to create a new password. This link expires in 1 hour.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${resetUrl}"
               style="background: #2E7D32; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #6B7280; font-size: 13px;">
            If you did not request this, please ignore this email. Your password will remain unchanged.
          </p>
        </div>
        <div style="text-align: center; padding: 24px; color: #9CA3AF; font-size: 12px;">
          <p>&copy; ${new Date().getFullYear()} Rectangular Foods. All rights reserved.</p>
        </div>
      </div>
    `,
  }
}

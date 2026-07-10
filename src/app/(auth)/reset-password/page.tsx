import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { ResetPasswordForm } from "@/components/auth/reset-password-form"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your Tullia Tea account.",
  openGraph: { title: `Reset Password | ${siteConfig.name}` },
}

type Props = {
  searchParams: Promise<{ token?: string; email?: string }>
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token, email } = await searchParams

  if (!token || !email) {
    return (
      <div className="text-center">
        <h1 className="font-heading text-xl font-semibold">
          Invalid reset link
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This password reset link is invalid or has expired.
        </p>
      </div>
    )
  }

  return <ResetPasswordForm token={token} email={decodeURIComponent(email)} />
}

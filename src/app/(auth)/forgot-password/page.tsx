import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Reset your Tullia Tea account password.",
  openGraph: { title: `Forgot Password | ${siteConfig.name}` },
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />
}

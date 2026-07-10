import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Tullia Tea account.",
  openGraph: { title: `Sign In | ${siteConfig.name}` },
}

export default function LoginPage() {
  return <LoginForm />
}

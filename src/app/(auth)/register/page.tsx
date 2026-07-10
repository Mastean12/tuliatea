import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Tullia Tea account and start your wellness journey.",
  openGraph: { title: `Create Account | ${siteConfig.name}` },
}

export default function RegisterPage() {
  return <RegisterForm />
}

import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Tullia Tea account and start your wellness journey.",
}

export default function CustomerRegisterPage() {
  return <RegisterForm />
}

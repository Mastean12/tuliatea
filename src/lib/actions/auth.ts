"use server"

import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { signIn, signOut } from "@/lib/auth"
import { routes } from "@/config/routes"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
  phone: z.string().optional(),
})

export type LoginState = {
  success?: boolean
  error?: string
  redirectTo?: string
  fields?: Record<string, string>
}

export async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, fields: raw }
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { passwordHash: true, role: true, isActive: true },
  })

  if (!user || !user.passwordHash || !user.isActive) {
    return { error: "Invalid email or password", fields: raw }
  }

  const isValid = await bcrypt.compare(parsed.data.password, user.passwordHash)
  if (!isValid) {
    return { error: "Invalid email or password", fields: raw }
  }

  const redirectTo =
    user.role === "ADMIN" || user.role === "SUPER_ADMIN"
      ? routes.admin.root
      : routes.account.root

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo,
  })

  return { success: true, redirectTo }
}

export type RegisterState = {
  success?: boolean
  error?: string
  fields?: Record<string, string | undefined>
}

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const phone = formData.get("phone") as string | null
  const raw: Record<string, string | undefined> = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phone: phone || undefined,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message, fields: raw }
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    })

    if (existing) {
      return { error: "Email already registered", fields: raw }
    }

    const passwordHash = await bcrypt.hash(parsed.data.password, 12)

    await prisma.user.create({
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        name: `${parsed.data.firstName} ${parsed.data.lastName}`,
        email: parsed.data.email,
        phone: parsed.data.phone || null,
        passwordHash,
      },
    })

    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: routes.account.root,
    })

    return { success: true }
  } catch (error) {
    if ((error as { name?: string })?.name === "AuthError") {
      return { error: "Registration failed. Please try again.", fields: raw }
    }
    throw error
  }
}

export async function logout() {
  await signOut({ redirectTo: routes.home })
}

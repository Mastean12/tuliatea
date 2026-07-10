"use server"

import { AuthError } from "next-auth"
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain an uppercase letter")
    .regex(/[0-9]/, "Password must contain a number"),
})

export type LoginState = {
  success?: boolean
  error?: string
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
    return {
      error: parsed.error.issues[0].message,
      fields: raw,
    }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: routes.home,
    })
    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password", fields: raw }
        default:
          return { error: "Authentication failed", fields: raw }
      }
    }
    throw error
  }
}

export type RegisterState = {
  success?: boolean
  error?: string
  fields?: Record<string, string>
}

export async function register(
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return {
      error: parsed.error.issues[0].message,
      fields: raw,
    }
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
        name: parsed.data.name,
        email: parsed.data.email,
        passwordHash,
      },
    })

    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: routes.home,
    })

    return { success: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Registration failed. Please try again.", fields: raw }
    }
    throw error
  }
}

export async function logout() {
  await signOut({ redirectTo: routes.home })
}

"use server"

import bcrypt from "bcryptjs"
import crypto from "crypto"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

const resetPasswordSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[0-9]/, "Password must contain a number"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export type ForgotPasswordState = {
  success?: boolean
  error?: string
  sent?: boolean
}

export async function forgotPassword(
  prevState: ForgotPasswordState,
  formData: FormData
): Promise<ForgotPasswordState> {
  const raw = { email: formData.get("email") as string }

  const parsed = forgotPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    })

    // Always return success to prevent email enumeration
    if (!user || !user.passwordHash) {
      return { success: true, sent: true }
    }

    // Delete existing tokens for this email
    await prisma.passwordResetToken.deleteMany({
      where: { email: parsed.data.email },
    })

    // Generate secure token
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = await bcrypt.hash(rawToken, 10)
    const expires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

    await prisma.passwordResetToken.create({
      data: {
        email: parsed.data.email,
        token: hashedToken,
        expires,
      },
    })

    // Placeholder: log the reset URL for development
    const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/reset-password?token=${rawToken}&email=${encodeURIComponent(parsed.data.email)}`
    console.log("Password reset URL:", resetUrl)

    return { success: true, sent: true }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export type ResetPasswordState = {
  success?: boolean
  error?: string
}

export async function resetPassword(
  prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const raw = {
    token: formData.get("token") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const parsed = resetPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    // Find all valid tokens for this user (we need the email from the token)
    const email = formData.get("email") as string
    if (!email) {
      return { error: "Invalid reset link" }
    }

    const storedTokens = await prisma.passwordResetToken.findMany({
      where: {
        email,
        expires: { gt: new Date() },
      },
    })

    if (storedTokens.length === 0) {
      return { error: "Invalid or expired reset link" }
    }

    // Find matching token by comparing hashes
    let validToken = false
    for (const stored of storedTokens) {
      const match = await bcrypt.compare(parsed.data.token, stored.token)
      if (match) {
        validToken = true
        // Update password
        const passwordHash = await bcrypt.hash(parsed.data.password, 12)
        await prisma.user.update({
          where: { email },
          data: { passwordHash },
        })
        // Delete used token
        await prisma.passwordResetToken.delete({ where: { id: stored.id } })
        break
      }
    }

    if (!validToken) {
      return { error: "Invalid or expired reset link" }
    }

    // Clean up all remaining tokens for this email
    await prisma.passwordResetToken.deleteMany({ where: { email } })

    return { success: true }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export type ChangePasswordState = {
  success?: boolean
  error?: string
}

export async function changePassword(
  prevState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const schema = z
    .object({
      currentPassword: z.string().min(1, "Current password is required"),
      newPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[0-9]/, "Password must contain a number"),
      confirmPassword: z.string(),
    })
    .refine((d) => d.newPassword === d.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })

  const raw = {
    currentPassword: formData.get("currentPassword") as string,
    newPassword: formData.get("newPassword") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    const userId = formData.get("userId") as string
    if (!userId) return { error: "Not authenticated" }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user || !user.passwordHash) return { error: "Invalid credentials" }

    const isValid = await bcrypt.compare(
      parsed.data.currentPassword,
      user.passwordHash
    )
    if (!isValid) return { error: "Current password is incorrect" }

    const passwordHash = await bcrypt.hash(parsed.data.newPassword, 12)
    await prisma.user.update({
      where: { id: userId },
      data: { passwordHash },
    })

    return { success: true }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

export type UpdateProfileState = {
  success?: boolean
  error?: string
}

export async function updateProfile(
  prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  const schema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().optional(),
  })

  const raw = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: (formData.get("phone") as string) || "",
  }

  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    const userId = formData.get("userId") as string
    if (!userId) return { error: "Not authenticated" }

    await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        name: `${parsed.data.firstName} ${parsed.data.lastName}`,
        phone: parsed.data.phone || null,
      },
    })

    return { success: true }
  } catch {
    return { error: "Something went wrong. Please try again." }
  }
}

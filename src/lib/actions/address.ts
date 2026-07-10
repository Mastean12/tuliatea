"use server"

import { z } from "zod"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { getCurrentUser } from "@/lib/current-user"
import { routes } from "@/config/routes"

const addressSchema = z.object({
  label: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  county: z.string().min(1, "County is required"),
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street address is required"),
  building: z.string().optional(),
  postalCode: z.string().optional(),
  isDefault: z.string().optional(),
})

export type AddressState = {
  success?: boolean
  error?: string
}

export async function addAddress(
  prevState: AddressState,
  formData: FormData
): Promise<AddressState> {
  const user = await getCurrentUser()
  if (!user?.id) return { error: "Not authenticated" }

  const parsed = addressSchema.safeParse({
    label: formData.get("label") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: formData.get("phone") as string,
    county: formData.get("county") as string,
    city: formData.get("city") as string,
    street: formData.get("street") as string,
    building: (formData.get("building") as string) || undefined,
    postalCode: (formData.get("postalCode") as string) || undefined,
    isDefault: (formData.get("isDefault") as string) || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    if (parsed.data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, orderId: null },
        data: { isDefault: false },
      })
    }

    await prisma.address.create({
      data: {
        label: parsed.data.label || null,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        line1: parsed.data.street,
        line2: parsed.data.building || null,
        city: parsed.data.city,
        state: parsed.data.county,
        postalCode: parsed.data.postalCode || null,
        country: "KE",
        phone: parsed.data.phone,
        isDefault: parsed.data.isDefault === "on",
        userId: user.id,
      },
    })

    revalidatePath(routes.account.addresses)
    return { success: true }
  } catch {
    return { error: "Failed to save address" }
  }
}

export async function updateAddressAction(
  prevState: AddressState,
  formData: FormData
): Promise<AddressState> {
  const user = await getCurrentUser()
  if (!user?.id) return { error: "Not authenticated" }

  const id = formData.get("id") as string
  if (!id) return { error: "Address ID required" }

  const parsed = addressSchema.safeParse({
    label: formData.get("label") as string,
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: formData.get("phone") as string,
    county: formData.get("county") as string,
    city: formData.get("city") as string,
    street: formData.get("street") as string,
    building: (formData.get("building") as string) || undefined,
    postalCode: (formData.get("postalCode") as string) || undefined,
    isDefault: (formData.get("isDefault") as string) || undefined,
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    const existing = await prisma.address.findFirst({
      where: { id, userId: user.id, orderId: null },
    })
    if (!existing) return { error: "Address not found" }

    if (parsed.data.isDefault) {
      await prisma.address.updateMany({
        where: { userId: user.id, orderId: null },
        data: { isDefault: false },
      })
    }

    await prisma.address.update({
      where: { id },
      data: {
        label: parsed.data.label || null,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        line1: parsed.data.street,
        line2: parsed.data.building || null,
        city: parsed.data.city,
        state: parsed.data.county,
        postalCode: parsed.data.postalCode || null,
        phone: parsed.data.phone,
        isDefault: parsed.data.isDefault === "on",
      },
    })

    revalidatePath(routes.account.addresses)
    return { success: true }
  } catch {
    return { error: "Failed to update address" }
  }
}

export async function deleteAddressAction(id: string): Promise<AddressState> {
  const user = await getCurrentUser()
  if (!user?.id) return { error: "Not authenticated" }

  try {
    const existing = await prisma.address.findFirst({
      where: { id, userId: user.id, orderId: null },
    })
    if (!existing) return { error: "Address not found" }

    await prisma.address.delete({ where: { id } })
    revalidatePath(routes.account.addresses)
    return { success: true }
  } catch {
    return { error: "Failed to delete address" }
  }
}

export async function setDefaultAddressAction(
  id: string
): Promise<AddressState> {
  const user = await getCurrentUser()
  if (!user?.id) return { error: "Not authenticated" }

  try {
    await prisma.address.updateMany({
      where: { userId: user.id, orderId: null },
      data: { isDefault: false },
    })

    await prisma.address.update({
      where: { id },
      data: { isDefault: true },
    })

    revalidatePath(routes.account.addresses)
    return { success: true }
  } catch {
    return { error: "Failed to set default address" }
  }
}

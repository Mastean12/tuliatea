import { prisma } from "@/lib/prisma"

export type AddressInput = {
  label?: string
  firstName: string
  lastName: string
  phone: string
  county: string
  city: string
  street: string
  building?: string
  postalCode?: string
  isDefault?: boolean
}

export async function getUserAddresses(userId: string) {
  return prisma.address.findMany({
    where: { userId, orderId: null },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  })
}

export async function getAddressById(id: string, userId: string) {
  return prisma.address.findFirst({
    where: { id, userId, orderId: null },
  })
}

export async function createAddress(userId: string, input: AddressInput) {
  if (input.isDefault) {
    await prisma.address.updateMany({
      where: { userId, orderId: null },
      data: { isDefault: false },
    })
  }

  return prisma.address.create({
    data: {
      label: input.label || null,
      firstName: input.firstName,
      lastName: input.lastName,
      line1: input.street,
      line2: input.building || null,
      city: input.city,
      state: input.county,
      postalCode: input.postalCode || null,
      country: "KE",
      phone: input.phone,
      isDefault: input.isDefault || false,
      userId,
    },
  })
}

export async function updateAddress(
  id: string,
  userId: string,
  input: Partial<AddressInput>
) {
  const existing = await getAddressById(id, userId)
  if (!existing) throw new Error("Address not found")

  if (input.isDefault) {
    await prisma.address.updateMany({
      where: { userId, orderId: null },
      data: { isDefault: false },
    })
  }

  return prisma.address.update({
    where: { id },
    data: {
      ...(input.label !== undefined && { label: input.label || null }),
      ...(input.firstName !== undefined && { firstName: input.firstName }),
      ...(input.lastName !== undefined && { lastName: input.lastName }),
      ...(input.phone !== undefined && { phone: input.phone }),
      ...(input.street !== undefined && { line1: input.street }),
      ...(input.building !== undefined && { line2: input.building || null }),
      ...(input.city !== undefined && { city: input.city }),
      ...(input.county !== undefined && { state: input.county }),
      ...(input.postalCode !== undefined && {
        postalCode: input.postalCode || null,
      }),
      ...(input.isDefault !== undefined && { isDefault: input.isDefault }),
    },
  })
}

export async function deleteAddress(id: string, userId: string) {
  const address = await getAddressById(id, userId)
  if (!address) throw new Error("Address not found")
  if (address.orderId)
    throw new Error("Cannot delete an address linked to an order")

  await prisma.address.delete({ where: { id } })
}

export async function setDefaultAddress(id: string, userId: string) {
  const address = await getAddressById(id, userId)
  if (!address) throw new Error("Address not found")

  await prisma.address.updateMany({
    where: { userId, orderId: null },
    data: { isDefault: false },
  })

  return prisma.address.update({
    where: { id },
    data: { isDefault: true },
  })
}

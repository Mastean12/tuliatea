import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/current-user"
import { getUserAddresses } from "@/services/address"
import { routes } from "@/config/routes"
import { AddressesClient } from "./addresses-client"

export const metadata: Metadata = {
  title: "My Addresses",
  robots: { index: false, follow: false },
}

export default async function AddressesPage() {
  const user = await getCurrentUser()
  if (!user?.id) redirect(routes.auth.login)

  const addresses = await getUserAddresses(user.id)

  return (
    <AddressesClient
      initialAddresses={JSON.parse(JSON.stringify(addresses))}
      userId={user.id}
    />
  )
}

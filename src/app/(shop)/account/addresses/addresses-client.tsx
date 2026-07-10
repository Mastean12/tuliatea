"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { AddressCard } from "@/components/dashboard/address-card"
import { AddressFormDialog } from "@/components/dashboard/address-form-dialog"
import {
  deleteAddressAction,
  setDefaultAddressAction,
} from "@/lib/actions/address"
import { toast } from "sonner"

type AddressData = {
  id: string
  label: string | null
  firstName: string
  lastName: string
  line1: string
  line2: string | null
  city: string
  state: string | null
  postalCode: string | null
  phone: string | null
  isDefault: boolean
}

type AddressesClientProps = {
  initialAddresses: AddressData[]
  userId: string
}

export function AddressesClient({
  initialAddresses,
  userId: _userId,
}: AddressesClientProps) {
  const [addresses, setAddresses] = useState<AddressData[]>(initialAddresses)
  const [open, setOpen] = useState(false)
  const [editAddress, setEditAddress] = useState<AddressData | null>(null)

  async function handleDelete(id: string) {
    const result = await deleteAddressAction(id)
    if (result.success) {
      setAddresses((prev) => prev.filter((a) => a.id !== id))
      toast.success("Address deleted")
    } else {
      toast.error(result.error || "Failed to delete")
    }
  }

  async function handleSetDefault(id: string) {
    const result = await setDefaultAddressAction(id)
    if (result.success) {
      setAddresses((prev) =>
        prev.map((a) => ({ ...a, isDefault: a.id === id }))
      )
      toast.success("Default address updated")
    } else {
      toast.error(result.error || "Failed to update")
    }
  }

  function handleEdit(addr: AddressData) {
    setEditAddress(addr)
    setOpen(true)
  }

  function handleAdd() {
    setEditAddress(null)
    setOpen(true)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Saved Addresses"
        description="Manage your shipping addresses"
      >
        <Button onClick={handleAdd} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Add Address
        </Button>
      </PageHeader>

      {addresses.length === 0 ? (
        <EmptyState
          title="No addresses saved"
          description="Add a shipping address for faster checkout."
          action={<Button onClick={handleAdd}>Add Address</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <AddressCard
              key={addr.id}
              address={addr}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      )}

      <AddressFormDialog
        open={open}
        onOpenChange={(v) => {
          setOpen(v)
          if (!v) setEditAddress(null)
        }}
        editAddress={
          editAddress
            ? {
                id: editAddress.id,
                label: editAddress.label,
                firstName: editAddress.firstName,
                lastName: editAddress.lastName,
                phone: editAddress.phone,
                county: editAddress.state || "",
                city: editAddress.city,
                street: editAddress.line1,
                building: editAddress.line2,
                postalCode: editAddress.postalCode,
                isDefault: editAddress.isDefault,
              }
            : null
        }
      />
    </div>
  )
}

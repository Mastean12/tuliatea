"use client"

import { useActionState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { KENYAN_COUNTIES } from "@/services/delivery"
import {
  addAddress,
  updateAddressAction,
  type AddressState,
} from "@/lib/actions/address"

type AddressFormDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  editAddress?: {
    id: string
    label: string | null
    firstName: string
    lastName: string
    phone: string | null
    county: string
    city: string
    street: string
    building: string | null
    postalCode: string | null
    isDefault: boolean
  } | null
}

export function AddressFormDialog({
  open,
  onOpenChange,
  editAddress,
}: AddressFormDialogProps) {
  const action = editAddress ? updateAddressAction : addAddress
  const [state, formAction, pending] = useActionState<AddressState, FormData>(
    action,
    {}
  )

  useEffect(() => {
    if (state?.success) onOpenChange(false)
  }, [state?.success, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {editAddress ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction} className="space-y-4">
          {editAddress && (
            <input type="hidden" name="id" value={editAddress.id} />
          )}

          {state?.error && (
            <div
              className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
            >
              {state.error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="label">Address Label</Label>
            <Input
              id="label"
              name="label"
              placeholder="e.g. Home, Office"
              defaultValue={editAddress?.label || ""}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                name="firstName"
                required
                defaultValue={editAddress?.firstName || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                name="lastName"
                required
                defaultValue={editAddress?.lastName || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              defaultValue={editAddress?.phone || ""}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="county">County *</Label>
              <Select name="county" defaultValue={editAddress?.county || ""}>
                <SelectTrigger>
                  <SelectValue placeholder="Select county" />
                </SelectTrigger>
                <SelectContent>
                  {KENYAN_COUNTIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City / Town *</Label>
              <Input
                id="city"
                name="city"
                required
                defaultValue={editAddress?.city || ""}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Input
              id="street"
              name="street"
              required
              placeholder="Street name, building, house number"
              defaultValue={editAddress?.street || ""}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="building">Building / Landmark</Label>
              <Input
                id="building"
                name="building"
                defaultValue={editAddress?.building || ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                name="postalCode"
                defaultValue={editAddress?.postalCode || ""}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="isDefault"
              name="isDefault"
              defaultChecked={editAddress?.isDefault || false}
            />
            <Label
              htmlFor="isDefault"
              className="text-sm font-normal cursor-pointer"
            >
              Set as default address
            </Label>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={pending}>
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                </>
              ) : editAddress ? (
                "Update Address"
              ) : (
                "Add Address"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { MapPin, Star, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

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

type AddressCardProps = {
  address: AddressData
  onEdit: (address: AddressData) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <Card className="p-4 relative">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <p className="font-medium text-sm truncate">
              {address.label || `${address.firstName} ${address.lastName}`}
            </p>
            {address.isDefault && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                Default
              </Badge>
            )}
          </div>
          <div className="ml-6 space-y-0.5 text-sm text-muted-foreground">
            <p>
              {address.firstName} {address.lastName}
            </p>
            <p>
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}
            </p>
            <p>
              {address.city}
              {address.state ? `, ${address.state}` : ""}
            </p>
            {address.phone && <p>{address.phone}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => onEdit(address)}
            aria-label="Edit address"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          {!address.isDefault && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => onSetDefault(address.id)}
                aria-label="Set as default"
              >
                <Star className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-destructive"
                onClick={() => onDelete(address.id)}
                aria-label="Delete address"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}

"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { KENYAN_COUNTIES } from "@/services/delivery"

type ShippingFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  county: string
  city: string
  street: string
  building: string
  postalCode: string
  deliveryNotes: string
}

type ShippingFormProps = {
  data: ShippingFormData
  onChange: (data: ShippingFormData) => void
}

export function ShippingForm({ data, onChange }: ShippingFormProps) {
  function update(field: keyof ShippingFormData, value: string) {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            required
            autoComplete="given-name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            required
            autoComplete="family-name"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => update("email", e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={data.phone}
            onChange={(e) => update("phone", e.target.value)}
            required
            autoComplete="tel"
            placeholder="+254 7XX XXX XXX"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="county">County *</Label>
          <Select
            value={data.county}
            onValueChange={(v) => v && update("county", v)}
          >
            <SelectTrigger id="county">
              <SelectValue placeholder="Select county" />
            </SelectTrigger>
            <SelectContent>
              {KENYAN_COUNTIES.map((county) => (
                <SelectItem key={county} value={county}>
                  {county}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="city">City / Town *</Label>
          <Input
            id="city"
            value={data.city}
            onChange={(e) => update("city", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="street">Street Address *</Label>
        <Input
          id="street"
          value={data.street}
          onChange={(e) => update("street", e.target.value)}
          required
          placeholder="Street name, building, house number"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="building">Building / Landmark</Label>
          <Input
            id="building"
            value={data.building}
            onChange={(e) => update("building", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={data.postalCode}
            onChange={(e) => update("postalCode", e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="deliveryNotes">Delivery Notes</Label>
        <Textarea
          id="deliveryNotes"
          value={data.deliveryNotes}
          onChange={(e) => update("deliveryNotes", e.target.value)}
          placeholder="Any special delivery instructions?"
          rows={2}
        />
      </div>
    </div>
  )
}

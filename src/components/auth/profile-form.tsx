"use client"

import { useActionState } from "react"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  updateProfile,
  type UpdateProfileState,
} from "@/lib/actions/password-reset"

type ProfileFormProps = {
  userId: string
  firstName: string | null
  lastName: string | null
  phone: string | null
}

export function ProfileForm({
  userId,
  firstName,
  lastName,
  phone,
}: ProfileFormProps) {
  const [state, formAction, pending] = useActionState<
    UpdateProfileState,
    FormData
  >(updateProfile, {})

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="userId" value={userId} />

      {state?.success && (
        <div
          className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700"
          role="alert"
        >
          Profile updated successfully
        </div>
      )}

      {state?.error && (
        <div
          className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            defaultValue={firstName || ""}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            defaultValue={lastName || ""}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" defaultValue={phone || ""} />
      </div>

      <Button type="submit" disabled={pending}>
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  )
}

"use client"

import { useActionState } from "react"
import Link from "next/link"
import { Loader2, Leaf } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { register, type RegisterState } from "@/lib/actions/auth"
import { routes } from "@/config/routes"

export function RegisterForm() {
  const [state, formAction, pending] = useActionState<RegisterState, FormData>(
    register,
    {}
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
        </div>
        <h1 className="font-heading text-2xl font-semibold">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join Tullia Tea and start your wellness journey
        </p>
      </div>

      <form action={formAction} className="space-y-4">
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
              placeholder="John"
              required
              autoComplete="given-name"
              defaultValue={state?.fields?.firstName || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              required
              autoComplete="family-name"
              defaultValue={state?.fields?.lastName || ""}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            autoComplete="email"
            defaultValue={state?.fields?.email || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+254 7XX XXX XXX"
            autoComplete="tel"
            defaultValue={state?.fields?.phone || ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="At least 8 characters"
            required
            autoComplete="new-password"
          />
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters with an uppercase letter and a number
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={routes.auth.login}
          className="font-medium text-primary hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

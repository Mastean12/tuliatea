"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "./auth-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </AuthProvider>
  )
}

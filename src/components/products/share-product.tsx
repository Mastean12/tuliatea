"use client"

import { useState } from "react"
import { Share2, Link, Check } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type ShareProductProps = {
  name: string
  url: string
}

export function ShareProduct({ name, url }: ShareProductProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback */
    }
  }

  async function handleWhatsApp() {
    const text = encodeURIComponent(`Check out ${name}: ${url}`)
    window.open(`https://wa.me/?text=${text}`, "_blank")
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url })
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <span className="inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-muted">
          <Share2 className="h-3.5 w-3.5" />
          Share
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4 text-green-600" /> Copied!
            </>
          ) : (
            <>
              <Link className="mr-2 h-4 w-4" /> Copy Link
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleWhatsApp}>
          <Share2 className="mr-2 h-4 w-4 text-green-600" /> WhatsApp
        </DropdownMenuItem>
        {typeof navigator !== "undefined" && "share" in navigator && (
          <DropdownMenuItem onClick={handleNativeShare}>
            <Share2 className="mr-2 h-4 w-4" /> Share via...
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

"use client"

import { MapPin, ExternalLink } from "lucide-react"

type GoogleMapsProps = {
  address: string
  className?: string
}

export function GoogleMaps({ address, className }: GoogleMapsProps) {
  const encodedAddress = encodeURIComponent(address)
  const mapsUrl = `https://www.google.com/maps/search/${encodedAddress}`

  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-xl border bg-card p-3.5 transition-all hover:bg-muted hover:border-primary/20 ${className || ""}`}
      aria-label={`View ${address} on Google Maps`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warm/5">
        <MapPin className="h-5 w-5 text-warm" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">Find us on Google Maps</p>
        <p className="text-sm font-medium truncate">{address}</p>
      </div>
      <ExternalLink className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0" />
    </a>
  )
}

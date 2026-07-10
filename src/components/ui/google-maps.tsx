"use client"

import { MapPin } from "lucide-react"

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
      className={`group relative flex h-48 items-center justify-center overflow-hidden rounded-xl bg-muted transition-shadow hover:shadow-md ${className || ""}`}
      aria-label={`View ${address} on Google Maps`}
    >
      <div className="text-center transition-transform duration-300 group-hover:scale-105">
        <MapPin className="mx-auto mb-2 h-8 w-8 text-muted-foreground/60" />
        <p className="px-4 text-sm text-muted-foreground">{address}</p>
        <p className="mt-1 text-xs text-muted-foreground/60">
          Click to open in Google Maps
        </p>
      </div>
    </a>
  )
}

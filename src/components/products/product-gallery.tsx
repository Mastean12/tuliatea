"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { PlaceholderImage } from "@/components/ui/placeholder-image"

type ProductGalleryProps = {
  images: Array<{ url: string; alt?: string | null }>
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const displayImages = images.length > 0 ? images : [{ url: "", alt: name }]

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        <PlaceholderImage label={name} className="h-80 sm:h-96 lg:h-[500px]" />
      </div>

      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                i === selectedIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              <PlaceholderImage
                label={`${name} ${i + 1}`}
                className="h-20 w-20"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

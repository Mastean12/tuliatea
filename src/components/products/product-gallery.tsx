"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { PlaceholderImage } from "@/components/ui/placeholder-image"

type ProductGalleryProps = {
  images: Array<{ url: string; alt?: string | null }>
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const hasImages = images.length > 0
  const current = hasImages ? images[selectedIndex] : null

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl bg-muted/30 aspect-[4/5] sm:aspect-[4/5] lg:aspect-[4/5]">
        {current?.url ? (
          <Image
            src={current.url}
            alt={current.alt || name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority={selectedIndex === 0}
          />
        ) : (
          <PlaceholderImage
            label={name}
            className="absolute inset-0 h-full w-full"
            variant="product"
          />
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                i === selectedIndex
                  ? "border-primary"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
            >
              {img.url ? (
                <Image
                  src={img.url}
                  alt={img.alt || `${name} ${i + 1}`}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              ) : (
                <PlaceholderImage
                  label={`${name} ${i + 1}`}
                  className="h-20 w-20"
                  variant="avatar"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

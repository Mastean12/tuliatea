"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Upload, Trash2, GripVertical, Star, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

type ImageItem = {
  id: string
  url: string
  alt: string | null
  isPrimary: boolean
}

type ImageUploaderProps = {
  images: ImageItem[]
  productId?: string
  onImagesChange: (images: ImageItem[]) => void
}

export function ImageUploader({
  images,
  productId: _productId,
  onImagesChange,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [_dragIndex, _setDragIndex] = useState<number | null>(null)

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return

      setUploading(true)
      const newImages: ImageItem[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const fd = new FormData()
        fd.set("file", file)

        try {
          const res = await fetch("/api/upload", { method: "POST", body: fd })
          if (!res.ok) throw new Error("Upload failed")
          const data = await res.json()
          newImages.push({
            id: data.publicId,
            url: data.url,
            alt: null,
            isPrimary: images.length === 0 && i === 0,
          })
        } catch {
          toast.error(`Failed to upload ${file.name}`)
        }
      }

      onImagesChange([...images, ...newImages])
      setUploading(false)
      e.target.value = ""
    },
    [images, onImagesChange]
  )

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index)
    if (updated.length > 0 && images[index].isPrimary) {
      updated[0].isPrimary = true
    }
    onImagesChange(updated)
  }

  function setPrimary(index: number) {
    onImagesChange(images.map((img, i) => ({ ...img, isPrimary: i === index })))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Product Images</h3>
        <label className="cursor-pointer">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={uploading}
          >
            {uploading ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-1.5 h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Add Images"}
          </Button>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>

      {images.length === 0 && !uploading && (
        <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          No images yet. Click &quot;Add Images&quot; to upload.
        </div>
      )}

      {uploading && images.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
          <Loader2 className="mx-auto h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {images.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div
              key={img.id}
              className="group relative rounded-xl border bg-card overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-muted/30">
                <Image
                  src={img.url}
                  alt={img.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {img.isPrimary && (
                  <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground shadow-sm">
                    Primary
                  </span>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 group-hover:bg-black/30 transition-all">
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-destructive opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {!img.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimary(i)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-amber-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                    >
                      <Star className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="p-2 flex items-center gap-2">
                <GripVertical className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                <input
                  type="text"
                  value={img.alt || ""}
                  onChange={(e) => {
                    const updated = [...images]
                    updated[i] = { ...updated[i], alt: e.target.value }
                    onImagesChange(updated)
                  }}
                  placeholder="Alt text..."
                  className="w-full bg-transparent text-xs text-muted-foreground placeholder:text-muted-foreground/30 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

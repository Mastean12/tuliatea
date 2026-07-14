"use client"

import { useState, useCallback } from "react"
import Image from "next/image"
import { Trash2, Copy, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { EmptyState } from "@/components/ui/empty-state"
import { DeleteDialog } from "@/components/admin/delete-dialog"
import { toast } from "sonner"

type MediaItem = {
  id: string
  url: string
  alt: string | null
  width: number | null
  height: number | null
  format: string | null
  publicId?: string | null
}

type MediaLibraryProps = {
  initialMedia: MediaItem[]
}

export function MediaLibrary({ initialMedia }: MediaLibraryProps) {
  const [media, setMedia] = useState(initialMedia)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (!files?.length) return

      setUploading(true)
      const uploaded: MediaItem[] = []

      for (let i = 0; i < files.length; i++) {
        const fd = new FormData()
        fd.set("file", files[i])

        try {
          const res = await fetch("/api/upload", { method: "POST", body: fd })
          if (!res.ok) throw new Error("Upload failed")
          const data = await res.json()

          // Save to database
          const saveRes = await fetch("/api/media", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              url: data.url,
              publicId: data.publicId,
              width: data.width,
              height: data.height,
              format: data.format,
            }),
          })
          if (!saveRes.ok) throw new Error("Failed to save")

          const saved = await saveRes.json()
          uploaded.push(saved.data)
        } catch {
          toast.error(`Failed to upload ${files[i].name}`)
        }
      }

      setMedia((prev) => [...uploaded, ...prev])
      setUploading(false)
      e.target.value = ""
    },
    []
  )

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    toast.success("URL copied")
  }

  async function handleDelete() {
    const id = deleteId
    if (!id) return

    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Delete failed")
      setMedia((prev) => prev.filter((m) => m.id !== id))
      toast.success("Media deleted")
    } catch {
      toast.error("Failed to delete")
    }
    setDeleteId(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Media Library" description={`${media.length} files`}>
        <label className="cursor-pointer inline-flex">
          <span className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-3 h-8 text-sm font-medium shadow-sm hover:bg-muted transition-colors">
            {uploading ? (
              <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-1.5 h-4 w-4" />
            )}
            {uploading ? "Uploading..." : "Upload"}
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </PageHeader>

      {media.length === 0 && !uploading ? (
        <EmptyState
          title="No media"
          description="Upload images to get started."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="relative aspect-square bg-muted">
                {item.url ? (
                  <Image
                    src={item.url}
                    alt={item.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    No preview
                  </div>
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/0 group-hover:bg-black/30 transition-all">
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteId(item.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-destructive opacity-0 group-hover:opacity-100 transition-all hover:bg-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-2 text-[10px] text-muted-foreground truncate text-center">
                {item.format || "image"}
                {item.width && item.height
                  ? ` · ${item.width}×${item.height}`
                  : ""}
              </div>
            </Card>
          ))}
        </div>
      )}

      {uploading && media.length > 0 && (
        <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...
        </div>
      )}

      <DeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Media"
        description="This will permanently delete this media file."
      />
    </div>
  )
}

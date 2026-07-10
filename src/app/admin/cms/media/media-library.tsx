"use client"

import { useState } from "react"
import { Trash2, Copy } from "lucide-react"
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
  createdAt: Date
}

type MediaLibraryProps = {
  initialMedia: MediaItem[]
}

export function MediaLibrary({ initialMedia }: MediaLibraryProps) {
  const [media, setMedia] = useState(initialMedia)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url)
    toast.success("URL copied")
  }

  function handleDelete() {
    const id = deleteId
    if (!id) return
    setMedia((prev) => prev.filter((m) => m.id !== id))
    setDeleteId(null)
    toast.success("Media deleted")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Media Library" description={`${media.length} files`} />

      {media.length === 0 ? (
        <EmptyState
          title="No media"
          description="Upload images to get started."
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden group">
              <div className="aspect-square bg-muted flex items-center justify-center text-sm text-muted-foreground">
                {item.format?.startsWith("image") ? "IMG" : "FILE"}
              </div>
              <div className="p-3 space-y-2">
                <p className="text-xs text-muted-foreground truncate">
                  {item.alt || "No alt text"}
                </p>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => copyUrl(item.url)}
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => setDeleteId(item.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
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

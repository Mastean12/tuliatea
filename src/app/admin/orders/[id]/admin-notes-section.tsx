"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addAdminNote } from "@/lib/actions/admin/orders"
import { formatDate } from "@/lib/utils"

type Note = { id: string; content: string; createdAt: Date; createdBy: string }

type AdminNotesSectionProps = {
  orderId: string
  notes: Note[]
}

export function AdminNotesSection({ orderId, notes }: AdminNotesSectionProps) {
  const [allNotes, setAllNotes] = useState(notes)
  const [content, setContent] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setPending(true)
    const fd = new FormData()
    fd.set("orderId", orderId)
    fd.set("content", content)
    const result = await addAdminNote({}, fd)
    if (result.success) {
      setAllNotes((prev) => [
        {
          id: Date.now().toString(),
          content,
          createdAt: new Date(),
          createdBy: "You",
        },
        ...prev,
      ])
      setContent("")
    }
    setPending(false)
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add an internal note..."
          rows={2}
          className="flex-1"
          required
        />
        <Button
          type="submit"
          disabled={pending || !content.trim()}
          className="self-end"
        >
          {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add"}
        </Button>
      </form>

      {allNotes.length === 0 ? (
        <p className="text-sm text-muted-foreground">No internal notes yet.</p>
      ) : (
        <div className="space-y-3">
          {allNotes.map((note) => (
            <div key={note.id} className="rounded-lg bg-muted/50 p-3">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-medium">{note.createdBy}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(note.createdAt)}
                </p>
              </div>
              <p className="text-sm whitespace-pre-wrap">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

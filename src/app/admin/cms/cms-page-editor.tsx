"use client"

import { useState, useEffect, useCallback } from "react"
import { Loader2, Save } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PageHeader } from "@/components/ui/page-header"
import { saveCmsSection, getCmsSection } from "@/lib/actions/admin/cms"
import { toast } from "sonner"

type FieldDef = {
  key: string
  label: string
  type: "text" | "textarea"
}

type CmsPageEditorProps = {
  page: string
  title: string
  description: string
  fields: FieldDef[]
}

export function CmsPageEditor({
  page,
  title,
  description,
  fields,
}: CmsPageEditorProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const data = await getCmsSection(page, "content")
      if (data) setValues(data)
      setLoading(false)
    }
    load()
  }, [page])

  const handleSave = useCallback(async () => {
    setSaving(true)
    const res = await saveCmsSection(page, "content", JSON.stringify(values))
    if (res.success) toast.success("Content saved")
    else toast.error(res.error || "Failed to save")
    setSaving(false)
  }, [page, values])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <PageHeader title={title} description={description}>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </PageHeader>

      <Card className="p-6 space-y-5">
        {fields.map((field) => (
          <div key={field.key} className="space-y-2">
            <Label htmlFor={field.key}>{field.label}</Label>
            {field.type === "textarea" ? (
              <Textarea
                id={field.key}
                value={values[field.key] || ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.key]: e.target.value }))
                }
                rows={3}
              />
            ) : (
              <Input
                id={field.key}
                value={values[field.key] || ""}
                onChange={(e) =>
                  setValues((v) => ({ ...v, [field.key]: e.target.value }))
                }
              />
            )}
          </div>
        ))}
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"

import { CmsPageEditor } from "../cms-page-editor"

export default function ContactCmsPage() {
  return (
    <CmsPageEditor
      page="contact"
      title="Contact Page"
      description="Edit your contact page information"
      fields={[
        { key: "hero_title", label: "Hero Title", type: "text" },
        { key: "hero_subtitle", label: "Hero Subtitle", type: "text" },
        { key: "email", label: "Email Address", type: "text" },
        { key: "phone", label: "Phone Number", type: "text" },
        { key: "whatsapp", label: "WhatsApp Number", type: "text" },
        { key: "address", label: "Physical Address", type: "text" },
        { key: "hours", label: "Business Hours", type: "text" },
        { key: "google_maps_url", label: "Google Maps URL", type: "text" },
      ]}
    />
  )
}

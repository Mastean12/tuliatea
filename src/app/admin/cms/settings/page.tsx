export const dynamic = "force-dynamic"

import { CmsPageEditor } from "../cms-page-editor"

export default function SettingsCmsPage() {
  return (
    <CmsPageEditor
      page="settings"
      title="Website Settings"
      description="Manage site-wide settings and SEO"
      fields={[
        { key: "site_name", label: "Site Name", type: "text" },
        { key: "tagline", label: "Tagline", type: "text" },
        { key: "description", label: "SEO Description", type: "textarea" },
        {
          key: "keywords",
          label: "Meta Keywords (comma separated)",
          type: "text",
        },
        { key: "og_image", label: "Default OG Image URL", type: "text" },
        { key: "twitter_handle", label: "Twitter Handle", type: "text" },
        { key: "currency", label: "Currency", type: "text" },
      ]}
    />
  )
}

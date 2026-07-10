export const dynamic = "force-dynamic"

import { CmsPageEditor } from "../cms-page-editor"

export default function HomepageCmsPage() {
  return (
    <CmsPageEditor
      page="homepage"
      title="Homepage"
      description="Edit your homepage content"
      fields={[
        { key: "hero_title", label: "Hero Title", type: "text" },
        { key: "hero_subtitle", label: "Hero Subtitle", type: "textarea" },
        { key: "hero_cta_primary", label: "Primary CTA Text", type: "text" },
        {
          key: "hero_cta_secondary",
          label: "Secondary CTA Text",
          type: "text",
        },
        {
          key: "features_title",
          label: "Features Section Title",
          type: "text",
        },
        {
          key: "features_subtitle",
          label: "Features Section Subtitle",
          type: "text",
        },
        { key: "promise_title", label: "Promise Section Title", type: "text" },
        {
          key: "promise_paragraph_1",
          label: "Promise Paragraph 1",
          type: "textarea",
        },
        {
          key: "promise_paragraph_2",
          label: "Promise Paragraph 2",
          type: "textarea",
        },
        {
          key: "promise_paragraph_3",
          label: "Promise Paragraph 3",
          type: "textarea",
        },
        { key: "cta_title", label: "CTA Title", type: "text" },
        { key: "cta_subtitle", label: "CTA Subtitle", type: "text" },
      ]}
    />
  )
}

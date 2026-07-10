export const dynamic = "force-dynamic"

import { CmsPageEditor } from "../cms-page-editor"

export default function AboutCmsPage() {
  return (
    <CmsPageEditor
      page="about"
      title="About Page"
      description="Edit your about page content"
      fields={[
        { key: "hero_title", label: "Hero Title", type: "text" },
        { key: "hero_subtitle", label: "Hero Subtitle", type: "text" },
        { key: "story_title", label: "Story Title", type: "text" },
        { key: "story_subtitle", label: "Story Subtitle", type: "text" },
        {
          key: "story_paragraph_1",
          label: "Story Paragraph 1",
          type: "textarea",
        },
        {
          key: "story_paragraph_2",
          label: "Story Paragraph 2",
          type: "textarea",
        },
        {
          key: "story_paragraph_3",
          label: "Story Paragraph 3",
          type: "textarea",
        },
        {
          key: "story_paragraph_4",
          label: "Story Paragraph 4",
          type: "textarea",
        },
        { key: "mission_title", label: "Mission Title", type: "text" },
        { key: "mission_body", label: "Mission Body", type: "textarea" },
        { key: "vision_title", label: "Vision Title", type: "text" },
        { key: "vision_body", label: "Vision Body", type: "textarea" },
        { key: "values_title", label: "Values Title", type: "text" },
        {
          key: "sustainability_title",
          label: "Sustainability Title",
          type: "text",
        },
        {
          key: "sustainability_body",
          label: "Sustainability Body",
          type: "textarea",
        },
        { key: "cta_title", label: "CTA Title", type: "text" },
        { key: "cta_subtitle", label: "CTA Subtitle", type: "text" },
      ]}
    />
  )
}

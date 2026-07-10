export const dynamic = "force-dynamic"

import { CmsPageEditor } from "../cms-page-editor"

export default function FooterCmsPage() {
  return (
    <CmsPageEditor
      page="footer"
      title="Footer"
      description="Edit your website footer content"
      fields={[
        { key: "description", label: "Footer Description", type: "textarea" },
        { key: "instagram", label: "Instagram URL", type: "text" },
        { key: "facebook", label: "Facebook URL", type: "text" },
        { key: "twitter", label: "Twitter/X URL", type: "text" },
        { key: "linkedin", label: "LinkedIn URL", type: "text" },
        { key: "tiktok", label: "TikTok URL", type: "text" },
        { key: "copyright", label: "Copyright Text", type: "text" },
      ]}
    />
  )
}

import type { Metadata } from "next"
import { siteConfig } from "./site"

type MetadataProps = {
  title?: string
  description?: string
  path?: string
  image?: string
  noIndex?: boolean
}

export function createMetadata({
  title,
  description,
  path,
  image,
  noIndex,
}: MetadataProps = {}): Metadata {
  const url = path ? `${siteConfig.url}${path}` : siteConfig.url
  const ogImage = image || `${siteConfig.url}/images/Tulliatealogo.png`

  return {
    title: title
      ? { default: title, template: `%s | ${siteConfig.name}` }
      : { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
    description: description || siteConfig.description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      url,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: title || siteConfig.name,
      description: description || siteConfig.description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    alternates: { canonical: url },
  }
}

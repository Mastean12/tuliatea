import type { MetadataRoute } from "next"
import { siteConfig } from "@/config/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "Tullia Tea",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#2E7D32",
    icons: [
      { src: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { src: "/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
      { src: "/images/Tulliatealogo.png", sizes: "192x192", type: "image/png" },
      { src: "/images/Tulliatealogo.png", sizes: "512x512", type: "image/png" },
    ],
  }
}

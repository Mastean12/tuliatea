export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { MediaLibrary } from "./media-library"

export default async function MediaPage() {
  const media = await prisma.media.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  })

  return <MediaLibrary initialMedia={JSON.parse(JSON.stringify(media))} />
}

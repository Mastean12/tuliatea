import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

async function requireAdmin() {
  const session = await auth()
  if (
    !session?.user ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  ) {
    return false
  }
  return true
}

export async function POST(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const media = await prisma.media.create({
      data: {
        url: body.url,
        publicId: body.publicId || null,
        width: body.width || null,
        height: body.height || null,
        format: body.format || null,
        alt: body.alt || null,
      },
    })

    return NextResponse.json({ success: true, data: media })
  } catch (error) {
    console.error("Media save error:", error)
    return NextResponse.json({ error: "Failed to save media" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = new URL(request.url).searchParams.get("id")
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 })
    }

    const media = await prisma.media.findUnique({ where: { id } })
    if (!media) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // Delete from Cloudinary if publicId exists
    if (media.publicId) {
      try {
        await cloudinary.uploader.destroy(media.publicId)
      } catch {
        // Cloudinary delete failure is non-fatal
      }
    }

    await prisma.media.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Media delete error:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}

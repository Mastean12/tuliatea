import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(request: NextRequest) {
  const session = await auth()
  if (
    !session?.user ||
    (session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN")
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null
    if (!file)
      return NextResponse.json({ error: "No file provided" }, { status: 400 })

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    type CloudinaryRes = {
      secure_url: string
      public_id: string
      width: number
      height: number
      format: string
    }
    const result = await new Promise<CloudinaryRes>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "tuliatea", resource_type: "auto" },
        (err, res) => {
          if (err) reject(err)
          else resolve(res as CloudinaryRes)
        }
      )
      uploadStream.end(buffer)
    })

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}

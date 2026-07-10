import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export type UploadResult = {
  url: string
  publicId: string
  width: number
  height: number
  format: string
}

export async function uploadImage(
  file: string,
  folder = "tuliatea"
): Promise<UploadResult> {
  const result = await cloudinary.uploader.upload(file, {
    folder,
    useFilename: true,
    uniqueFilename: true,
    overwrite: false,
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
  }
}

export async function uploadImages(
  files: string[],
  folder = "tuliatea"
): Promise<UploadResult[]> {
  return Promise.all(files.map((file) => uploadImage(file, folder)))
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

export async function deleteImages(publicIds: string[]): Promise<void> {
  await Promise.all(publicIds.map((id) => deleteImage(id)))
}

export function getImageUrl(
  publicId: string,
  options?: Record<string, unknown>
): string {
  return cloudinary.url(publicId, {
    secure: true,
    fetch_format: "auto",
    quality: "auto",
    ...options,
  })
}

export function getProductImageUrl(
  publicId: string,
  width = 600,
  height = 600
): string {
  return cloudinary.url(publicId, {
    secure: true,
    width,
    height,
    crop: "fill",
    fetch_format: "auto",
    quality: "auto",
  })
}

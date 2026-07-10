import { z } from "zod"

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(1),
  AUTH_URL: z.string().url().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_NAME: z.string().optional(),
  NEXT_PUBLIC_SITE_DESCRIPTION: z.string().optional(),
})

export function validateEnv() {
  try {
    envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.issues.map((e) => e.path.join(".")).join(", ")
      throw new Error(
        `Environment validation failed. Missing or invalid: ${missing}`
      )
    }
    throw error
  }
}

export function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] || fallback
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`)
  }
  return value
}

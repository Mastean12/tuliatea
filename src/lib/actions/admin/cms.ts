"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/current-user"

export type CmsState = { success?: boolean; error?: string }

export async function saveCmsSection(
  page: string,
  section: string,
  content: string
): Promise<CmsState> {
  try {
    await requireAdmin()

    await prisma.cmsSection.upsert({
      where: { page_section: { page, section } },
      update: { content },
      create: { page, section, content },
    })

    revalidatePath(`/admin/cms/${page}`)
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message || "Failed to save content" }
  }
}

export async function getCmsSection(page: string, section: string) {
  try {
    const entry = await prisma.cmsSection.findUnique({
      where: { page_section: { page, section } },
    })
    return entry?.content ? JSON.parse(entry.content) : null
  } catch {
    return null
  }
}

export async function saveSiteSetting(
  key: string,
  value: string
): Promise<CmsState> {
  try {
    await requireAdmin()
    await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
    return { success: true }
  } catch (error) {
    return { error: (error as Error).message || "Failed to save setting" }
  }
}

export async function getSiteSetting(key: string) {
  try {
    const entry = await prisma.siteSetting.findUnique({ where: { key } })
    return entry?.value || null
  } catch {
    return null
  }
}

import { logger } from "./logger"

const store = new Map<string, { count: number; resetAt: number }>()

type RateLimitConfig = {
  limit: number
  windowMs: number
}

const defaults: RateLimitConfig = {
  limit: 10,
  windowMs: 60 * 1000,
}

export function rateLimit(key: string, config: Partial<RateLimitConfig> = {}) {
  const { limit, windowMs } = { ...defaults, ...config }
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { success: true, remaining: limit - 1 }
  }

  if (entry.count >= limit) {
    logger.warn(`Rate limit exceeded for ${key}`)
    return { success: false, remaining: 0 }
  }

  entry.count++
  return { success: true, remaining: limit - entry.count }
}

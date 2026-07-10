import { NextResponse } from "next/server"
import { logger } from "./logger"

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function successResponse<T>(
  data: T,
  status = 200,
  message?: string
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data, message }, { status })
}

export function errorResponse(
  error: string,
  status = 400
): NextResponse<ApiResponse> {
  logger.error(error)
  return NextResponse.json({ success: false, error }, { status })
}

export function handleApiError(
  error: unknown,
  defaultMessage = "Something went wrong"
): NextResponse<ApiResponse> {
  const message = error instanceof Error ? error.message : defaultMessage
  logger.error(message, error)
  return NextResponse.json({ success: false, error: message }, { status: 500 })
}

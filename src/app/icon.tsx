import { ImageResponse } from "next/og"

export const size = { width: 256, height: 256 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: 256,
        height: 256,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#2E7D32",
        borderRadius: 48,
      }}
    >
      <svg width="180" height="180" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="white" opacity="0.2" />
        <path
          d="M35 25 C35 25, 50 20, 65 25 C75 30, 80 45, 75 55 C70 65, 55 70, 50 75 C45 70, 30 65, 25 55 C20 45, 25 30, 35 25Z"
          fill="white"
        />
      </svg>
    </div>,
    { width: 256, height: 256 }
  )
}

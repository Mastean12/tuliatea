import Image from "next/image"
import Link from "next/link"
import { routes } from "@/config/routes"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-primary/[0.02]">
      <div className="flex items-center justify-between px-4 sm:px-8 py-5">
        <Link
          href={routes.home}
          className="flex items-center gap-3 font-heading"
        >
          <Image
            src="/images/Tulliatealogo.png"
            alt="Tullia Tea"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="text-primary tracking-wider">
            <strong className="font-extrabold">Tullia</strong>{" "}
            <span className="font-normal">Tea</span>
          </span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border bg-card p-6 sm:p-8 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

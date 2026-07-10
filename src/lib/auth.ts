import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/account/login",
    newUser: "/account/register",
    error: "/account/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string
        const password = credentials?.password as string

        if (!email || !password) return null

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user || !user.passwordHash || !user.isActive) return null

        const isValid = await bcrypt.compare(password, user.passwordHash)

        if (!isValid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id as string
        token.role = user.role as string
      }

      if (trigger === "update") {
        const fresh = await prisma.user.findUnique({
          where: { id: token.id },
          select: { name: true, email: true, image: true, role: true },
        })
        if (fresh) {
          token.name = fresh.name
          token.email = fresh.email
          token.picture = fresh.image
          token.role = fresh.role
        }
      }

      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email as string
        session.user.image = token.picture
        session.user.role = (token.role as string) || "CUSTOMER"
      }
      return session
    },
  },
})

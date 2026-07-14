import prisma from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Nodemailer from "next-auth/providers/nodemailer"

const demoEmail = process.env.DEMO_LOGIN_EMAIL?.trim().toLowerCase() ?? "demo@invoicepilot.com"
const demoPassword = process.env.DEMO_LOGIN_PASSWORD ?? "demo123456"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const email = credentials?.email?.toString().trim().toLowerCase()
                const password = credentials?.password?.toString()

                if (!email || !password) {
                    return null
                }

                if (email !== demoEmail || password !== demoPassword) {
                    return null
                }

                let user = await prisma.user.findUnique({
                    where: { email: demoEmail },
                })

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            email: demoEmail,
                            emailVerified: new Date(),
                        },
                    })
                }

                return {
                    id: user.id,
                    name: "InvoicePilot Demo User",
                    email: user.email,
                    image: user.image ?? null,
                }
            },
        }),
        Nodemailer({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT ? Number(process.env.EMAIL_SERVER_PORT) : undefined,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
    ],

    pages: {
        signIn: '/login',
        verifyRequest: '/verify'
    }
})
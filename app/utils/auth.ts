import prisma from "@/lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import CredentialsProvider from "next-auth/providers/credentials";
import { seedDemoUser } from "./demoSeed";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    providers: [
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
        CredentialsProvider({
            id: "demo-login",
            name: "Demo Account",
            credentials: {},
            async authorize() {
                const demoUser = await seedDemoUser();
                return {
                    id: demoUser.id,
                    email: demoUser.email,
                    name: `${demoUser.firstName ?? "Demo"} ${demoUser.lastName ?? "User"}`.trim(),
                };
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = (token.id || token.sub) as string;
            }
            return session;
        },
    },

    pages: {
        verifyRequest: '/verify'
    }
})
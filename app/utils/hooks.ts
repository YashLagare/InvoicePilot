import { redirect } from "next/navigation";
import { auth } from "./auth";
import prisma from "@/lib/db";

export async function requireUser() {
    const session = await auth();

    if (!session?.user) {
        return redirect("/");
    }

    // Fail-safe: Ensure session.user.id is always populated
    if (!session.user.id && session.user.email) {
        const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: { id: true }
        });
        if (dbUser) {
            session.user.id = dbUser.id;
        }
    }

    if (!session.user.id) {
        return redirect("/login");
    }

    return session;
}

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import prisma from "@/lib/db";
import Logo from "@/public/logo (2).png";
import { MenuIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import DashboardLinks from "../components/DashboardLinks";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";

async function getUser(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            address: true,
        },
    });

    if (!data?.firstName || !data?.lastName || !data?.address) {
        redirect("/onboarding");
    }
    return data;
}

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
    const session = await requireUser();
    const data = await getUser(session.user?.id as string);
    return (
        <>
            <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex flex-col max-h-screen h-full gap-2">
                        <div className="h-14 flex items-center justify-center border-b px-4 lg:h-[60px] lg:px-6">
                            <Link href="/" className="flex items-center">
                                <Image src={Logo} alt="Invoice" className="w-32 h-auto" />
                            </Link>
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4 mt-4">
                                <DashboardLinks />
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                                    <MenuIcon className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <nav className="grid gap-2 mt-10">
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>

                        <div className="flex items-center ml-auto">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="rounded-full" variant="outline" size="icon">
                                        <UserIcon className="size-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">Dashboard</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/invoices">Invoices</Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <form
                                        className="w-full"
                                        action={async () => {
                                            "use server";
                                            await signOut({ redirectTo: "/login" });
                                        }}
                                    >
                                        <DropdownMenuItem asChild>
                                            <button className="w-full text-left">Logout</button>
                                        </DropdownMenuItem>
                                    </form>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                    </header>
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout

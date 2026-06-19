import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Toaster } from "@/components/ui/sonner";
import prisma from "@/lib/db";
import { FileText, LogOut, MenuIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import DashboardLinks from "../components/DashboardLinks";
import { signOut } from "../utils/auth";
import { requireUser } from "../utils/hooks";
import { ModeToggle } from "../components/ModeToggle";

async function getUser(userId: string) {
    const data = await prisma.user.findUnique({
        where: { id: userId },
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
            <div className="grid min-h-screen w-full md:grid-cols-[240px_1fr] lg:grid-cols-[260px_1fr] bg-slate-50 dark:bg-slate-950">

                {/* ── Sidebar ── */}
                <aside className="hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 h-screen">

                    {/* Logo */}
                    <div className="h-16 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                        <Link href="/" className="flex items-center gap-2.5">
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                Invoice<span className="text-blue-600">Pilot</span>
                            </span>
                        </Link>
                    </div>

                    {/* Nav */}
                    <nav className="flex-1 px-3 py-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">
                            Menu
                        </p>
                        <DashboardLinks />
                    </nav>

                    {/* User footer */}
                    <div className="border-t border-slate-100 dark:border-slate-800 p-4">
                        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                                <UserIcon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                                    {data.firstName} {data.lastName}
                                </p>
                                <p className="text-xs text-slate-400 truncate">Account</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* ── Main ── */}
                <div className="flex flex-col min-h-screen">

                    {/* Header */}
                    <header className="h-16 flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 lg:px-6 sticky top-0 z-30">

                        {/* Mobile menu */}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden border-slate-200 dark:border-slate-800 rounded-xl"
                                >
                                    <MenuIcon className="size-4" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-64 p-0 bg-white dark:bg-slate-900">
                                <div className="h-16 flex items-center justify-center border-b border-slate-100 dark:border-slate-800">
                                    <Link href="/" className="flex items-center gap-2.5">
                                        <span className="text-2xl font-bold text-slate-900 dark:text-white">
                                            Invoice<span className="text-blue-600">Pilot</span>
                                        </span>
                                    </Link>
                                </div>
                                <nav className="px-3 py-4">
                                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 mb-2">
                                        Menu
                                    </p>
                                    <DashboardLinks />
                                </nav>
                            </SheetContent>
                        </Sheet>

                        {/* Page brand on mobile */}
                        <div className="flex items-center gap-2 md:hidden">
                            <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">InvoicePilot</span>
                        </div>

                        <div className="flex items-center gap-5 ml-auto">
                            <ModeToggle />
                            
                            <div className="flex items-center gap-3">
                                {/* User name — desktop only */}
                                <span className="hidden sm:block text-sm text-slate-500 dark:text-slate-400 font-medium">
                                    {data.firstName} {data.lastName}
                                </span>

                                {/* User dropdown */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="rounded-full border-slate-200 dark:border-slate-700 w-9 h-9 bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                                        >
                                            <UserIcon className="size-4 text-blue-700 dark:text-blue-400" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-52 rounded-xl shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                                        <DropdownMenuLabel className="font-normal px-3 py-2">
                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                                {data.firstName} {data.lastName}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">My Account</p>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard" className="cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                                                Dashboard
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/dashboard/invoices" className="cursor-pointer text-sm text-slate-700 dark:text-slate-300">
                                                Invoices
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                                        <form
                                            className="w-full"
                                            action={async () => {
                                                "use server";
                                                await signOut({ redirectTo: "/login" });
                                            }}
                                        >
                                            <DropdownMenuItem asChild>
                                                <button className="w-full text-left flex items-center gap-2 text-sm text-red-500 cursor-pointer">
                                                    <LogOut className="w-3.5 h-3.5" />
                                                    Logout
                                                </button>
                                            </DropdownMenuItem>
                                        </form>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                        {children}
                    </main>
                </div>
            </div>

            <Toaster richColors closeButton theme="system" />
        </>
    );
};

export default DashboardLayout;
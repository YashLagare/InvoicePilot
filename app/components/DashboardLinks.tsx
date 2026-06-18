"use client"

import { cn } from "@/lib/utils"
import { HomeIcon, ReceiptText } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const dashboardLinks = [
    {
        id: 0,
        name: "Dashboard",
        href: "/dashboard",
        icon: HomeIcon,
    },
    {
        id: 1,
        name: "Invoices",
        href: "/dashboard/invoices",
        icon: ReceiptText,
    },
]

const DashboardLinks = () => {
    const pathname = usePathname();

    return (
        <div className="flex flex-col gap-1">
            {dashboardLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                    <Link
                        href={link.href}
                        key={link.id}
                        className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                            isActive
                                ? "bg-blue-700 text-white shadow-sm shadow-blue-200"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                    >
                        <link.icon
                            className={cn(
                                "size-4 flex-shrink-0",
                                isActive ? "text-white" : "text-slate-400"
                            )}
                        />
                        {link.name}
                        {isActive && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
};

export default DashboardLinks;
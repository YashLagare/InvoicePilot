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
        <>
            {dashboardLinks.map((link) => (
                <Link
                    href={link.href}
                    key={link.id}
                    className={cn(
                        pathname === link.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all font-medium"
                    )}
                >
                    <link.icon className="size-5" />
                    {link.name}
                </Link>
            ))}
        </>
    )
}

export default DashboardLinks
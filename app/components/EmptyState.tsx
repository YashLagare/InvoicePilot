import { buttonVariants } from "@/components/ui/button";
import { FileText, PlusIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
    title: string;
    description: string;
    buttonText: string;
    href: string;
}

export function EmptyState({ title, description, buttonText, href }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-blue-600" />
            </div>
            <p className="text-slate-800 font-medium text-base mb-1">{title}</p>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">{description}</p>
            <Link
                href={href}
                className={buttonVariants({
                    className: "h-10 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-4 gap-2 shadow-sm shadow-blue-200 transition-all",
                })}
            >
                <PlusIcon className="w-4 h-4" />
                {buttonText}
            </Link>
        </div>
    );
}

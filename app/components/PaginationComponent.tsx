"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function PaginationComponent({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get("page")) || 1;

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-end gap-2 mt-4">
            <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage <= 1} 
                onClick={() => router.push(createPageURL(currentPage - 1))}
            >
                <ChevronLeft className="size-4" />
            </Button>
            <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage >= totalPages} 
                onClick={() => router.push(createPageURL(currentPage + 1))}
            >
                <ChevronRight className="size-4" />
            </Button>
        </div>
    );
}

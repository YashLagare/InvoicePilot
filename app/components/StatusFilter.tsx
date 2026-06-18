"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function StatusFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentStatus = searchParams.get("status") || "ALL";
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (selectedStatus === "ALL") {
            params.delete("status");
        } else {
            params.set("status", selectedStatus);
        }
        params.delete("page"); // Reset pagination when filter changes
        router.push(`${pathname}?${params.toString()}`);
    };

    const handleClear = () => {
        setSelectedStatus("ALL");
        const params = new URLSearchParams(searchParams.toString());
        params.delete("status");
        params.delete("page");
        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex items-center gap-2">
            <Select 
                value={selectedStatus} 
                onValueChange={setSelectedStatus}
            >
                <SelectTrigger className="w-[160px] h-10 rounded-xl bg-white border border-slate-200">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ALL">All Invoices</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                </SelectContent>
            </Select>

            <Button onClick={handleSearch} variant="secondary" className="h-10 rounded-xl px-4 gap-2 text-blue-700 bg-blue-50 hover:bg-blue-100">
                <Search className="w-4 h-4" />
                Search
            </Button>

            {currentStatus !== "ALL" && (
                <Button onClick={handleClear} variant="ghost" className="h-10 rounded-xl px-4 gap-2 text-slate-500 hover:bg-slate-100">
                    <X className="w-4 h-4" />
                    Clear
                </Button>
            )}
        </div>
    );
}

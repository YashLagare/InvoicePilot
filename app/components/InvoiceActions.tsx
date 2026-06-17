"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { CheckCircle2, DownloadCloudIcon, MailIcon, MoreHorizontalIcon, PencilIcon, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface invoiceActionProps {
    id: string;
}

const InvoiceActions = ({ id }: invoiceActionProps) => {
    const handleSendReminder = async () => {
        toast.promise(fetch(`/api/email/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        }), {
            loading: "Sending reminder email...",
            success: "Reminder email sent successfully!",
            error: "Failed to send reminder email.",
        }

        )
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}`}><PencilIcon className="size-4 mr-2" />Edit Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/api/invoice/${id}`} target="_blank"><DownloadCloudIcon className="size-4 mr-2" />Download Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSendReminder}>
                    <MailIcon className="size-4 mr-2" />Reminder Email
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/dashboard/invoices/${id}/delete`}><Trash2 className="size-4 mr-2" />Delete Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href=""><CheckCircle2 className="size-4 mr-2" />Mark as paid</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceActions
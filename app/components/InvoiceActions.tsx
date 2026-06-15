import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { CheckCircle2, DownloadCloudIcon, MailIcon, MoreHorizontalIcon, PencilIcon, Trash2 } from "lucide-react"
import Link from "next/link"

const InvoiceActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="secondary">
                    <MoreHorizontalIcon className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                    <Link href=""><PencilIcon className="size-4 mr-2" />Edit Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href=""><DownloadCloudIcon className="size-4 mr-2" />Download Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href=""><MailIcon className="size-4 mr-2" />Reminder Email</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href=""><Trash2 className="size-4 mr-2" />Delete Invoice</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href=""><CheckCircle2 className="size-4 mr-2" />Mark as paid</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default InvoiceActions
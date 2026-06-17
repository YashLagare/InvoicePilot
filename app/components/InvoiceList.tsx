import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/db";
import { formatCurrency } from "../utils/formatCurrency";
import { requireUser } from "../utils/hooks";
import InvoiceActions from "./InvoiceActions";

async function getData(userId: string) {
    const data = await prisma.invoice.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            clientName: true,
            total: true,
            createdAt: true,
            status: true,
            invoiceNumber: true,
            currency: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return data;
}

export async function InvoiceList(userId: string) {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((invoice) => (
                        <TableRow key={invoice.id}>
                            <TableCell>#{invoice.invoiceNumber}</TableCell>
                            <TableCell>{invoice.clientName}</TableCell>
                            <TableCell>
                                {formatCurrency({
                                    amount: invoice.total,
                                    currency: invoice.currency as any,
                                })}
                            </TableCell>
                            <TableCell>
                                <Badge>{invoice.status}</Badge>
                            </TableCell>
                            <TableCell>{new Date(invoice.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                                <InvoiceActions id={invoice.id} />
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default InvoiceList
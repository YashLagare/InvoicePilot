import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/db";
import { FileText } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { requireUser } from "../utils/hooks";
import InvoiceActions from "./InvoiceActions";
import PaginationComponent from "./PaginationComponent";

async function getData(userId: string, page: number, status: string) {
    const pageSize = 10;
    
    // Construct the where clause dynamically based on the status filter
    const whereClause: any = { userId };
    if (status && status !== "ALL") {
        whereClause.status = status;
    }

    const [data, totalCount] = await Promise.all([
        prisma.invoice.findMany({
            where: whereClause,
            select: {
                id: true,
                clientName: true,
                total: true,
                createdAt: true,
                status: true,
                invoiceNumber: true,
                currency: true,
            },
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * pageSize,
            take: pageSize,
        }),
        prisma.invoice.count({ where: whereClause }),
    ]);

    return { data, totalPages: Math.ceil(totalCount / pageSize) };
}

function StatusBadge({ status }: { status: string }) {
    const styles: Record<string, string> = {
        PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
        PENDING: "bg-amber-50 text-amber-700 border-amber-200",
        OVERDUE: "bg-red-50 text-red-700 border-red-200",
    };

    const dots: Record<string, string> = {
        PAID: "bg-emerald-500",
        PENDING: "bg-amber-500",
        OVERDUE: "bg-red-500",
    };

    const key = status?.toUpperCase();

    return (
        <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[key] ?? "bg-slate-50 text-slate-600 border-slate-200"
                }`}
        >
            <span
                className={`w-1.5 h-1.5 rounded-full ${dots[key] ?? "bg-slate-400"}`}
            />
            {status}
        </span>
    );
}

export async function InvoiceList({ page, status = "ALL" }: { page: number; status?: string }) {
    const session = await requireUser();
    const { data, totalPages } = await getData(session.user?.id as string, page, status);

    if (data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                    <FileText className="w-7 h-7 text-blue-600" />
                </div>
                <p className="text-slate-800 font-medium text-base mb-1">
                    {status !== "ALL" ? `No ${status.toLowerCase()} invoices found` : "No invoices yet"}
                </p>
                <p className="text-slate-400 text-sm">
                    {status !== "ALL" ? "Try changing your status filter." : "Create your first invoice to get started."}
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col">

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-200">
                            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide pl-5">Invoice</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Customer</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Amount</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</TableHead>
                            <TableHead className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right pr-5">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((invoice) => (
                            <TableRow
                                key={invoice.id}
                                className="border-b border-slate-100 hover:bg-slate-50/60 transition-colors"
                            >
                                <TableCell className="pl-5 py-4">
                                    <span className="text-sm font-semibold text-blue-700">
                                        #{invoice.invoiceNumber}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-xs font-semibold text-slate-600">
                                                {invoice.clientName?.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-medium text-slate-800">{invoice.clientName}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-sm font-semibold text-slate-900">
                                        {formatCurrency({ amount: invoice.total, currency: invoice.currency as any })}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4">
                                    <StatusBadge status={invoice.status} />
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-sm text-slate-500">
                                        {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        })}
                                    </span>
                                </TableCell>
                                <TableCell className="py-4 text-right pr-5">
                                    <InvoiceActions status={invoice.status} id={invoice.id} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden flex flex-col divide-y divide-slate-100">
                {data.map((invoice) => (
                    <div key={invoice.id} className="px-4 py-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-blue-700">
                                #{invoice.invoiceNumber}
                            </span>
                            <StatusBadge status={invoice.status} />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                    <span className="text-xs font-semibold text-slate-600">
                                        {invoice.clientName?.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm font-medium text-slate-800">{invoice.clientName}</span>
                            </div>
                            <span className="text-sm font-semibold text-slate-900">
                                {formatCurrency({ amount: invoice.total, currency: invoice.currency as any })}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400">
                                {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                })}
                            </span>
                            <InvoiceActions status={invoice.status} id={invoice.id} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="border-t border-slate-100 px-5 py-4">
                    <PaginationComponent totalPages={totalPages} />
                </div>
            )}
        </div>
    );
}

export default InvoiceList;
import prisma from "@/lib/db";
import { TrendingUp } from "lucide-react";
import { requireUser } from "../utils/hooks";
import { EmptyState } from "./EmptyState";
import Graph from "./Graph";

async function getInvoices(userId: string) {
    const rawData = await prisma.invoice.findMany({
        where: {
            status: "PAID",
            userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            },
        },
        select: { createdAt: true, total: true },
        orderBy: { createdAt: "asc" },
    });

    const aggregateData = rawData.reduce((acc: { [key: string]: number }, curr) => {
        const date = new Date(curr.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
        acc[date] = (acc[date] || 0) + curr.total;
        return acc;
    }, {});

    return Object.entries(aggregateData)
        .map(([date, amount]) => ({ date, amount }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

const InvoiceGraph = async () => {
    const session = await requireUser();
    const data = await getInvoices(session.user?.id as string);

    return (
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Revenue Overview</h3>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Paid invoices in the last 30 days</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/50 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-700 dark:text-blue-400" />
                </div>
            </div>

            <div className="p-5">
                {data.length === 0 ? (
                    <EmptyState
                        title="No revenue data yet"
                        description="You don't have any paid invoices in the last 30 days."
                        buttonText="Create Invoice"
                        href="/dashboard/invoices/create"
                    />
                ) : (
                    <Graph data={data} />
                )}
            </div>
        </div>
    );
};

export default InvoiceGraph;
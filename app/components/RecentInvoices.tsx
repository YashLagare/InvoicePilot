import prisma from "@/lib/db";
import { Clock } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { requireUser } from "../utils/hooks";
import { EmptyState } from "./EmptyState";

async function getData(userId: string) {
    return prisma.invoice.findMany({
        where: { userId },
        select: {
            id: true,
            clientName: true,
            clientEmail: true,
            total: true,
            currency: true,
        },
        orderBy: { createdAt: "desc" },
        take: 6,
    });
}

const RecentInvoices = async () => {
    const session = await requireUser();
    const data = await getData(session.user?.id as string);

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-100">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">Recent Invoices</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Latest 6 invoices</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-blue-700" />
                </div>
            </div>

            <div className="flex flex-col divide-y divide-slate-100">
                {data.length === 0 ? (
                    <div className="p-5">
                        <EmptyState
                            title="No recent invoices"
                            description="Create an invoice to see it here."
                            buttonText="Create Invoice"
                            href="/dashboard/invoices/create"
                        />
                    </div>
                ) : (
                    data.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-semibold text-blue-700">
                                    {item.clientName.slice(0, 2).toUpperCase()}
                                </span>
                            </div>

                            {/* Name + email */}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-800 truncate leading-none mb-0.5">
                                    {item.clientName}
                                </p>
                                <p className="text-xs text-slate-400 truncate">{item.clientEmail}</p>
                            </div>

                            {/* Amount */}
                            <span className="text-sm font-semibold text-emerald-600 flex-shrink-0">
                                +{formatCurrency({ amount: item.total, currency: item.currency as any })}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentInvoices;
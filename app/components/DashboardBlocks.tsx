import prisma from "@/lib/db";
import { ActivitySquare, CreditCard, IndianRupee, Users } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { requireUser } from "../utils/hooks";

async function getData(userId: string) {
  const [data, openInvoices, paidInvoices] = await Promise.all([
    prisma.invoice.findMany({
      where: { userId },
      select: { total: true },
    }),
    prisma.invoice.findMany({
      where: { userId, status: "PENDING" },
      select: { id: true },
    }),
    prisma.invoice.findMany({
      where: { userId, status: "PAID" },
      select: { id: true },
    }),
  ]);
  return { data, openInvoices, paidInvoices };
}

const DashboardBlocks = async () => {
  const session = await requireUser();
  const { data, openInvoices, paidInvoices } = await getData(session.user?.id as string);

  const totalRevenue = data.reduce((acc, invoice) => acc + invoice.total, 0);

  const blocks = [
    {
      title: "Total Revenue",
      value: formatCurrency({ amount: totalRevenue, currency: "INR" }),
      sub: "Based on all invoices",
      icon: IndianRupee,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-700",
      accent: "border-l-4 border-l-blue-700",
    },
    {
      title: "Total Invoices",
      value: `+${data.length}`,
      sub: "Invoices issued in total",
      icon: Users,
      iconBg: "bg-violet-50",
      iconColor: "text-violet-700",
      accent: "border-l-4 border-l-violet-500",
    },
    {
      title: "Paid Invoices",
      value: `${paidInvoices.length}`,
      sub: "Successfully collected",
      icon: CreditCard,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-700",
      accent: "border-l-4 border-l-emerald-500",
    },
    {
      title: "Open Invoices",
      value: `+${openInvoices.length}`,
      sub: "Awaiting payment",
      icon: ActivitySquare,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-700",
      accent: "border-l-4 border-l-amber-500",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {blocks.map(({ title, value, sub, icon: Icon, iconBg, iconColor, accent }) => (
        <div
          key={title}
          className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4 ${accent}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 tracking-tight">{value}</p>
            <p className="text-xs text-slate-400 mt-1">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardBlocks;
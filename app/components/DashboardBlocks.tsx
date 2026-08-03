import prisma from "@/lib/db";
import { ActivitySquare, CreditCard, DollarSign, Users } from "lucide-react";
import { formatCurrency } from "../utils/formatCurrency";
import { requireUser } from "../utils/hooks";

async function getData(userId: string) {
  const [invoices, clients, companyProfile] = await Promise.all([
    prisma.invoice.findMany({
      where: { userId },
      select: { total: true, status: true, amountPaid: true, balance: true, currency: true },
    }),
    prisma.client.count({
      where: { userId },
    }),
    prisma.companyProfile.findUnique({
      where: { userId },
      select: { defaultCurrency: true },
    }),
  ]);
  return { invoices, clients, currency: companyProfile?.defaultCurrency || "USD" };
}

const DashboardBlocks = async () => {
  const session = await requireUser();
  const { invoices, clients, currency } = await getData(session.user?.id as string);

  const totalCollected = invoices
    .filter((inv) => inv.status === "PAID")
    .reduce((acc, inv) => acc + (inv.amountPaid || inv.total), 0);

  const totalOutstanding = invoices
    .filter((inv) => inv.status === "PENDING" || inv.status === "SENT" || inv.status === "OVERDUE")
    .reduce((acc, inv) => acc + (inv.balance || inv.total), 0);

  const paidCount = invoices.filter((inv) => inv.status === "PAID").length;
  const openCount = invoices.filter((inv) => inv.status !== "PAID" && inv.status !== "CANCELLED").length;

  const blocks = [
    {
      title: "Collected Revenue",
      value: formatCurrency({ amount: totalCollected, currency }),
      sub: `${paidCount} settled invoices`,
      icon: DollarSign,
      iconBg: "bg-emerald-50 dark:bg-emerald-900/50",
      iconColor: "text-emerald-700 dark:text-emerald-400",
      accent: "border-l-4 border-l-emerald-600 dark:border-l-emerald-500",
    },
    {
      title: "Pending Receivables",
      value: formatCurrency({ amount: totalOutstanding, currency }),
      sub: `${openCount} unpaid invoices`,
      icon: ActivitySquare,
      iconBg: "bg-amber-50 dark:bg-amber-900/50",
      iconColor: "text-amber-700 dark:text-amber-400",
      accent: "border-l-4 border-l-amber-500 dark:border-l-amber-400",
    },
    {
      title: "Active Clients",
      value: `${clients}`,
      sub: "Saved client profiles",
      icon: Users,
      iconBg: "bg-blue-50 dark:bg-blue-900/50",
      iconColor: "text-blue-700 dark:text-blue-400",
      accent: "border-l-4 border-l-blue-600 dark:border-l-blue-500",
    },
    {
      title: "Total Invoices",
      value: `${invoices.length}`,
      sub: "Total invoices generated",
      icon: CreditCard,
      iconBg: "bg-violet-50 dark:bg-violet-900/50",
      iconColor: "text-violet-700 dark:text-violet-400",
      accent: "border-l-4 border-l-violet-500 dark:border-l-violet-400",
    },
  ];

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {blocks.map(({ title, value, sub, icon: Icon, iconBg, iconColor, accent }) => (
        <div
          key={title}
          className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex flex-col gap-4 ${accent}`}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{title}</p>
            <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">{value}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardBlocks;
import { FileText } from "lucide-react";
import DashboardBlocks from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";
import RecentInvoices from "../components/RecentInvoices";
import { requireUser } from "../utils/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900 leading-none mb-1">Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back! Here's what's happening.</p>
        </div>
      </div>

      {/* Stat Blocks */}
      <DashboardBlocks />

      {/* Graph + Recent */}
      <div className="grid gap-4 lg:grid-cols-3 md:gap-6">
        <InvoiceGraph />
        <RecentInvoices />
      </div>

    </div>
  );
};

export default DashboardPage;
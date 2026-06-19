import InvoiceList from "@/app/components/InvoiceList";
import StatusFilter from "@/app/components/StatusFilter";
import { buttonVariants } from "@/components/ui/button";
import { FileText, PlusIcon } from "lucide-react";
import Link from "next/link";

type SearchParams = Promise<{ page?: string; status?: string }>;

const InvoicesRoute = async ({ searchParams }: { searchParams: SearchParams }) => {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const status = params.status || "ALL";

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-none mb-1">Invoices</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage and track all your invoices</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusFilter />
          <Link
            href="/dashboard/invoices/create"
            className={buttonVariants({
              className: "h-10 rounded-xl !bg-blue-600 hover:!bg-blue-700 !text-white text-sm font-medium px-4 gap-2 shadow-sm shadow-blue-200 dark:shadow-none transition-all",
            })}
          >
            <PlusIcon className="w-4 h-4" />
            Create Invoice
          </Link>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <InvoiceList page={page} status={status} />
      </div>

    </div>
  )
}

export default InvoicesRoute
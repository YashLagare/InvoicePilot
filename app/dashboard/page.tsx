
import DashboardBlocks from "../components/DashboardBlocks";
import InvoiceGraph from "../components/InvoiceGraph";
import RecentInvoices from "../components/RecentInvoices";
import { requireUser } from "../utils/hooks";

const DashboardPage = async () => {
  const session = await requireUser();
  return (
    <>

      <DashboardBlocks/>
      <div className="grid gap-4 lg:grid-cols-3 md:gap-8">
          <InvoiceGraph/>
          <RecentInvoices/>
      </div>

    </>
  )
}

export default DashboardPage
import CreateInvoice from "@/app/components/CreateInvoice";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { FileText } from "lucide-react";

async function getUserData(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });

  const clients = await prisma.client.findMany({
    where: { userId: userId },
    orderBy: { name: "asc" },
  });

  const companyProfile = await prisma.companyProfile.findUnique({
    where: { userId: userId },
  });

  // Calculate next invoice number automatically
  const lastInvoice = await prisma.invoice.findFirst({
    where: { userId: userId },
    orderBy: { invoiceNumber: "desc" },
    select: { invoiceNumber: true },
  });

  const nextInvoiceNumber = (lastInvoice?.invoiceNumber || 0) + 1;

  return { user, clients, companyProfile, nextInvoiceNumber };
}

const InvoiceCreationPage = async () => {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <div className="flex flex-col gap-6 p-4 lg:p-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100 leading-none mb-1">
            Create Invoice
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Fill in details with live visual preview and automated calculations.
          </p>
        </div>
      </div>

      <CreateInvoice
        firstName={data.user?.firstName as string}
        lastName={data.user?.lastName as string}
        email={data.user?.email as string}
        address={data.user?.address as string}
        clients={data.clients}
        companyProfile={data.companyProfile}
        nextInvoiceNumber={data.nextInvoiceNumber}
      />
    </div>
  );
};

export default InvoiceCreationPage;
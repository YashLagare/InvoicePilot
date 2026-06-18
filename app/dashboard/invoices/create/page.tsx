import CreateInvoice from "@/app/components/CreateInvoice";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { FileText } from "lucide-react";

async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    },
  });
  return data;
}

const InvoiceCreationPage = async () => {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string);

  return (
    <div className="flex flex-col gap-6">

      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900 leading-none mb-1">Create Invoice</h1>
          <p className="text-sm text-slate-500">Fill in the details below to generate and send an invoice.</p>
        </div>
      </div>

      <CreateInvoice
        firstName={data?.firstName as string}
        lastName={data?.lastName as string}
        email={data?.email as string}
        address={data?.address as string}
      />
    </div>
  );
};

export default InvoiceCreationPage;
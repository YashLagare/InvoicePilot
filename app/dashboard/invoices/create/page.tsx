import CreateInvoice from "@/app/components/CreateInvoice";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";


async function getUserData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      firstName: true,
      lastName: true,
      address: true,
      email: true,
    }
  });

  return data;
}

async function InvoiceCreationPage(userId: string) {
  const session = await requireUser();
  const data = await getUserData(session.user?.id as string)

  return (
    <CreateInvoice
      firstName={data?.firstName as string}
      lastName={data?.lastName as string}
      email={data?.email as string}
      address={data?.address as string} />
  )
}

export default InvoiceCreationPage
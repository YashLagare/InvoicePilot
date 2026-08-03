import EditInvoicePage from "@/app/components/EditInvoice";
import { requireUser } from "@/app/utils/hooks";
import prisma from "@/lib/db";
import { notFound } from "next/navigation";

async function getData(invoiceId: string, userId: string) {
    const invoice = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
        include: {
            items: true,
        },
    });

    if (!invoice) {
        return notFound();
    }

    const clients = await prisma.client.findMany({
        where: { userId: userId },
        orderBy: { name: "asc" },
    });

    const companyProfile = await prisma.companyProfile.findUnique({
        where: { userId: userId },
    });

    return { invoice, clients, companyProfile };
}

type Params = Promise<{ invoiceId: string }>;

export default async function EditInvoiceRoute({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requireUser();
    const { invoice, clients, companyProfile } = await getData(invoiceId, session.user?.id as string);

    return (
        <EditInvoicePage
            data={invoice}
            clients={clients}
            companyProfile={companyProfile}
        />
    );
}
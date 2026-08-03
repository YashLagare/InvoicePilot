import prisma from "@/lib/db";
import { requireUser } from "@/app/utils/hooks";
import { notFound } from "next/navigation";
import EditClientForm from "@/app/dashboard/clients/[clientId]/edit/EditClientForm";

async function getClient(clientId: string, userId: string) {
    const data = await prisma.client.findUnique({
        where: {
            id: clientId,
            userId: userId,
        },
    });
    return data;
}

export default async function EditClientPage({ params }: { params: Promise<{ clientId: string }> }) {
    const session = await requireUser();
    const { clientId } = await params;
    const client = await getClient(clientId, session.user?.id as string);

    if (!client) {
        return notFound();
    }

    return <EditClientForm client={client} />;
}

import { requireUser } from "@/app/utils/hooks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";


async function Authorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    });

    if (!data) {
        return redirect("/dashboard/invoices");
    }
}

type Params = Promise<{ invoiceId: string }>;


export default async function DeleteInvoiceRoute({
    params,
}: {
    params: Params
}) {
    const session = await requireUser();
    const { invoiceId } = await params;
    await Authorize(invoiceId, session.user?.id as string);

    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Delete Invoice</CardTitle>
                    <CardDescription>
                        Are you sure that you want to delete this invoice?
                        this action can not be undone!
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src="/invoice.png" alt="Invoice" width={200} height={200} />
                </CardContent>
            </Card>
        </div>
    )
}
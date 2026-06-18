import { MarkAsPaidInvoice } from "@/app/action";
import SubmitButton from "@/app/components/SubmitButton";
import { requireUser } from "@/app/utils/hooks";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import paid from "@/public/paid.webp";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function Authorize(invoiceId: string, userId: string) {
    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: userId,
        },
    })

    if (!data) {
        return redirect("/dashboard/invoices");
    }
}

type Params = Promise<{ invoiceId: string }>;

export default async function MarkAsPaid({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requireUser();
    await Authorize(invoiceId, session.user?.id as string);

    return (
        <div className="flex flex-1 justify-center items-center">
            <Card className="max-w-[500px]">
                <CardHeader>
                    <CardTitle>Mark as Paid?</CardTitle>
                    <CardDescription>Are you sure you want to mark this invoice as paid?</CardDescription>
                </CardHeader>
                <CardContent>
                    <Image src={paid} alt="Paid Invoice" className="rounded-lg" />
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                    <Link href={`/dashboard/invoices`} className={buttonVariants({ variant: "outline" })}>
                        Cancel
                    </Link>
                    <form action={async () => {
                        "use server"
                        await MarkAsPaidInvoice(invoiceId);
                    }}>
                        <SubmitButton text="Mark as Paid" />
                    </form>
                </CardFooter>
            </Card>
        </div>
    )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/db";
import { requireUser } from "../utils/hooks";
import Graph from "./Graph";

async function getInvoices(userId: string) {
    const rawData = await prisma.invoice.findMany({
        where: {
            status: "PAID",
            userId: userId,
            createdAt: {
                lte: new Date(),
                gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            }
        },
        select: {
            createdAt: true,
            total: true,
        },
        orderBy: {
            createdAt: "asc",
        }
    });

    //group and aggregate data by date
    const aggreGateData = rawData.reduce(
        (acc: {[key: string]: number}, curr) => {
            const date = new Date(curr.createdAt).toLocaleDateString("en-US",{
                month: "short",
                day: "numeric",
            });
            acc[date] = acc[date] || 0;
            acc[date] += curr.total;
            return acc;
        },
        {} as {[key: string]: number}
    )

    // Convert to array and sort by date
    return Object.entries(aggreGateData)
        .map(([date, amount]) => ({
            date,
            amount,
        }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

const InvoiceGraph = async () => {
    const session = await requireUser();
    const data = await getInvoices(session.user?.id as string);
    console.log(data);
    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Paid Invoices</CardTitle>
                <CardDescription>
                    Invoices which have been paid in the last 30 days
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Graph data={data} />
            </CardContent>
        </Card>
    )
}

export default InvoiceGraph
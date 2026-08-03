import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import prisma from "@/lib/db";
import { requireUser } from "@/app/utils/hooks";
import { ArrowLeft, Building2, Edit, FileText, Mail, Phone, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

async function getClientData(clientId: string, userId: string) {
    const data = await prisma.client.findUnique({
        where: {
            id: clientId,
            userId: userId,
        },
        include: {
            invoices: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });
    return data;
}

export default async function ClientDetailsPage({ params }: { params: Promise<{ clientId: string }> }) {
    const session = await requireUser();
    const { clientId } = await params;
    const client = await getClientData(clientId, session.user?.id as string);

    if (!client) {
        return notFound();
    }

    const totalRevenue = client.invoices
        .filter((inv) => inv.status === "PAID")
        .reduce((sum, inv) => sum + inv.total, 0);

    const pendingAmount = client.invoices
        .filter((inv) => inv.status === "PENDING" || inv.status === "SENT")
        .reduce((sum, inv) => sum + inv.total, 0);

    return (
        <div className="flex flex-col gap-6 p-4 lg:p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="icon" asChild className="rounded-xl">
                        <Link href="/dashboard/clients">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                            {client.name}
                        </h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {client.company || "Individual Client"} • Created {new Date(client.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" asChild className="rounded-xl">
                        <Link href={`/dashboard/clients/${client.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" /> Edit Profile
                        </Link>
                    </Button>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                        <Link href={`/dashboard/invoices/create?clientId=${client.id}`}>
                            <Plus className="mr-2 h-4 w-4" /> Create Invoice
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Overview KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="rounded-2xl border-slate-200 dark:border-slate-800">
                    <CardHeader className="py-4">
                        <CardDescription>Total Paid Revenue</CardDescription>
                        <CardTitle className="text-2xl font-bold text-green-600 dark:text-green-400">
                            ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card className="rounded-2xl border-slate-200 dark:border-slate-800">
                    <CardHeader className="py-4">
                        <CardDescription>Pending Balance</CardDescription>
                        <CardTitle className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                            ${pendingAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </CardTitle>
                    </CardHeader>
                </Card>

                <Card className="rounded-2xl border-slate-200 dark:border-slate-800">
                    <CardHeader className="py-4">
                        <CardDescription>Total Invoices</CardDescription>
                        <CardTitle className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                            {client.invoices.length}
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>

            {/* Contact Details Card */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Email Address</p>
                        <p className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                            <Mail className="w-4 h-4 text-slate-400" /> {client.email}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Phone Number</p>
                        <p className="text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mt-0.5">
                            <Phone className="w-4 h-4 text-slate-400" /> {client.phone || "Not provided"}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Billing Address</p>
                        <p className="text-slate-900 dark:text-slate-100 mt-0.5 whitespace-pre-line">
                            {client.address}
                        </p>
                    </div>

                    <div>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">Tax ID / VAT</p>
                        <p className="text-slate-900 dark:text-slate-100 mt-0.5">
                            {client.taxId || "Not provided"}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Invoices History Table */}
            <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" /> Invoice History ({client.invoices.length})
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                <TableHead className="pl-6">Invoice #</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right pr-6">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {client.invoices.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-slate-500">
                                        No invoices created for this client yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                client.invoices.map((inv) => (
                                    <TableRow key={inv.id} className="border-slate-100 dark:border-slate-800">
                                        <TableCell className="pl-6 font-medium">
                                            {inv.invoicePrefix}-{inv.invoiceNumber}
                                        </TableCell>
                                        <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
                                        <TableCell>${inv.total.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge variant={inv.status === "PAID" ? "default" : "outline"}>
                                                {inv.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button variant="ghost" size="sm" asChild>
                                                <Link href={`/dashboard/invoices/${inv.id}`}>View</Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

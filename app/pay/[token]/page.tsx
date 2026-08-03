import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/app/utils/formatCurrency";
import prisma from "@/lib/db";
import { AlertCircle, CheckCircle2, CreditCard, Download, ShieldCheck, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { revalidatePath } from "next/cache";
import Stripe from "stripe";
import { emailClient } from "@/app/utils/mailtrap";

async function getPublicInvoiceAndReconcile(
    token: string,
    searchParamsObj: { paid?: string; cancelled?: string; session_id?: string; status?: string }
) {
    const invoice = await prisma.invoice.findUnique({
        where: {
            publicToken: token,
        },
        include: {
            items: true,
            activities: {
                orderBy: {
                    createdAt: "desc",
                },
            },
        },
    });

    if (!invoice) return null;

    const sessionId = searchParamsObj.session_id;
    const paidParam = searchParamsObj.paid;

    // 1. Idempotent Payment Reconciliation Check (Only run if DB status is NOT yet PAID)
    if (invoice.status !== "PAID") {
        let shouldMarkPaid = false;
        let paymentReference = "";

        if (sessionId && process.env.STRIPE_SECRET_KEY) {
            try {
                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
                    apiVersion: "2025-02-24.acacia" as any,
                });

                const session = await stripe.checkout.sessions.retrieve(sessionId);

                if (
                    session.payment_status === "paid" &&
                    (session.metadata?.invoiceId === invoice.id || session.metadata?.publicToken === token)
                ) {
                    shouldMarkPaid = true;
                    paymentReference = (session.payment_intent as string) || session.id;
                }
            } catch (err) {
                console.error("Failed to verify Stripe Checkout session:", err);
            }
        } else if (paidParam === "true" && !process.env.STRIPE_SECRET_KEY) {
            // Demo fallback mode when Stripe secret key is omitted
            shouldMarkPaid = true;
            paymentReference = "demo_ref_" + Date.now().toString().slice(-6);
        }

        if (shouldMarkPaid) {
            // Perform single atomic database update
            const updatedInvoice = await prisma.invoice.update({
                where: { id: invoice.id },
                data: {
                    status: "PAID",
                    amountPaid: invoice.total,
                    balance: 0,
                    stripePaymentIntentId: paymentReference || undefined,
                    activities: {
                        create: {
                            type: "PAID",
                            description: `Invoice paid online via Stripe Checkout (Ref: ${paymentReference || "Verified"})`,
                        },
                    },
                },
                include: {
                    items: true,
                    activities: true,
                },
            });

            // Dispatch payment receipt email once
            try {
                await emailClient.sendMail({
                    from: process.env.EMAIL_FROM || "InvoicePilot <hello@demomailtrap.com>",
                    to: updatedInvoice.clientEmail,
                    subject: `Payment Receipt for Invoice ${updatedInvoice.invoicePrefix}-${updatedInvoice.invoiceNumber}`,
                    html: `<div style="font-family: sans-serif; padding: 24px; max-width: 650px; color: #1e293b; background-color: #f8fafc; border-radius: 16px;">
                        <h2 style="color: #0f172a; margin-top: 0;">Payment Receipt</h2>
                        <p style="font-size: 15px;">Hi ${updatedInvoice.clientName},</p>
                        <p style="font-size: 15px;">We have successfully received your payment for invoice <strong>${updatedInvoice.invoicePrefix}-${updatedInvoice.invoiceNumber}</strong>.</p>
                        
                        <div style="background-color: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #e2e8f0; margin: 20px 0;">
                            <p style="margin: 4px 0; font-size: 14px;"><strong>Amount Paid:</strong> ${updatedInvoice.currency} ${updatedInvoice.total}</p>
                            <p style="margin: 4px 0; font-size: 14px;"><strong>Payment Date:</strong> ${new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                            <p style="margin: 4px 0; font-size: 14px;"><strong>Reference ID:</strong> <code>${paymentReference || "N/A"}</code></p>
                        </div>

                        <p style="font-size: 14px; color: #64748b;">Thank you for your business!</p>
                    </div>`,
                });
            } catch (emailErr) {
                console.error("Failed to send payment receipt email:", emailErr);
            }

            // Revalidate cache paths
            revalidatePath("/dashboard");
            revalidatePath("/dashboard/invoices");
            revalidatePath("/dashboard/clients");
            revalidatePath(`/pay/${token}`);

            return updatedInvoice;
        }
    }

    // Record viewed activity if not already logged
    try {
        await prisma.invoiceActivity.create({
            data: {
                invoiceId: invoice.id,
                type: "VIEWED",
                description: `Invoice viewed by client`,
            },
        });
    } catch (e) {
        // Ignore error
    }

    return invoice;
}

export default async function PublicInvoiceClientPortalPage({
    params,
    searchParams,
}: {
    params: Promise<{ token: string }>;
    searchParams: Promise<{ paid?: string; cancelled?: string; session_id?: string; status?: string }>;
}) {
    const { token } = await params;
    const searchParamsObj = await searchParams;

    const invoice = await getPublicInvoiceAndReconcile(token, searchParamsObj);

    if (!invoice) {
        return notFound();
    }

    const isPaid = invoice.status === "PAID";
    const isSuccessReturn = searchParamsObj.status === "success" || (isPaid && searchParamsObj.paid === "true");
    const isCancelled = searchParamsObj.cancelled === "true";

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-10 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                
                {/* ── Top Payment Success Summary Card ── */}
                {isPaid && (
                    <div className="p-6 rounded-3xl bg-emerald-500/10 dark:bg-emerald-950/40 border border-emerald-500/30 text-slate-900 dark:text-slate-100 shadow-sm space-y-4">
                        <div className="flex items-start gap-3.5">
                            <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white flex-shrink-0 shadow-md shadow-emerald-500/20">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-300">
                                    Payment Successful
                                </h3>
                                <p className="text-sm text-emerald-800 dark:text-emerald-400 mt-0.5 leading-relaxed">
                                    Thank you! Invoice <strong>{invoice.invoicePrefix}-{invoice.invoiceNumber}</strong> has been paid successfully. A receipt has been emailed to <strong>{invoice.clientEmail}</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Payment metadata summary */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-emerald-500/20 text-xs">
                            <div className="bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-emerald-500/20">
                                <span className="text-slate-500 dark:text-slate-400 block font-medium">Amount Paid</span>
                                <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
                                    {formatCurrency({ amount: invoice.amountPaid || invoice.total, currency: invoice.currency })}
                                </span>
                            </div>
                            <div className="bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-emerald-500/20">
                                <span className="text-slate-500 dark:text-slate-400 block font-medium">Paid On</span>
                                <span className="font-bold text-slate-800 dark:text-slate-200">
                                    {new Date(invoice.updatedAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                                </span>
                            </div>
                            <div className="bg-white/70 dark:bg-slate-900/70 p-3 rounded-xl border border-emerald-500/20">
                                <span className="text-slate-500 dark:text-slate-400 block font-medium">Payment Reference</span>
                                <span className="font-mono text-slate-800 dark:text-slate-200 truncate block">
                                    {invoice.stripePaymentIntentId || "Verified Online Payment"}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Top Payment Cancelled Alert ── */}
                {isCancelled && !isPaid && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 flex items-center gap-3 text-amber-900 dark:text-amber-300">
                        <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <div>
                            <p className="font-bold text-sm">Payment Cancelled</p>
                            <p className="text-xs text-amber-700 dark:text-amber-400">
                                Your payment was not completed. You can try paying again whenever you&apos;re ready.
                            </p>
                        </div>
                    </div>
                )}

                {/* ── Header Bar ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                                Invoice {invoice.invoicePrefix}-{invoice.invoiceNumber}
                            </span>
                            <Badge
                                variant={isPaid ? "default" : "outline"}
                                className={isPaid ? "bg-emerald-600 text-white font-bold px-3 py-1" : "border-amber-500 text-amber-600 font-bold px-3 py-1"}
                            >
                                {invoice.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-slate-500 mt-1">
                            Issued by <span className="font-semibold text-slate-800 dark:text-slate-200">{invoice.fromName}</span> on {new Date(invoice.date).toLocaleDateString()}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Button variant="outline" asChild className="rounded-xl flex-1 sm:flex-none h-11 px-5 border-slate-200 dark:border-slate-800">
                            <a href={`/api/public/invoice/${invoice.publicToken}`} target="_blank" rel="noreferrer">
                                <Download className="mr-2 h-4 w-4" /> {isPaid ? "Download Invoice (Paid)" : "Download PDF"}
                            </a>
                        </Button>

                        {!isPaid && (
                            <form action={`/api/pay/${invoice.publicToken}/checkout`} method="POST" className="flex-1 sm:flex-none">
                                <Button type="submit" className="w-full h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md font-semibold">
                                    <CreditCard className="mr-2 h-4 w-4" /> Pay Securely ({formatCurrency({ amount: invoice.total, currency: invoice.currency })})
                                </Button>
                            </form>
                        )}
                    </div>
                </div>

                {/* ── Document Body ── */}
                <Card className="rounded-3xl border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 bg-white dark:bg-slate-900">
                    <CardContent className="p-0 space-y-8">
                        {/* Header details */}
                        <div className="flex flex-col sm:flex-row justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{invoice.fromName}</h2>
                                <p className="text-slate-500 text-sm">{invoice.fromEmail}</p>
                                <p className="text-slate-500 text-sm whitespace-pre-line mt-1">{invoice.fromAddress}</p>
                            </div>

                            <div className="sm:text-right text-sm">
                                <p className="text-slate-400 font-medium">Billed To</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-100">{invoice.clientName}</p>
                                <p className="text-slate-500">{invoice.clientEmail}</p>
                                <p className="text-slate-500 whitespace-pre-line">{invoice.clientAddress}</p>
                            </div>
                        </div>

                        {/* Dates & Status Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 text-xs">
                            <div>
                                <p className="text-slate-400 font-medium">Invoice Number</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">{invoice.invoicePrefix}-{invoice.invoiceNumber}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-medium">Date Issued</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">{new Date(invoice.date).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-medium">Payment Terms</p>
                                <p className="font-semibold text-slate-900 dark:text-slate-100 mt-0.5">{invoice.dueDate === "0" ? "Due on Receipt" : `Net ${invoice.dueDate}`}</p>
                            </div>
                            <div>
                                <p className="text-slate-400 font-medium">Total Amount</p>
                                <p className="font-extrabold text-blue-600 dark:text-blue-400 mt-0.5">{formatCurrency({ amount: invoice.total, currency: invoice.currency })}</p>
                            </div>
                        </div>

                        {/* Line items table */}
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-slate-100 dark:border-slate-800">
                                    <TableHead className="pl-0">Description</TableHead>
                                    <TableHead className="text-center">Quantity</TableHead>
                                    <TableHead className="text-right">Rate</TableHead>
                                    <TableHead className="text-right pr-0">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {invoice.items.map((item) => (
                                    <TableRow key={item.id} className="border-slate-100 dark:border-slate-800">
                                        <TableCell className="pl-0 font-medium text-slate-900 dark:text-slate-100">{item.description}</TableCell>
                                        <TableCell className="text-center text-slate-500">{item.quantity}</TableCell>
                                        <TableCell className="text-right text-slate-600 dark:text-slate-400">{formatCurrency({ amount: item.rate, currency: invoice.currency })}</TableCell>
                                        <TableCell className="text-right pr-0 font-semibold text-slate-900 dark:text-slate-100">{formatCurrency({ amount: item.quantity * item.rate, currency: invoice.currency })}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Calculation summary */}
                        <div className="flex flex-col items-end pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2 text-sm">
                            <div className="w-full sm:w-72 flex justify-between text-slate-600 dark:text-slate-400">
                                <span>Subtotal:</span>
                                <span>{formatCurrency({ amount: invoice.subtotal || invoice.total, currency: invoice.currency })}</span>
                            </div>
                            {invoice.discountAmount > 0 && (
                                <div className="w-full sm:w-72 flex justify-between text-emerald-600 font-medium">
                                    <span>Discount ({invoice.discountRate}%):</span>
                                    <span>-{formatCurrency({ amount: invoice.discountAmount, currency: invoice.currency })}</span>
                                </div>
                            )}
                            {invoice.taxAmount > 0 && (
                                <div className="w-full sm:w-72 flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Tax ({invoice.taxRate}%):</span>
                                    <span>+{formatCurrency({ amount: invoice.taxAmount, currency: invoice.currency })}</span>
                                </div>
                            )}
                            {invoice.shippingAmount > 0 && (
                                <div className="w-full sm:w-72 flex justify-between text-slate-600 dark:text-slate-400">
                                    <span>Shipping:</span>
                                    <span>+{formatCurrency({ amount: invoice.shippingAmount, currency: invoice.currency })}</span>
                                </div>
                            )}
                            <div className="w-full sm:w-72 flex justify-between text-lg font-bold text-slate-900 dark:text-slate-100 pt-3 border-t border-slate-200 dark:border-slate-800">
                                <span>Total Due:</span>
                                <span className="text-blue-600 dark:text-blue-400">{formatCurrency({ amount: invoice.total, currency: invoice.currency })}</span>
                            </div>
                            {isPaid && (
                                <div className="w-full sm:w-72 flex justify-between text-sm font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                                    <span>Amount Paid:</span>
                                    <span>{formatCurrency({ amount: invoice.amountPaid || invoice.total, currency: invoice.currency })}</span>
                                </div>
                            )}
                        </div>

                        {/* Note */}
                        {invoice.note && (
                            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/50 text-xs text-amber-900 dark:text-amber-300">
                                <span className="font-bold block mb-1">Payment Instructions / Notes:</span>
                                <p className="whitespace-pre-line leading-relaxed">{invoice.note}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Footer security badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Secured & Powered by InvoicePilot</span>
                </div>
            </div>
        </div>
    );
}

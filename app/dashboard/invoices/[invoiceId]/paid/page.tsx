import { MarkAsPaidInvoice } from "@/app/action";
import SubmitButton from "@/app/components/SubmitButton";
import { requireUser } from "@/app/utils/hooks";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import paid from "@/public/paid.webp";
import { BadgeCheck, FileText, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

export default async function MarkAsPaid({ params }: { params: Params }) {
    const { invoiceId } = await params;
    const session = await requireUser();
    await Authorize(invoiceId, session.user?.id as string);

    return (
        <div className="flex flex-1 justify-center items-center min-h-[60vh] px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">

                    {/* Image */}
                    <div className="relative w-full aspect-video bg-slate-50 dark:bg-slate-950">
                        <Image
                            src={paid}
                            alt="Paid Invoice"
                            fill
                            className="object-cover"
                        />
                        {/* subtle gradient overlay at bottom */}
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 dark:from-slate-900/60 to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="px-6 pt-5 pb-6">

                        {/* Icon + heading */}
                        <div className="flex items-center gap-3 mb-1.5">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                                <BadgeCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Mark as Paid?</h2>
                        </div>

                        <p className="text-sm text-slate-500 dark:text-slate-400 ml-12 mb-6">
                            This action will mark the invoice as paid and cannot be undone.
                        </p>

                        {/* Invoice ref pill */}
                        <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 mb-6">
                            <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Invoice ID</span>
                            <span className="ml-auto text-xs font-mono text-slate-700 dark:text-slate-300 truncate max-w-[180px]">
                                {invoiceId}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/dashboard/invoices"
                                className={buttonVariants({ variant: "outline" }) + " flex-1 rounded-xl h-10 text-sm font-medium border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1.5"}
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Link>

                            <form
                                className="flex-1"
                                action={async () => {
                                    "use server";
                                    await MarkAsPaidInvoice(invoiceId);
                                }}
                            >
                                <SubmitButton text="Confirm Payment" />
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-400 mt-6 font-medium">
                    Marking as paid will update the invoice status immediately.
                </p>
            </div>
        </div>
    );
}
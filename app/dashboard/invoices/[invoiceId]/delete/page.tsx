import { DeleteInvoice } from "@/app/action";
import SubmitButton from "@/app/components/SubmitButton";
import { requireUser } from "@/app/utils/hooks";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/db";
import warnning from "@/public/warnning1.gif";
import { FileText, TriangleAlert, X } from "lucide-react";
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

export default async function DeleteInvoiceRoute({ params }: { params: Params }) {
    const session = await requireUser();
    const { invoiceId } = await params;
    await Authorize(invoiceId, session.user?.id as string);

    return (
        <div className="flex flex-1 justify-center items-center min-h-[60vh] px-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">

                    {/* GIF */}
                    <div className="relative w-full aspect-video bg-slate-50">
                        <Image
                            src={warnning}
                            alt="Warning"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/60 to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="px-6 pt-5 pb-6">

                        {/* Icon + heading */}
                        <div className="flex items-center gap-3 mb-1.5">
                            <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                                <TriangleAlert className="w-5 h-5 text-red-600" />
                            </div>
                            <h2 className="text-lg font-semibold text-slate-900">Delete Invoice?</h2>
                        </div>

                        <p className="text-sm text-slate-500 ml-12 mb-6">
                            This action is permanent and cannot be undone. The invoice will be removed immediately.
                        </p>

                        {/* Invoice ref pill */}
                        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 mb-6">
                            <FileText className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <span className="text-xs text-red-500 font-medium">Invoice ID</span>
                            <span className="ml-auto text-xs font-mono text-red-700 truncate max-w-[180px]">
                                {invoiceId}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/dashboard/invoices"
                                className={
                                    buttonVariants({ variant: "outline" }) +
                                    " flex-1 rounded-xl h-10 text-sm font-medium border-slate-200 text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-1.5"
                                }
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </Link>

                            <form
                                className="flex-1"
                                action={async () => {
                                    "use server";
                                    await DeleteInvoice(invoiceId);
                                }}
                            >
                                <SubmitButton variant="destructive" text="Delete Invoice" />
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer note */}
                <p className="text-center text-xs text-slate-400 mt-4">
                    Once deleted, this invoice cannot be recovered.
                </p>
            </div>
        </div>
    );
}
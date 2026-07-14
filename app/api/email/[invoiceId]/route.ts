import { generateInvoiceReminderEmailTemplate } from "@/app/utils/emailTemplate";
import { requireUser } from "@/app/utils/hooks";
import { emailClient } from "@/app/utils/mailtrap";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ invoiceId: string }> }) {
    try {
        const session = await requireUser();

        const { invoiceId } = await params;

        const invoiceData = await prisma.invoice.findUnique({
            where: {
                id: invoiceId,
                userId: session.user?.id,
            }
        });

        if (!invoiceData) {
            return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
        }

        const sender = process.env.EMAIL_FROM || 'InvoicePilot <hello@demomailtrap.com>';

        await emailClient.sendMail({
            from: sender,
            to: invoiceData.clientEmail,
            subject: "Invoice Reminder - InvoicePilot",
            html: generateInvoiceReminderEmailTemplate({
                clientName: invoiceData.clientName,
                invoiceNumber: invoiceData.invoiceNumber.toString(),
                fromName: invoiceData.fromName,
                currency: invoiceData.currency,
                total: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: invoiceData.currency,
                }).format(invoiceData.total),
                dueDate: Number(invoiceData.dueDate) === 0 ? "Due on Receipt" : `Net ${invoiceData.dueDate}`,
                invoiceLink: `https://invoice-pilot-gold.vercel.app/api/invoice/${invoiceData.id}`
            })
        });

        return NextResponse.json({ success: true, message: "Reminder email sent successfully" });
    } catch (error) {
        console.error("Failed to send reminder email:", error);
        return NextResponse.json({ error: "Failed to send reminder email" }, { status: 500 });
    }
}

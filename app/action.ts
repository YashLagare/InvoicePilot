"use server";

import prisma from "@/lib/db";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { generateEmailTemplate, generateInvoiceUpdatedEmailTemplate } from "./utils/emailTemplate";
import { requireUser } from "./utils/hooks";
import { emailClient } from "./utils/mailtrap";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";

export async function onboardingUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.user.update({
        where: {
            id: session.user?.id,
        },
        data: {
            firstName: submission.value.firstName,
            lastName: submission.value.lastName,
            address: submission.value.address,
        }
    });

    return redirect("/dashboard");
}

//create invoice
export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
            userId: session.user?.id,
        },
    });

    const dueDate = new Date(submission.value.date);
    dueDate.setDate(dueDate.getDate() + Number(submission.value.dueDate));

    //send email after creation 
    await emailClient.sendMail({
        from: process.env.EMAIL_FROM || 'InvoicePilot <hello@demomailtrap.com>',
        to: submission.value.clientEmail,
        subject: "New Invoice from InvoicePilot",
        html: generateEmailTemplate({
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber.toString(),
            fromName: submission.value.fromName,
            currency: submission.value.currency,
            total: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: submission.value.currency,
            }).format(submission.value.total),
            dueDate: Number(submission.value.dueDate) === 0 ? "Due on Receipt" : `Net ${submission.value.dueDate}`,
            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
        })
    });

    return redirect("/dashboard/invoices");
}

//edit invoice
export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const data = await prisma.invoice.update({
        where: {
            id: formData.get("id") as string,
            userId: session.user?.id,
        },
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            currency: submission.value.currency,
            date: submission.value.date,
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoiceItemDescription: submission.value.invoiceItemDescription,
            invoiceItemQuantity: submission.value.invoiceItemQuantity,
            invoiceItemRate: submission.value.invoiceItemRate,
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            total: submission.value.total,
            note: submission.value.note,
        }
    });

    const sender = process.env.EMAIL_FROM || 'InvoicePilot <hello@demomailtrap.com>';

    await emailClient.sendMail({
        from: sender,
        to: submission.value.clientEmail,
        subject: "Invoice Updated - InvoicePilot",
        html: generateInvoiceUpdatedEmailTemplate({
            clientName: submission.value.clientName,
            invoiceNumber: submission.value.invoiceNumber.toString(),
            fromName: submission.value.fromName,
            currency: submission.value.currency,
            total: new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: submission.value.currency,
            }).format(submission.value.total),
            dueDate: Number(submission.value.dueDate) === 0 ? "Due on Receipt" : `Net ${submission.value.dueDate}`,
            invoiceLink: `http://localhost:3000/api/invoice/${data.id}`
        })
    });

    return redirect("/dashboard/invoices");
}

//delete invoice
export async function DeleteInvoice(invoiceId: string) {
    const session = await requireUser();
    const data = await prisma.invoice.delete({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
    });
    return redirect("/dashboard/invoices");
}

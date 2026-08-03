"use server";

import prisma from "@/lib/db";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { generateEmailTemplate, generateInvoiceUpdatedEmailTemplate } from "./utils/emailTemplate";
import { requireUser } from "./utils/hooks";
import { emailClient } from "./utils/mailtrap";
import { clientSchema, companyProfileSchema, invoiceSchema, onboardingSchema } from "./utils/zodSchemas";

export async function onboardingUser(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: onboardingSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.user.update({
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

// Client Management Actions
export async function createClientAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: clientSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.client.create({
        data: {
            name: submission.value.name,
            email: submission.value.email,
            phone: submission.value.phone,
            company: submission.value.company,
            address: submission.value.address,
            taxId: submission.value.taxId,
            notes: submission.value.notes,
            userId: session.user?.id as string,
        }
    });

    return redirect("/dashboard/clients");
}

export async function editClientAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const clientId = formData.get("id") as string;
    const submission = parseWithZod(formData, {
        schema: clientSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.client.update({
        where: {
            id: clientId,
            userId: session.user?.id as string,
        },
        data: {
            name: submission.value.name,
            email: submission.value.email,
            phone: submission.value.phone,
            company: submission.value.company,
            address: submission.value.address,
            taxId: submission.value.taxId,
            notes: submission.value.notes,
        }
    });

    return redirect("/dashboard/clients");
}

export async function deleteClientAction(clientId: string) {
    const session = await requireUser();

    if (session.user?.email === "demo@invoicepilot.app") {
        return redirect("/dashboard/clients");
    }

    await prisma.client.delete({
        where: {
            id: clientId,
            userId: session.user?.id as string,
        }
    });

    return redirect("/dashboard/clients");
}

// Company Profile Action
export async function updateCompanyProfileAction(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: companyProfileSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    await prisma.companyProfile.upsert({
        where: {
            userId: session.user?.id as string,
        },
        create: {
            userId: session.user?.id as string,
            businessName: submission.value.businessName,
            logoUrl: submission.value.logoUrl,
            phone: submission.value.phone,
            website: submission.value.website,
            taxId: submission.value.taxId,
            defaultCurrency: submission.value.defaultCurrency,
            paymentTerms: submission.value.paymentTerms,
            bankDetails: submission.value.bankDetails,
        },
        update: {
            businessName: submission.value.businessName,
            logoUrl: submission.value.logoUrl,
            phone: submission.value.phone,
            website: submission.value.website,
            taxId: submission.value.taxId,
            defaultCurrency: submission.value.defaultCurrency,
            paymentTerms: submission.value.paymentTerms,
            bankDetails: submission.value.bankDetails,
        }
    });

    return redirect("/dashboard/settings");
}

// Invoice Actions
export async function createInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const items = submission.value.items;
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
    const discountAmount = (subtotal * (submission.value.discountRate || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (submission.value.taxRate || 0)) / 100;
    const total = taxableAmount + taxAmount + (submission.value.shippingAmount || 0);

    const isPaid = submission.value.status === "PAID";

    const data = await prisma.invoice.create({
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            clientId: submission.value.clientId || null,
            currency: submission.value.currency,
            date: new Date(submission.value.date),
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoicePrefix: submission.value.invoicePrefix || "INV",
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            subtotal,
            taxRate: submission.value.taxRate || 0,
            taxAmount,
            discountRate: submission.value.discountRate || 0,
            discountAmount,
            shippingAmount: submission.value.shippingAmount || 0,
            total,
            amountPaid: isPaid ? total : 0,
            balance: isPaid ? 0 : total,
            note: submission.value.note,
            userId: session.user?.id,
            items: {
                create: items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    rate: item.rate,
                    amount: item.quantity * item.rate,
                })),
            },
            activities: {
                create: {
                    type: "CREATED",
                    description: `Invoice ${submission.value.invoicePrefix || 'INV'}-${submission.value.invoiceNumber} created`,
                }
            }
        },
    });

    // Send email notification
    try {
        await emailClient.sendMail({
            from: process.env.EMAIL_FROM || 'InvoicePilot <hello@demomailtrap.com>',
            to: submission.value.clientEmail,
            subject: `New Invoice from ${submission.value.fromName}`,
            html: generateEmailTemplate({
                clientName: submission.value.clientName,
                invoiceNumber: `${submission.value.invoicePrefix || 'INV'}-${submission.value.invoiceNumber}`,
                fromName: submission.value.fromName,
                currency: submission.value.currency,
                total: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: submission.value.currency,
                }).format(total),
                dueDate: Number(submission.value.dueDate) === 0 ? "Due on Receipt" : `Net ${submission.value.dueDate}`,
                invoiceLink: `${process.env.NEXTAUTH_URL || 'https://invoice-pilot-gold.vercel.app'}/pay/${data.publicToken}`
            })
        });

        await prisma.invoiceActivity.create({
            data: {
                invoiceId: data.id,
                type: "SENT",
                description: `Invoice sent to ${submission.value.clientEmail}`,
            }
        });
    } catch (error) {
        console.error("Failed to send email. Error:", error);
    }

    return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
    const session = await requireUser();

    const submission = parseWithZod(formData, {
        schema: invoiceSchema,
    });

    if (submission.status !== "success") {
        return submission.reply();
    }

    const invoiceId = formData.get("id") as string;
    const items = submission.value.items;
    const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
    const discountAmount = (subtotal * (submission.value.discountRate || 0)) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * (submission.value.taxRate || 0)) / 100;
    const total = taxableAmount + taxAmount + (submission.value.shippingAmount || 0);

    const isPaid = submission.value.status === "PAID";

    const data = await prisma.invoice.update({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
        data: {
            clientAddress: submission.value.clientAddress,
            clientEmail: submission.value.clientEmail,
            clientName: submission.value.clientName,
            clientId: submission.value.clientId || null,
            currency: submission.value.currency,
            date: new Date(submission.value.date),
            dueDate: submission.value.dueDate,
            fromAddress: submission.value.fromAddress,
            fromEmail: submission.value.fromEmail,
            fromName: submission.value.fromName,
            invoicePrefix: submission.value.invoicePrefix || "INV",
            invoiceName: submission.value.invoiceName,
            invoiceNumber: submission.value.invoiceNumber,
            status: submission.value.status,
            subtotal,
            taxRate: submission.value.taxRate || 0,
            taxAmount,
            discountRate: submission.value.discountRate || 0,
            discountAmount,
            shippingAmount: submission.value.shippingAmount || 0,
            total,
            amountPaid: isPaid ? total : 0,
            balance: isPaid ? 0 : total,
            note: submission.value.note,
            items: {
                deleteMany: {},
                create: items.map((item) => ({
                    description: item.description,
                    quantity: item.quantity,
                    rate: item.rate,
                    amount: item.quantity * item.rate,
                })),
            },
            activities: {
                create: {
                    type: "UPDATED",
                    description: `Invoice updated`,
                }
            }
        }
    });

    const sender = process.env.EMAIL_FROM || 'InvoicePilot <hello@demomailtrap.com>';

    try {
        await emailClient.sendMail({
            from: sender,
            to: submission.value.clientEmail,
            subject: "Invoice Updated - InvoicePilot",
            html: generateInvoiceUpdatedEmailTemplate({
                clientName: submission.value.clientName,
                invoiceNumber: `${submission.value.invoicePrefix || 'INV'}-${submission.value.invoiceNumber}`,
                fromName: submission.value.fromName,
                currency: submission.value.currency,
                total: new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: submission.value.currency,
                }).format(total),
                dueDate: Number(submission.value.dueDate) === 0 ? "Due on Receipt" : `Net ${submission.value.dueDate}`,
                invoiceLink: `${process.env.NEXTAUTH_URL || 'https://invoice-pilot-gold.vercel.app'}/pay/${data.publicToken}`
            })
        });
    } catch (error) {
        console.error("Failed to send updated invoice email. Error:", error);
    }

    return redirect("/dashboard/invoices");
}

export async function DeleteInvoice(invoiceId: string) {
    const session = await requireUser();

    if (session.user?.email === "demo@invoicepilot.app") {
        return redirect("/dashboard/invoices");
    }

    await prisma.invoice.delete({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
    });
    return redirect("/dashboard/invoices");
}

export async function MarkAsPaidInvoice(invoiceId: string) {
    const session = await requireUser();

    const invoice = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        }
    });

    if (!invoice) return redirect("/dashboard/invoices");

    await prisma.invoice.update({
        where: {
            id: invoiceId,
            userId: session.user?.id,
        },
        data: {
            status: "PAID",
            amountPaid: invoice.total,
            balance: 0,
            activities: {
                create: {
                    type: "PAID",
                    description: "Invoice marked as paid manually",
                }
            }
        }
    });

    return redirect("/dashboard/invoices");
}


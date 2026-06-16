import { z } from 'zod'

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(2, "Address is required"),
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(2, "Invoice name is required"),
    total: z.number().min(1, "Total amount is required"),

    status: z.enum(["PAID", "PENDING"]).default("PENDING"),

    date: z.string().min(1, "Date is required"),
    dueDate: z.string().min(1, "Due date is required"),

    fromName: z.string().min(2, "Your name is required"),
    fromEmail: z.string().email("Invalid Email"),
    fromAddress: z.string().min(2, "Your address is required"),

    clientName: z.string().min(2, "Client name is required"),
    clientEmail: z.string().min(2, "Client email is required"),
    clientAddress: z.string().min(2, "Client address is required"),

    currency: z.string().min(2, "Currency is required"),

    invoiceNumber: z.number().min(1, "Minimum invoice number 1"),

    note: z.string().optional(),

    invoiceItemDescription: z.string().min(2, "Description is required"),
    invoiceItemQuantity: z.number().min(1, "Quantity is required"),
    invoiceItemRate: z.number().min(1, "Rate minimum 1 is required")

})

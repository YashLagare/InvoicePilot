import { z } from 'zod'

export const onboardingSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(2, "Address is required"),
})

export const clientSchema = z.object({
    name: z.string().min(2, "Client name is required"),
    email: z.string().email("Valid email is required"),
    phone: z.string().optional(),
    company: z.string().optional(),
    address: z.string().min(2, "Address is required"),
    taxId: z.string().optional(),
    notes: z.string().optional(),
})

export const companyProfileSchema = z.object({
    businessName: z.string().optional(),
    logoUrl: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    taxId: z.string().optional(),
    defaultCurrency: z.string().default("USD"),
    paymentTerms: z.number().default(0),
    bankDetails: z.string().optional(),
})

export const invoiceSchema = z.object({
    invoiceName: z.string().min(2, "Invoice name is required"),
    invoiceNumber: z.number().min(1, "Minimum invoice number 1"),
    invoicePrefix: z.string().default("INV"),
    status: z.enum(["DRAFT", "PENDING", "SENT", "PAID", "OVERDUE", "CANCELLED", "PARTIALLY_PAID"]).default("PENDING"),
    date: z.string().min(1, "Date is required"),
    dueDate: z.string().min(0, "Due date is required"),

    fromName: z.string().min(2, "Your name is required"),
    fromEmail: z.string().email("Invalid Email"),
    fromAddress: z.string().min(2, "Your address is required"),

    clientId: z.string().optional(),
    clientName: z.string().min(2, "Client name is required"),
    clientEmail: z.string().min(2, "Client email is required"),
    clientAddress: z.string().min(2, "Client address is required"),

    currency: z.string().min(2, "Currency is required"),
    note: z.string().optional(),

    subtotal: z.number().default(0),
    taxRate: z.number().min(0).default(0),
    taxAmount: z.number().default(0),
    discountRate: z.number().min(0).default(0),
    discountAmount: z.number().default(0),
    shippingAmount: z.number().min(0).default(0),
    total: z.number().min(0, "Total amount must be 0 or greater"),

    items: z.string().transform(str => JSON.parse(str)).pipe(
        z.array(
            z.object({
                description: z.string().min(1, "Description is required"),
                quantity: z.number().min(0.01, "Quantity must be greater than 0"),
                rate: z.number().min(0, "Rate must be 0 or greater"),
            })
        )
    )
})


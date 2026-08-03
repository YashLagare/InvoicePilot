import { generateInvoicePDFBuffer } from "@/app/utils/pdfGenerator";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ token: string }>;
  },
) {
  try {
    const { token } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: {
        publicToken: token,
      },
      include: {
        items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ message: "Invoice not found" }, { status: 404 });
    }

    const pdfBuffer = generateInvoicePDFBuffer({
      invoicePrefix: invoice.invoicePrefix,
      invoiceNumber: invoice.invoiceNumber,
      invoiceName: invoice.invoiceName,
      currency: invoice.currency,
      fromName: invoice.fromName,
      fromAddress: invoice.fromAddress,
      fromEmail: invoice.fromEmail,
      clientName: invoice.clientName,
      clientAddress: invoice.clientAddress,
      clientEmail: invoice.clientEmail,
      dueDate: invoice.dueDate,
      date: invoice.date,
      subtotal: invoice.subtotal,
      taxRate: invoice.taxRate,
      taxAmount: invoice.taxAmount,
      discountRate: invoice.discountRate,
      discountAmount: invoice.discountAmount,
      shippingAmount: invoice.shippingAmount,
      total: invoice.total,
      note: invoice.note,
      status: invoice.status,
      items: invoice.items,
    });

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="invoice-${invoice.invoicePrefix}-${invoice.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Failed to generate public PDF:", error);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}

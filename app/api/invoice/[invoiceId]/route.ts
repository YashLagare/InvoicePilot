
import prisma from "@/lib/db";
import jsPDF from 'jspdf';
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ invoiceId: string }>
    }) {
    const { invoiceId } = await params;

    const data = await prisma.invoice.findUnique({
        where: {
            id: invoiceId,
        },
        select: {
            invoiceNumber: true,
            invoiceName: true,
            currency: true,
            fromName: true,
            fromAddress: true,
            fromEmail: true,
            clientName: true,
            clientAddress: true,
            clientEmail: true,
            dueDate: true,
            date: true,
            invoiceItemDescription: true,
            invoiceItemQuantity: true,
            invoiceItemRate: true,
            total: true,
            note: true,
        }
    });

    if (!data) {
        return NextResponse.json({ message: 'Invoice not found' }, { status: 404 });
    }

    const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
    });

    pdf.setFont("helvetica");


    pdf.setFontSize(24);
    pdf.text(data.invoiceName, 20, 20);

    //from section
    pdf.setFontSize(12);
    pdf.text("From:", 20, 40);
    pdf.setFontSize(10);
    pdf.text([data.fromName, data.fromAddress, data.fromEmail], 20, 45);

    //client section
    pdf.setFontSize(12);
    pdf.text("Bill To:", 20, 70);
    pdf.setFontSize(10);
    pdf.text([data.clientName, data.clientAddress, data.clientEmail], 20, 75);

    //Invoice details
    pdf.setFontSize(12);
    pdf.text(`Invoice Number: ${data.invoiceNumber}`, 120, 40);
    pdf.text(
        `Date: ${new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
        }).format(new Date(data.date))}`,
        120, 45
    );
    pdf.text(`Due Date: Net ${data.dueDate}`, 120, 50);
    pdf.setFontSize(10);

    //item table header
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Description", 20, 100);
    pdf.text("Quantity",100, 100);
    pdf.text("Rate", 130, 100);
    pdf.text("Total", 160, 100);

    //Draw header line
    pdf.line(20, 102, 190, 102);

    //Item details
    pdf.setFont("helvetica", "normal");
    const formatPDFCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
        }).format(amount).replace("₹", "Rs ");
    };

    pdf.text(data.invoiceItemDescription, 20, 110);
    pdf.text(data.invoiceItemQuantity.toString(), 100, 110);
    pdf.text(formatPDFCurrency(data.invoiceItemRate, data.currency), 130, 110);
    pdf.text(formatPDFCurrency(data.total, data.currency), 160, 110);

    //total section
    pdf.line(20, 120, 190, 120);
    pdf.setFont("helvetica", "bold");
    pdf.text(`Total (${data.currency})`, 130, 130);
    pdf.text(formatPDFCurrency(data.total, data.currency), 160, 130);

    //optional note
    if(data.note){
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.text("Note:", 20, 150);
        pdf.text(data.note, 20, 155);
    }

    //generate pdf as buffer
    const pdfBuffer = Buffer.from(pdf.output("arraybuffer"));

    //return pdf to download
    return new NextResponse(pdfBuffer, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": "inline",
        }
    });
}
import jsPDF from "jspdf";

export interface PDFInvoiceData {
  invoicePrefix?: string | null;
  invoiceNumber: number;
  invoiceName: string;
  currency: string;
  fromName: string;
  fromAddress: string;
  fromEmail: string;
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  dueDate: string;
  date: Date | string;
  subtotal?: number;
  taxRate?: number;
  taxAmount?: number;
  discountRate?: number;
  discountAmount?: number;
  shippingAmount?: number;
  total: number;
  note?: string | null;
  status: string;
  items: {
    description: string;
    quantity: number;
    rate: number;
  }[];
}

export function generateInvoicePDFBuffer(data: PDFInvoiceData): Buffer {
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  pdf.setFont("helvetica");

  // Title / Brand Header
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.text(data.fromName || "INVOICE", 20, 22);

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Status: ${data.status}`, 20, 28);

  // Invoice Number & Dates (Top Right)
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  const fullInvoiceNo = `${data.invoicePrefix || "INV"}-${data.invoiceNumber}`;
  pdf.text(fullInvoiceNo, 140, 22);

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Date: ${new Date(data.date).toLocaleDateString()}`, 140, 28);
  pdf.text(`Terms: ${data.dueDate === "0" ? "Due on Receipt" : `Net ${data.dueDate}`}`, 140, 33);

  // Divider
  pdf.setDrawColor(220, 226, 235);
  pdf.line(20, 38, 190, 38);

  // From vs Bill To Section
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "bold");
  pdf.text("From:", 20, 46);
  pdf.text("Billed To:", 110, 46);

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "normal");
  pdf.text(pdf.splitTextToSize(data.fromName, 80), 20, 51);
  pdf.text(pdf.splitTextToSize(data.fromEmail, 80), 20, 56);
  pdf.text(pdf.splitTextToSize(data.fromAddress || "", 80), 20, 61);

  pdf.text(pdf.splitTextToSize(data.clientName, 80), 110, 51);
  pdf.text(pdf.splitTextToSize(data.clientEmail, 80), 110, 56);
  pdf.text(pdf.splitTextToSize(data.clientAddress || "", 80), 110, 61);

  // Table Header
  const tableTop = 78;
  pdf.setFillColor(245, 247, 250);
  pdf.rect(20, tableTop, 170, 8, "F");

  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");
  pdf.text("Description", 23, tableTop + 5.5);
  pdf.text("Qty", 115, tableTop + 5.5);
  pdf.text("Rate", 140, tableTop + 5.5);
  pdf.text("Total", 170, tableTop + 5.5);

  const formatCurr = (amt: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: data.currency || "USD",
    })
      .format(amt)
      .replace("₹", "Rs ");
  };

  // Table Body
  let startY = tableTop + 14;
  pdf.setFont("helvetica", "normal");

  data.items.forEach((item) => {
    const descLines = pdf.splitTextToSize(item.description, 85);
    pdf.text(descLines, 23, startY);
    pdf.text(item.quantity.toString(), 115, startY);
    pdf.text(formatCurr(item.rate), 140, startY);
    pdf.text(formatCurr(item.quantity * item.rate), 170, startY);

    startY += 8 + (descLines.length > 1 ? (descLines.length - 1) * 4 : 0);
  });

  // Totals Breakdown Section
  pdf.line(20, startY, 190, startY);
  startY += 6;

  const subtotal = data.subtotal || data.items.reduce((s, i) => s + i.quantity * i.rate, 0);
  pdf.setFont("helvetica", "normal");
  pdf.text("Subtotal:", 135, startY);
  pdf.text(formatCurr(subtotal), 170, startY);

  if (data.discountAmount && data.discountAmount > 0) {
    startY += 5;
    pdf.text(`Discount (${data.discountRate || 0}%):`, 135, startY);
    pdf.text(`-${formatCurr(data.discountAmount)}`, 170, startY);
  }

  if (data.taxAmount && data.taxAmount > 0) {
    startY += 5;
    pdf.text(`Tax (${data.taxRate || 0}%):`, 135, startY);
    pdf.text(`+${formatCurr(data.taxAmount)}`, 170, startY);
  }

  if (data.shippingAmount && data.shippingAmount > 0) {
    startY += 5;
    pdf.text("Shipping:", 135, startY);
    pdf.text(`+${formatCurr(data.shippingAmount)}`, 170, startY);
  }

  startY += 7;
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("Total Due:", 135, startY);
  pdf.text(formatCurr(data.total), 170, startY);

  // Notes
  if (data.note) {
    startY += 15;
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.text("Notes / Payment Instructions:", 20, startY);
    pdf.setFont("helvetica", "normal");
    const splitNote = pdf.splitTextToSize(data.note, 170);
    pdf.text(splitNote, 20, startY + 5);
  }

  return Buffer.from(pdf.output("arraybuffer"));
}

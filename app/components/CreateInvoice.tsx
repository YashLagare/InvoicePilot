"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import {
  Building2,
  CalendarIcon,
  Eye,
  FileText,
  Percent,
  Plus,
  Receipt,
  Sparkles,
  StickyNote,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useActionState, useState } from "react";
import { createInvoice } from "../action";
import { formatCurrency } from "../utils/formatCurrency";
import { invoiceSchema } from "../utils/zodSchemas";
import { InvoiceItemList } from "./InvoiceItemList";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

interface ClientOption {
  id: string;
  name: string;
  email: string;
  address: string | null;
  company: string | null;
}

interface CompanyProfileData {
  businessName: string | null;
  logoUrl: string | null;
  phone: string | null;
  website: string | null;
  taxId: string | null;
  defaultCurrency: string;
  paymentTerms: number;
}

interface defaultValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  clients?: ClientOption[];
  companyProfile?: CompanyProfileData | null;
  nextInvoiceNumber?: number;
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-blue-700 dark:text-blue-400" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-none">
          {title}
        </p>
        {subtitle && (
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

function FieldError({ error }: { error?: string[] }) {
  if (!error) return null;
  return <p className="text-red-500 text-xs font-medium mt-1">{error}</p>;
}

const CreateInvoice = ({
  address,
  firstName,
  lastName,
  email,
  clients = [],
  companyProfile,
  nextInvoiceNumber = 1,
}: defaultValues) => {
  const [lastResult, action] = useActionState(createInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: invoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currency, setCurrency] = useState(companyProfile?.defaultCurrency || "USD");
  const [invoicePrefix, setInvoicePrefix] = useState("INV");
  const [invoiceNumber, setInvoiceNumber] = useState(nextInvoiceNumber);

  // Client Selection State
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  // Sender State
  const [fromName, setFromName] = useState(
    companyProfile?.businessName || `${firstName || ""} ${lastName || ""}`.trim()
  );
  const [fromEmail, setFromEmail] = useState(email);
  const [fromAddress, setFromAddress] = useState(address);

  // Tax & Discounts
  const [taxRate, setTaxRate] = useState(0);
  const [discountRate, setDiscountRate] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(0);
  const [note, setNote] = useState("");
  const [invoiceName, setInvoiceName] = useState("Design & Development Invoice");

  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      description: "Web Development Services",
      quantity: 1,
      rate: 500,
    },
  ]);

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  const discountAmount = (subtotal * discountRate) / 100;
  const taxableAmount = subtotal - discountAmount;
  const taxAmount = (taxableAmount * taxRate) / 100;
  const total = taxableAmount + taxAmount + shippingAmount;

  const handleClientSelect = (clientId: string) => {
    setSelectedClientId(clientId);
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setClientName(client.name);
      setClientEmail(client.email);
      setClientAddress(client.address || "");
    }
  };

  const inputClass =
    "h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all";

  const labelClass = "text-slate-700 dark:text-slate-300 text-sm font-medium mb-1.5 block";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ── Form Section (Left Column) ── */}
      <div className="lg:col-span-7">
        <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
          <input type="hidden" name={fields.date.name} value={selectedDate.toISOString()} />
          <input type="hidden" name={fields.clientId.name} value={selectedClientId} />
          <input type="hidden" name={fields.subtotal.name} value={subtotal} />
          <input type="hidden" name={fields.taxRate.name} value={taxRate} />
          <input type="hidden" name={fields.taxAmount.name} value={taxAmount} />
          <input type="hidden" name={fields.discountRate.name} value={discountRate} />
          <input type="hidden" name={fields.discountAmount.name} value={discountAmount} />
          <input type="hidden" name={fields.shippingAmount.name} value={shippingAmount} />
          <input type="hidden" name={fields.total.name} value={total} />
          <input type="hidden" name="items" value={JSON.stringify(items)} />

          {/* ── Invoice Meta ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
            <SectionHeader icon={FileText} title="Invoice Details" subtitle="Name, prefix, number & currency" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Label className={labelClass}>Invoice Title *</Label>
                <Input
                  name={fields.invoiceName.name}
                  value={invoiceName}
                  onChange={(e) => setInvoiceName(e.target.value)}
                  placeholder="e.g. Consulting Invoice"
                  className={inputClass}
                />
                <FieldError error={fields.invoiceName.errors} />
              </div>

              <div>
                <Label className={labelClass}>Invoice Prefix & No. *</Label>
                <div className="flex">
                  <Input
                    name={fields.invoicePrefix.name}
                    value={invoicePrefix}
                    onChange={(e) => setInvoicePrefix(e.target.value)}
                    className="w-16 rounded-r-none text-center font-semibold bg-slate-100 dark:bg-slate-800 border-r-0"
                  />
                  <Input
                    type="number"
                    name={fields.invoiceNumber.name}
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(Number(e.target.value))}
                    className={`${inputClass} rounded-l-none`}
                  />
                </div>
                <FieldError error={fields.invoiceNumber.errors} />
              </div>

              <div>
                <Label className={labelClass}>Currency *</Label>
                <Select
                  value={currency}
                  name={fields.currency.name}
                  onValueChange={(val) => setCurrency(val)}
                >
                  <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                    <SelectItem value="AUD">AUD ($)</SelectItem>
                    <SelectItem value="INR">INR (₹)</SelectItem>
                  </SelectContent>
                </Select>
                <FieldError error={fields.currency.errors} />
              </div>
            </div>
          </div>

          {/* ── Sender & Client Section ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* From (Sender) */}
              <div>
                <SectionHeader icon={User} title="From (Seller)" subtitle="Your business details" />
                <div className="flex flex-col gap-3">
                  <div>
                    <Label className={labelClass}>Your Business Name *</Label>
                    <Input
                      name={fields.fromName.name}
                      value={fromName}
                      onChange={(e) => setFromName(e.target.value)}
                      className={inputClass}
                    />
                    <FieldError error={fields.fromName.errors} />
                  </div>
                  <div>
                    <Label className={labelClass}>Your Email *</Label>
                    <Input
                      name={fields.fromEmail.name}
                      value={fromEmail}
                      onChange={(e) => setFromEmail(e.target.value)}
                      className={inputClass}
                    />
                    <FieldError error={fields.fromEmail.errors} />
                  </div>
                  <div>
                    <Label className={labelClass}>Your Address *</Label>
                    <Input
                      name={fields.fromAddress.name}
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                      className={inputClass}
                    />
                    <FieldError error={fields.fromAddress.errors} />
                  </div>
                </div>
              </div>

              {/* To (Client) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <SectionHeader icon={UserCheck} title="Bill To (Client)" subtitle="Select or enter client" />
                  <Button variant="ghost" size="sm" asChild className="text-xs text-blue-600">
                    <Link href="/dashboard/clients/create">
                      <Plus className="w-3 h-3 mr-1" /> New
                    </Link>
                  </Button>
                </div>

                {clients.length > 0 && (
                  <div className="mb-3">
                    <Label className={labelClass}>Select Saved Client</Label>
                    <Select onValueChange={handleClientSelect}>
                      <SelectTrigger className="h-10 bg-blue-50/50 dark:bg-slate-950 border-blue-200 dark:border-slate-800 rounded-xl text-sm font-medium">
                        <SelectValue placeholder="Choose a client..." />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {clients.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name} {c.company ? `(${c.company})` : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <div>
                    <Label className={labelClass}>Client Name *</Label>
                    <Input
                      name={fields.clientName.name}
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Client or Company Name"
                      className={inputClass}
                    />
                    <FieldError error={fields.clientName.errors} />
                  </div>
                  <div>
                    <Label className={labelClass}>Client Email *</Label>
                    <Input
                      name={fields.clientEmail.name}
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="client@example.com"
                      className={inputClass}
                    />
                    <FieldError error={fields.clientEmail.errors} />
                  </div>
                  <div>
                    <Label className={labelClass}>Client Address *</Label>
                    <Input
                      name={fields.clientAddress.name}
                      value={clientAddress}
                      onChange={(e) => setClientAddress(e.target.value)}
                      placeholder="Billing Address"
                      className={inputClass}
                    />
                    <FieldError error={fields.clientAddress.errors} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Dates & Payment Terms ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
            <SectionHeader icon={CalendarIcon} title="Dates & Payment Terms" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className={labelClass}>Invoice Issue Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full h-10 justify-start text-left font-normal bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm"
                    >
                      <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                      {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(selectedDate)}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-xl">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => setSelectedDate(date || new Date())}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className={labelClass}>Payment Terms *</Label>
                <Select name={fields.dueDate.name} defaultValue="0">
                  <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm">
                    <SelectValue placeholder="Payment Terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Due on Receipt</SelectItem>
                    <SelectItem value="7">Net 7 Days</SelectItem>
                    <SelectItem value="15">Net 15 Days</SelectItem>
                    <SelectItem value="30">Net 30 Days</SelectItem>
                    <SelectItem value="60">Net 60 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* ── Line Items ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
            <SectionHeader icon={Receipt} title="Line Items" subtitle="Services or products delivered" />
            <InvoiceItemList items={items} setItems={setItems} currency={currency} />
          </div>

          {/* ── Tax, Discount & Shipping Adjustments ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
            <SectionHeader icon={Percent} title="Taxes, Discounts & Shipping" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className={labelClass}>Tax Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className={inputClass}
                />
              </div>

              <div>
                <Label className={labelClass}>Discount Rate (%)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.1"
                  value={discountRate}
                  onChange={(e) => setDiscountRate(Number(e.target.value))}
                  className={inputClass}
                />
              </div>

              <div>
                <Label className={labelClass}>Shipping / Fee ({currency})</Label>
                <Input
                  type="number"
                  min="0"
                  value={shippingAmount}
                  onChange={(e) => setShippingAmount(Number(e.target.value))}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* ── Note ── */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
            <SectionHeader icon={StickyNote} title="Notes & Payment Instructions" />
            <Textarea
              name={fields.note.name}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Thank you for your business! Bank transfer details or custom note..."
              className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-xl text-sm"
              rows={3}
            />
          </div>

          {/* ── Submit Button ── */}
          <div className="flex items-center justify-end">
            <SubmitButton text="Create & Send Invoice" />
          </div>
        </form>
      </div>

      {/* ── Live Invoice Document Preview (Right Column) ── */}
      <div className="lg:col-span-5 sticky top-20 self-start">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg p-6 overflow-hidden">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Live PDF Preview
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">
              PENDING
            </span>
          </div>

          {/* Rendered Invoice Paper Preview */}
          <div className="p-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/50 space-y-6 text-xs text-slate-700 dark:text-slate-300">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {fromName || "Your Company"}
                </h3>
                <p className="text-slate-500">{fromEmail}</p>
                <p className="text-slate-500 whitespace-pre-line">{fromAddress}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-blue-600">
                  {invoicePrefix}-{invoiceNumber}
                </p>
                <p className="text-slate-400">Date: {new Date(selectedDate).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Bill To */}
            <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                Billed To
              </p>
              <p className="font-medium text-slate-800 dark:text-slate-200 mt-1">{clientName || "Client Name"}</p>
              <p className="text-slate-500">{clientEmail || "client@example.com"}</p>
              <p className="text-slate-500">{clientAddress}</p>
            </div>

            {/* Items Table */}
            <div>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                    <th className="py-1">Description</th>
                    <th className="py-1 text-center">Qty</th>
                    <th className="py-1 text-right">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-1.5 font-medium">{item.description || "Item"}</td>
                      <td className="py-1.5 text-center">{item.quantity}</td>
                      <td className="py-1.5 text-right font-medium">
                        {formatCurrency({ amount: item.quantity * item.rate, currency })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculation Totals */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1 text-right">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal:</span>
                <span>{formatCurrency({ amount: subtotal, currency })}</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({discountRate}%):</span>
                  <span>-{formatCurrency({ amount: discountAmount, currency })}</span>
                </div>
              )}
              {taxRate > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Tax ({taxRate}%):</span>
                  <span>+{formatCurrency({ amount: taxAmount, currency })}</span>
                </div>
              )}
              {shippingAmount > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Shipping:</span>
                  <span>+{formatCurrency({ amount: shippingAmount, currency })}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span>Total Amount Due:</span>
                <span className="text-blue-600 dark:text-blue-400">
                  {formatCurrency({ amount: total, currency })}
                </span>
              </div>
            </div>

            {note && (
              <div className="p-2.5 rounded-lg bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-300 text-[11px]">
                <span className="font-semibold block">Note:</span> {note}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoice;

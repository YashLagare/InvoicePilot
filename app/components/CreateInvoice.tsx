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
  CalendarIcon,
  FileText,
  StickyNote,
  User,
  UserCheck,
} from "lucide-react";
import { useActionState, useState } from "react";
import { createInvoice } from "../action";
import { formatCurrency } from "../utils/formatCurrency";
import { invoiceSchema } from "../utils/zodSchemas";
import { InvoiceItemList } from "./InvoiceItemList";
import SubmitButton from "./SubmitButton";

interface defaultValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
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
      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-blue-700" />
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
  const [currency, setCurrency] = useState("INR");

  const [items, setItems] = useState([
    {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      rate: 0,
    },
  ]);

  const calculateTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );

  const inputClass =
    "h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all";

  const labelClass = "text-slate-700 dark:text-slate-300 text-sm font-medium mb-1.5 block";

  return (
    <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
      {/* Hidden fields */}
      <input
        type="hidden"
        name={fields.date.name}
        value={selectedDate.toISOString()}
      />
      <input type="hidden" name={fields.total.name} value={calculateTotal} />
      <input type="hidden" name="items" value={JSON.stringify(items)} />

      {/* ── Invoice Meta ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
        <SectionHeader
          icon={FileText}
          title="Invoice Details"
          subtitle="Name, number and currency"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Invoice Name + Draft badge */}
          <div className="sm:col-span-1">
            <Label className={labelClass}>
              Invoice Name <span className="text-red-500">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold border border-slate-200 dark:border-slate-700 h-10 flex-shrink-0">
                Draft
              </span>
              <Input
                name={fields.invoiceName.name}
                key={fields.invoiceName.key}
                defaultValue={fields.invoiceName.defaultValue}
                placeholder="Invoice name"
                className={inputClass}
              />
            </div>
            <FieldError error={fields.invoiceName.errors} />
          </div>

          {/* Invoice Number */}
          <div>
            <Label className={labelClass}>
              Invoice No. <span className="text-red-500">*</span>
            </Label>
            <div className="flex">
              <span className="h-10 px-3 flex items-center border border-r-0 border-slate-200 dark:border-slate-800 rounded-l-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-sm font-medium">
                #
              </span>
              <Input
                name={fields.invoiceNumber.name}
                key={fields.invoiceNumber.key}
                defaultValue={fields.invoiceNumber.defaultValue}
                placeholder="1"
                className={`${inputClass} rounded-l-none`}
              />
            </div>
            <FieldError error={fields.invoiceNumber.errors} />
          </div>

          {/* Currency */}
          <div>
            <Label className={labelClass}>
              Currency <span className="text-red-500">*</span>
            </Label>
            <Select
              defaultValue="INR"
              name={fields.currency.name}
              key={fields.currency.key}
              onValueChange={(value) => setCurrency(value)}
            >
              <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:ring-offset-0">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INR">Indian Rupee — INR</SelectItem>
                <SelectItem value="USD">US Dollar — USD</SelectItem>
                <SelectItem value="EUR">Euro — EUR</SelectItem>
                <SelectItem value="GBP">British Pound — GBP</SelectItem>
                <SelectItem value="CNY">Canadian Dollar — CAD</SelectItem>
              </SelectContent>
            </Select>
            <FieldError error={fields.currency.errors} />
          </div>
        </div>
      </div>

      {/* ── From / To ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* From */}
          <div>
            <SectionHeader icon={User} title="From" subtitle="Your details" />
            <div className="flex flex-col gap-3">
              <div>
                <Label className={labelClass}>
                  Your name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={fields.fromName.name}
                  key={fields.fromName.key}
                  defaultValue={firstName + " " + lastName}
                  placeholder="Your name"
                  className={inputClass}
                />
                <FieldError error={fields.fromName.errors} />
              </div>
              <div>
                <Label className={labelClass}>
                  Your email <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={fields.fromEmail.name}
                  key={fields.fromEmail.key}
                  placeholder="Your email"
                  defaultValue={email}
                  className={inputClass}
                />
                <FieldError error={fields.fromEmail.errors} />
              </div>
              <div>
                <Label className={labelClass}>
                  Your address <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={fields.fromAddress.name}
                  key={fields.fromAddress.key}
                  placeholder="Your address"
                  defaultValue={address}
                  className={inputClass}
                />
                <FieldError error={fields.fromAddress.errors} />
              </div>
            </div>
          </div>

          {/* Divider — vertical on md, horizontal on mobile */}
          <div className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-slate-100 dark:bg-slate-800 pointer-events-none" />

          {/* To */}
          <div>
            <SectionHeader
              icon={UserCheck}
              title="To"
              subtitle="Client details"
            />
            <div className="flex flex-col gap-3">
              <div>
                <Label className={labelClass}>
                  Client name <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={fields.clientName.name}
                  key={fields.clientName.key}
                  defaultValue={fields.clientName.defaultValue}
                  placeholder="Client name"
                  className={inputClass}
                />
                <FieldError error={fields.clientName.errors} />
              </div>
              <div>
                <Label className={labelClass}>
                  Client email <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={fields.clientEmail.name}
                  key={fields.clientEmail.key}
                  defaultValue={fields.clientEmail.defaultValue}
                  placeholder="Client email"
                  className={inputClass}
                />
                <FieldError error={fields.clientEmail.errors} />
              </div>
              <div>
                <Label className={labelClass}>
                  Client address <span className="text-red-500">*</span>
                </Label>
                <Input
                  name={fields.clientAddress.name}
                  key={fields.clientAddress.key}
                  defaultValue={fields.clientAddress.defaultValue}
                  placeholder="Client address"
                  className={inputClass}
                />
                <FieldError error={fields.clientAddress.errors} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Date & Due ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
        <SectionHeader
          icon={CalendarIcon}
          title="Dates"
          subtitle="Invoice date and payment terms"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className={labelClass}>
              Invoice Date <span className="text-red-500">*</span>
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full h-10 justify-start text-left font-normal bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm hover:bg-white dark:hover:bg-slate-900 hover:border-blue-600 transition-all"
                >
                  <CalendarIcon className="w-4 h-4 mr-2 text-slate-400" />
                  {selectedDate
                    ? new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 rounded-xl shadow-lg border-slate-200 dark:border-slate-800 dark:bg-slate-900">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  disabled={{ before: new Date() }}
                  startMonth={new Date()}
                />
              </PopoverContent>
            </Popover>
            <FieldError error={fields.date.errors} />
          </div>

          <div>
            <Label className={labelClass}>
              Payment Terms <span className="text-red-500">*</span>
            </Label>
            <Select
              name={fields.dueDate.name}
              key={fields.dueDate.key}
              defaultValue={fields.dueDate.defaultValue}
            >
              <SelectTrigger className="h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:ring-offset-0">
                <SelectValue placeholder="Select payment terms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Due on Receipt</SelectItem>
                <SelectItem value="15">Net 15</SelectItem>
                <SelectItem value="30">Net 30</SelectItem>
              </SelectContent>
            </Select>
            <FieldError error={fields.dueDate.errors} />
          </div>
        </div>
      </div>

      {/* ── Line Items ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-5">
        <SectionHeader
          icon={FileText}
          title="Line Items"
          subtitle="Description, quantity and rate"
        />
        <InvoiceItemList
          items={items}
          setItems={setItems}
          currency={currency}
        />
      </div>

      {/* ── Note ── */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 mb-6">
        <SectionHeader
          icon={StickyNote}
          title="Note"
          subtitle="Optional message to the client"
        />
        <Textarea
          name={fields.note.name}
          key={fields.note.key}
          defaultValue={fields.note.defaultValue}
          placeholder="Add a note or payment instructions for your client..."
          className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all resize-none"
          rows={3}
        />
      </div>

      {/* ── Submit ── */}
      <div className="flex items-center justify-end">
        <SubmitButton text="Send Invoice" />
      </div>
    </form>
  );
};

export default CreateInvoice;

// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Prisma } from "@/lib/generated/prisma/client";
// import { useForm } from "@conform-to/react";
// import { parseWithZod } from "@conform-to/zod";
// import { Calendar1Icon } from "lucide-react";
// import { useActionState, useState } from "react";
// import { editInvoice } from "../action";
// import { formatCurrency } from "../utils/formatCurrency";
// import { invoiceSchema } from "../utils/zodSchemas";
// import SubmitButton from "./SubmitButton";

// interface editModeData {
//     data: Prisma.InvoiceGetPayload<{}>;
// }

// const EditInvoicePage = ({ data }: editModeData) => {

//     const [lastResult, action] = useActionState(editInvoice, undefined);
//     const [form, fields] = useForm({
//         lastResult,

//         onValidate({ formData }) {
//             return parseWithZod(formData, {
//                 schema: invoiceSchema,
//             })
//         },

//         shouldValidate: 'onBlur',
//         shouldRevalidate: 'onInput',
//     })

//     const [selectedDate, setSelectedDate] = useState(data.date);
//     const [rate, setRate] = useState(data.invoiceItemRate.toString());
//     const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
//     const [currency, setCurrency] = useState(data.currency);

//     const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);

//     return (
//         <Card className="w-full max-w-4xl mx-auto">
//             <CardContent className="p-6">
//                 <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>

//                     <input type="hidden"
//                         name={fields.date.name}
//                         value={selectedDate.toISOString()}
//                     />

//                     <input type="hidden"
//                         name="id"
//                         value={data.id}
//                     />

//                     {/* total */}
//                     <input type="hidden"
//                         name={fields.total.name}
//                         value={calculateTotal}
//                     />

//                     <div className="flex flex-col gap-1 w-fit mb-6">
//                         <div className="flex items-center gap-4">
//                             <Badge variant="secondary">Draft<span className="text-red-500">*</span></Badge>
//                             <Input
//                                 name={fields.invoiceName.name}
//                                 key={fields.invoiceName.key}
//                                 defaultValue={data.invoiceName}
//                                 placeholder="Invoice Name" />
//                         </div>
//                         <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
//                     </div>

//                     <div className="grid md:grid-cols-3 gap-6 mb-6">
//                         <div>
//                             <Label>Invoice No.<span className="text-red-500">*</span></Label>
//                             <div className="flex">
//                                 <span className="px-3 border border-r rounded-l-md bg-muted flex item-center">#</span>
//                                 <Input
//                                     name={fields.invoiceNumber.name}
//                                     key={fields.invoiceNumber.key}
//                                     defaultValue={data.invoiceNumber}
//                                     placeholder="1"
//                                     required className="rounded-l-none" />
//                             </div>
//                             <p className="text-sm text-red-500">{fields.invoiceNumber.errors}</p>
//                         </div>

//                         <div>
//                             <Label>Currency<span className="text-red-500">*</span></Label>
//                             <Select defaultValue="INR" name={fields.currency.name} key={fields.currency.key}
//                                 onValueChange={(value) => setCurrency(value)}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select Currency" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
//                                     <SelectItem value="USD">United States Dollar -- USD</SelectItem>
//                                     <SelectItem value="EUR">Euro -- EUR</SelectItem>
//                                     <SelectItem value="GBP">British Pound -- GBP</SelectItem>
//                                     <SelectItem value="CNY">Canadian Dollar -- CAD</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                             <p className="text-sm text-red-500">{fields.currency.errors}</p>
//                         </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-6 mb-6">
//                         <div>
//                             <Label>From <span className="text-red-500">*</span></Label>
//                             <div className="space-y-2">

//                                 <Input
//                                     name={fields.fromName.name}
//                                     key={fields.fromName.key}
//                                     defaultValue={data.fromName}
//                                     placeholder="Your name"
//                                 />
//                                 <p className="text-sm text-red-500">{fields.fromName.errors}</p>

//                                 <Input
//                                     name={fields.fromEmail.name}
//                                     key={fields.fromEmail.key}
//                                     placeholder="Your email"
//                                     defaultValue={data.fromEmail}
//                                 />
//                                 <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>

//                                 <Input
//                                     name={fields.fromAddress.name}
//                                     key={fields.fromAddress.key}
//                                     placeholder="Your Address"
//                                     defaultValue={data.fromAddress}
//                                 />
//                                 <p className="text-sm text-red-500">{fields.fromAddress.errors}</p>

//                             </div>
//                         </div>

//                         <div>
//                             <Label>To<span className="text-red-500">*</span></Label>
//                             <div className="space-y-2">

//                                 <Input name={fields.clientName.name} key={fields.clientName.key} defaultValue={data.clientName} placeholder="Client name" />
//                                 <p className="text-sm text-red-500">{fields.clientName.errors}</p>

//                                 <Input name={fields.clientEmail.name} key={fields.clientEmail.key} defaultValue={data.clientEmail} placeholder="Client email" />
//                                 <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>

//                                 <Input name={fields.clientAddress.name} key={fields.clientAddress.key} defaultValue={data.clientAddress} placeholder="Client Address" />
//                                 <p className="text-sm text-red-500">{fields.clientAddress.errors}</p>

//                             </div>
//                         </div>
//                     </div>

//                     <div className="grid md:grid-cols-2 gap-2 mb-6">
//                         <div>
//                             <Label>Date<span className="text-red-500">*</span></Label>
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button variant="outline" className="w-[280px] text-left justify-start">
//                                         <Calendar1Icon />
//                                         {selectedDate ? (
//                                             new Intl.DateTimeFormat("en-US", {
//                                                 dateStyle: "long",
//                                             }).format(selectedDate)
//                                         ) : (
//                                             <span className="ml-2 text-sm text-muted-foreground0">
//                                                 Pick a date
//                                             </span>
//                                         )}
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent>
//                                     <Calendar
//                                         mode="single"
//                                         selected={selectedDate}
//                                         onSelect={(date) =>
//                                             setSelectedDate(date || new Date())
//                                         }
//                                         disabled={{ before: new Date() }}
//                                         startMonth={new Date()}
//                                     />
//                                 </PopoverContent>
//                             </Popover>
//                             <p className="text-sm text-red-500">{fields.date.errors}</p>
//                         </div>

//                         <div>
//                             <Label>Invoice Due<span className="text-red-500">*</span></Label>
//                             <Select name={fields.dueDate.name} key={fields.dueDate.key} defaultValue={data.dueDate}>
//                                 <SelectTrigger className="w-full">
//                                     <SelectValue placeholder="Select Invoice Due date" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="0">Due on Reciept</SelectItem>
//                                     <SelectItem value="15">Net 15</SelectItem>
//                                     <SelectItem value="30">Net 30</SelectItem>
//                                 </SelectContent>
//                             </Select>
//                             <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
//                         </div>
//                     </div>

//                     <div>
//                         <div className="grid grid-cols-12 gap-4 mb-2 font-medium">
//                             <p className="col-span-6">Description</p>
//                             <p className="col-span-2">Quantity</p>
//                             <p className="col-span-2">Rate</p>
//                             <p className="col-span-2">Amount</p>
//                         </div>

//                         <div className="grid grid-cols-12 gap-4 mb-4">
//                             <div className="col-span-6">
//                                 <Textarea name={fields.invoiceItemDescription.name} key={fields.invoiceItemDescription.key} defaultValue={data.invoiceItemDescription} placeholder="Item name & Description" />
//                                 <p className="text-sm text-red-500">{fields.invoiceItemDescription.errors}</p>
//                             </div>
//                             <div className="col-span-2">
//                                 <Input name={fields.invoiceItemQuantity.name} key={fields.invoiceItemQuantity.key} type="number" placeholder="0"
//                                     value={quantity}
//                                     onChange={(e) => setQuantity(e.target.value)}
//                                 />
//                                 <p className="text-sm text-red-500">{fields.invoiceItemQuantity.errors}</p>
//                             </div>
//                             <div className="col-span-2">
//                                 <Input name={fields.invoiceItemRate.name} key={fields.invoiceItemRate.key} type="number" placeholder="0"
//                                     value={rate}
//                                     onChange={(e) => setRate(e.target.value)}
//                                 />
//                                 <p className="text-sm text-red-500">{fields.invoiceItemRate.errors}</p>
//                             </div>
//                             <div className="col-span-2">
//                                 <Input value={formatCurrency({ amount: calculateTotal, currency: currency as any })} disabled />
//                             </div>
//                         </div>

//                     </div>

//                     <div className="flex justify-end">
//                         <div className="w-1/3">
//                             <div className="flex justify-between py-2">
//                                 <span>Subtotal</span>
//                                 <span>{formatCurrency({ amount: calculateTotal, currency: currency as any })}</span>
//                             </div>
//                             <div className="flex justify-between py-2 border-t">
//                                 <span>Total ({currency})</span>
//                                 <span className="font-medium underline underline-offset-2">{formatCurrency({ amount: calculateTotal, currency: currency as any })}</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <Label>Note</Label>
//                         <Textarea name={fields.note.name} key={fields.note.key} defaultValue={data.note || ""} placeholder="Add a note" />
//                     </div>

//                     <div className="flex items-center justify-end mt-6">
//                         <div>
//                             <SubmitButton text="Update Invoice" />
//                         </div>
//                     </div>
//                 </form>

//             </CardContent>
//         </Card>
//     )
// }

// export default EditInvoicePage

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
import { Prisma } from "@/lib/generated/prisma/client";
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
import { editInvoice } from "../action";
import { formatCurrency } from "../utils/formatCurrency";
import { invoiceSchema } from "../utils/zodSchemas";
import { InvoiceItemList } from "./InvoiceItemList";
import SubmitButton from "./SubmitButton";

interface EditModeData {
  data: Prisma.InvoiceGetPayload<{
    include: {
      items: true;
    };
  }>;
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

const EditInvoicePage = ({ data }: EditModeData) => {
  const [lastResult, action] = useActionState(editInvoice, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: invoiceSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [selectedDate, setSelectedDate] = useState(data.date);
  const [currency, setCurrency] = useState(data.currency);

  const [items, setItems] = useState(
    data.items.length > 0
      ? data.items
      : [
          {
            id: crypto.randomUUID(),
            description: "",
            quantity: 1,
            rate: 0,
          },
        ],
  );

  const calculateTotal = items.reduce(
    (sum, item) => sum + item.quantity * item.rate,
    0,
  );

  const inputClass =
    "h-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all";

  const labelClass = "text-slate-700 dark:text-slate-300 text-sm font-medium mb-1.5 block";

  return (
    <div className="flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
          <FileText className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white leading-none mb-1">
            Edit Invoice
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Update the details below and save your changes.
          </p>
        </div>
      </div>

      <form id={form.id} action={action} onSubmit={form.onSubmit} noValidate>
        {/* Hidden fields */}
        <input
          type="hidden"
          name={fields.date.name}
          value={selectedDate.toISOString()}
        />
        <input type="hidden" name={fields.total.name} value={calculateTotal} />
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <input type="hidden" name="id" value={data.id} />
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
                  defaultValue={data.invoiceName}
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
                  defaultValue={data.invoiceNumber}
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
                defaultValue={data.currency}
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
                    defaultValue={data.fromName}
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
                    defaultValue={data.fromEmail}
                    placeholder="Your email"
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
                    defaultValue={data.fromAddress}
                    placeholder="Your address"
                    className={inputClass}
                  />
                  <FieldError error={fields.fromAddress.errors} />
                </div>
              </div>
            </div>

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
                    defaultValue={data.clientName}
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
                    defaultValue={data.clientEmail}
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
                    defaultValue={data.clientAddress}
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
                defaultValue={data.dueDate}
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
        </div>{" "}
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
            defaultValue={data.note || ""}
            placeholder="Add a note or payment instructions for your client..."
            className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all resize-none"
            rows={3}
          />
        </div>
        {/* ── Submit ── */}
        <div className="flex items-center justify-end">
          <SubmitButton text="Update Invoice" />
        </div>
      </form>
    </div>
  );
};

export default EditInvoicePage;

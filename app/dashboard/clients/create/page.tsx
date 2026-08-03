"use client";

import { useActionState } from "react";
import { createClientAction } from "@/app/action";
import SubmitButton from "@/app/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { clientSchema } from "@/app/utils/zodSchemas";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function CreateClientPage() {
    const [lastResult, action] = useActionState(createClientAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: clientSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="max-w-3xl mx-auto p-4 lg:p-6">
            <div className="mb-6 flex items-center gap-3">
                <Button variant="outline" size="icon" asChild className="rounded-xl">
                    <Link href="/dashboard/clients">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        Create New Client
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Add client details to use in future invoices.
                    </p>
                </div>
            </div>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-blue-600" /> Client Profile Information
                    </CardTitle>
                    <CardDescription>
                        Enter contact and billing details for your client.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id={form.id} onSubmit={form.onSubmit} action={action} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Client Full Name *</Label>
                                <Input
                                    id="name"
                                    name={fields.name.name}
                                    defaultValue={fields.name.initialValue}
                                    placeholder="Acme Corp / Jane Doe"
                                    className="rounded-xl"
                                />
                                <p className="text-xs text-red-500">{fields.name.errors}</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    name={fields.email.name}
                                    defaultValue={fields.email.initialValue}
                                    placeholder="billing@acmecorp.com"
                                    className="rounded-xl"
                                />
                                <p className="text-xs text-red-500">{fields.email.errors}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="company">Company Name</Label>
                                <Input
                                    id="company"
                                    name={fields.company.name}
                                    defaultValue={fields.company.initialValue}
                                    placeholder="Acme Technologies Inc."
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    name={fields.phone.name}
                                    defaultValue={fields.phone.initialValue}
                                    placeholder="+1 (555) 000-0000"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="address">Billing Address *</Label>
                            <Textarea
                                id="address"
                                name={fields.address.name}
                                defaultValue={fields.address.initialValue}
                                placeholder="123 Tech Boulevard, Suite 400, San Francisco, CA 94107"
                                className="rounded-xl min-h-[90px]"
                            />
                            <p className="text-xs text-red-500">{fields.address.errors}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="taxId">Tax ID / VAT / GST Number</Label>
                                <Input
                                    id="taxId"
                                    name={fields.taxId.name}
                                    defaultValue={fields.taxId.initialValue}
                                    placeholder="US-123456789"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes / Special Instructions</Label>
                                <Input
                                    id="notes"
                                    name={fields.notes.name}
                                    defaultValue={fields.notes.initialValue}
                                    placeholder="Preferred payment terms Net 30"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <Button variant="outline" asChild className="w-1/3 rounded-xl">
                                <Link href="/dashboard/clients">Cancel</Link>
                            </Button>
                            <div className="w-2/3">
                                <SubmitButton text="Save Client Profile" />
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

"use client";

import { useActionState } from "react";
import { updateCompanyProfileAction } from "@/app/action";
import SubmitButton from "@/app/components/SubmitButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { companyProfileSchema } from "@/app/utils/zodSchemas";
import { Building2, CreditCard, DollarSign, Image, Settings } from "lucide-react";

interface ProfileData {
    id: string;
    businessName: string | null;
    logoUrl: string | null;
    phone: string | null;
    website: string | null;
    taxId: string | null;
    defaultCurrency: string;
    paymentTerms: number;
    bankDetails: string | null;
}

interface UserData {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    address: string | null;
}

export default function CompanySettingsForm({
    profile,
    user,
}: {
    profile: ProfileData | null;
    user: UserData | null;
}) {
    const [lastResult, action] = useActionState(updateCompanyProfileAction, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: companyProfileSchema,
            });
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    });

    return (
        <div className="max-w-4xl mx-auto p-4 lg:p-6 space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-600" /> Business Profile & Settings
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Configure your business branding, logo, default invoice terms, and payout information.
                </p>
            </div>

            <Card className="rounded-2xl border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Building2 className="w-5 h-5 text-blue-600" /> Company & Branding Information
                    </CardTitle>
                    <CardDescription>
                        This information will appear on generated PDFs, client emails, and online payment pages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form id={form.id} onSubmit={form.onSubmit} action={action} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="businessName">Company / Business Name</Label>
                                <Input
                                    id="businessName"
                                    name={fields.businessName.name}
                                    defaultValue={profile?.businessName || `${user?.firstName || ""} ${user?.lastName || ""}`.trim()}
                                    placeholder="Acme Design Studio LLC"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="logoUrl">Company Logo URL</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="logoUrl"
                                        name={fields.logoUrl.name}
                                        defaultValue={profile?.logoUrl || ""}
                                        placeholder="https://example.com/logo.png"
                                        className="rounded-xl"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Business Phone</Label>
                                <Input
                                    id="phone"
                                    name={fields.phone.name}
                                    defaultValue={profile?.phone || ""}
                                    placeholder="+1 (555) 123-4567"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website">Website</Label>
                                <Input
                                    id="website"
                                    name={fields.website.name}
                                    defaultValue={profile?.website || ""}
                                    placeholder="https://acmestudio.com"
                                    className="rounded-xl"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                                <Input
                                    id="taxId"
                                    name={fields.taxId.name}
                                    defaultValue={profile?.taxId || ""}
                                    placeholder="EIN-987654321"
                                    className="rounded-xl"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="defaultCurrency">Default Invoice Currency</Label>
                                <Select name={fields.defaultCurrency.name} defaultValue={profile?.defaultCurrency || "USD"}>
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select currency" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="USD">USD ($ - United States Dollar)</SelectItem>
                                        <SelectItem value="EUR">EUR (€ - Euro)</SelectItem>
                                        <SelectItem value="GBP">GBP (£ - British Pound)</SelectItem>
                                        <SelectItem value="CAD">CAD ($ - Canadian Dollar)</SelectItem>
                                        <SelectItem value="AUD">AUD ($ - Australian Dollar)</SelectItem>
                                        <SelectItem value="INR">INR (₹ - Indian Rupee)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="paymentTerms">Default Payment Terms (Days)</Label>
                                <Select name={fields.paymentTerms.name} defaultValue={(profile?.paymentTerms || 0).toString()}>
                                    <SelectTrigger className="rounded-xl">
                                        <SelectValue placeholder="Select terms" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        <SelectItem value="0">Due on Receipt (Net 0)</SelectItem>
                                        <SelectItem value="7">Net 7 Days</SelectItem>
                                        <SelectItem value="15">Net 15 Days</SelectItem>
                                        <SelectItem value="30">Net 30 Days</SelectItem>
                                        <SelectItem value="60">Net 60 Days</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bankDetails" className="flex items-center gap-1.5">
                                <CreditCard className="w-4 h-4 text-blue-600" /> Bank Payout / Payment Instructions (Optional)
                            </Label>
                            <Textarea
                                id="bankDetails"
                                name={fields.bankDetails.name}
                                defaultValue={profile?.bankDetails || ""}
                                placeholder="Bank Name: Chase Bank&#10;Account Name: Acme Design Studio&#10;Account #: 123456789&#10;Routing / Swift #: CHASUS33"
                                className="rounded-xl min-h-[100px]"
                            />
                            <p className="text-xs text-slate-500">
                                These payment details will be printed on generated invoice PDFs for bank transfer payments.
                            </p>
                        </div>

                        <div className="pt-2">
                            <SubmitButton text="Save Settings & Business Profile" />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

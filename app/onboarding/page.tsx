"use client"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { FileText, LayoutGrid, Lock, ShieldCheck, Zap } from "lucide-react"
import { useActionState } from "react"
import { onboardingUser } from "../action"
import SubmitButton from "../components/SubmitButton"
import { onboardingSchema } from "../utils/zodSchemas"

const Onboarding = () => {
    const [lastResult, action] = useActionState(onboardingUser, undefined);
    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, {
                schema: onboardingSchema,
            });
        },
        shouldValidate: 'onBlur',
        shouldRevalidate: 'onInput',
    });

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-8">

            <Card className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-2xl border-0 rounded-2xl dark:bg-slate-900">

                {/* ── Left: Brand Panel ── */}
                <div className="relative bg-blue-700 dark:bg-blue-900 p-8 sm:p-10 flex flex-col justify-between overflow-hidden">

                    {/* Subtle blobs */}
                    <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
                    <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-white font-semibold text-base leading-none">InvoicePilot</p>
                            <p className="text-blue-200 text-xs mt-0.5">Seamless invoicing</p>
                        </div>
                    </div>

                    {/* Headline + Features */}
                    <div className="relative z-10 mt-10 flex-1">
                        <h2 className="text-white text-2xl sm:text-3xl font-semibold leading-snug tracking-tight mb-8">
                            Set up your account<br />in under a minute
                        </h2>

                        <ul className="space-y-5">
                            {[
                                { icon: Zap, title: "Fast onboarding", desc: "Just a few details and you're in" },
                                { icon: Lock, title: "Bank-grade security", desc: "Your data is always encrypted" },
                                { icon: LayoutGrid, title: "Custom templates", desc: "Match your brand in minutes" },
                            ].map(({ icon: Icon, title, desc }) => (
                                <li key={title} className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-lg bg-white/12 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Icon className="w-3.5 h-3.5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white text-sm font-medium leading-none mb-1">{title}</p>
                                        <p className="text-blue-200 text-xs leading-relaxed">{desc}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Progress dots */}
                    <div className="relative z-10 flex items-center gap-1.5 mt-10">
                        <div className="h-1.5 w-8 rounded-full bg-white" />
                        <div className="h-1.5 w-5 rounded-full bg-white/30" />
                        <div className="h-1.5 w-5 rounded-full bg-white/30" />
                    </div>
                </div>

                {/* ── Right: Form Panel ── */}
                <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 flex flex-col justify-center">

                    {/* Header */}
                    <div className="mb-8">
                        <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full tracking-wide uppercase mb-3">
                            Step 1 of 1 · Personal details
                        </span>
                        <h1 className="text-slate-900 dark:text-white text-2xl font-semibold tracking-tight mb-1.5">Almost there!</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            Enter your details below to finish creating your account.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        className="flex flex-col gap-5"
                        action={action}
                        id={form.id}
                        onSubmit={form.onSubmit}
                        noValidate
                    >
                        {/* First + Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1.5">
                                <Label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                                    First name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    className="h-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400
                                               focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0
                                               focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all"
                                    name={fields.firstName.name}
                                    key={fields.firstName.key}
                                    defaultValue={fields.firstName.initialValue}
                                    placeholder="John"
                                    autoComplete="given-name"
                                />
                                {fields.firstName.errors && (
                                    <p className="text-red-500 text-xs font-medium">{fields.firstName.errors}</p>
                                )}
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <Label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                                    Last name <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    className="h-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400
                                               focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0
                                               focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all"
                                    name={fields.lastName.name}
                                    key={fields.lastName.key}
                                    defaultValue={fields.lastName.initialValue}
                                    placeholder="Doe"
                                    autoComplete="family-name"
                                />
                                {fields.lastName.errors && (
                                    <p className="text-red-500 text-xs font-medium">{fields.lastName.errors}</p>
                                )}
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                                Business address <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                className="h-11 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-sm placeholder:text-slate-400
                                           focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-0
                                           focus-visible:border-blue-600 focus-visible:bg-white dark:focus-visible:bg-slate-900 transition-all"
                                name={fields.address.name}
                                key={fields.address.key}
                                defaultValue={fields.address.initialValue}
                                placeholder="123 Invoice Street, City, Country"
                                autoComplete="street-address"
                            />
                            {fields.address.errors && (
                                <p className="text-red-500 text-xs font-medium">{fields.address.errors}</p>
                            )}
                        </div>

                        {/* Trust note */}
                        <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl px-4 py-3">
                            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <p className="text-blue-700 dark:text-blue-300 text-xs leading-relaxed">
                                Your information is encrypted and never shared with third parties.
                            </p>
                        </div>

                        {/* Submit */}
                        <div className="mt-1">
                            <SubmitButton text="Complete setup" />
                        </div>

                        {/* Footer trust */}
                        <p className="text-center text-slate-400 text-xs flex items-center justify-center gap-1.5">
                            <Lock className="w-3 h-3" />
                            SSL secured · GDPR compliant
                        </p>
                    </form>
                </div>

            </Card>
        </div>
    )
}

export default Onboarding
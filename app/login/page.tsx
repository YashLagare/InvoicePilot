import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, FileText, Mail, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import SubmitButton from "../components/SubmitButton";
import { DemoNotice } from "../components/DemoNotice";
import { DemoLoginSubmit } from "../components/DemoLoginButton";
import { auth, signIn } from "../utils/auth";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 dark:bg-slate-950 p-4 sm:p-8">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">

        {/* ── Left: Brand Panel ── */}
        <div className="relative bg-blue-700 dark:bg-blue-900 p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -top-12 -right-12 w-52 h-52 rounded-full bg-white/5" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-base leading-none">InvoicePilot</p>
              <p className="text-blue-200 text-xs mt-0.5">Enterprise Invoicing Platform</p>
            </div>
          </div>

          {/* Body */}
          <div className="relative z-10 mt-8 flex-1">
            <h2 className="text-white text-2xl sm:text-3xl font-bold leading-snug tracking-tight mb-3">
              Explore the Platform
            </h2>
            <p className="text-blue-100 text-sm leading-relaxed mb-8">
              Sign in with 1-click instant demo mode or request a passwordless magic link.
            </p>

            <ul className="space-y-4">
              {[
                { icon: Sparkles, title: "Instant Demo Access", desc: "Explore populated dashboard without waiting for email" },
                { icon: Zap, title: "Magic Link Sign In", desc: "Passwordless email verification architecture" },
                { icon: ShieldCheck, title: "Enterprise Grade", desc: "Stripe Checkout, Client Directory & Analytics" },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold leading-none mb-1">{title}</p>
                    <p className="text-blue-200 text-xs leading-relaxed">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer Badge */}
          <div className="relative z-10 flex items-center gap-2 mt-8 pt-4 border-t border-white/15 text-xs text-blue-200">
            <ShieldCheck className="w-4 h-4 text-white" />
            <span>Secure Authentication Powered by Auth.js</span>
          </div>
        </div>

        {/* ── Right: Login Form & Options ── */}
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 flex flex-col justify-center">

          <div className="mb-6">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-bold px-2.5 py-1 rounded-full tracking-wide uppercase mb-2">
              Authentication Portal
            </span>
            <h1 className="text-slate-900 dark:text-white text-2xl font-extrabold tracking-tight mb-1">
              Choose Sign In Method
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">
              Instant demo access or magic link verification.
            </p>
          </div>

          {/* ── Option 1: Instant Demo Access ── */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Recruiters & Evaluators
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                RECOMMENDED
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Access pre-populated client records, live visual invoice builder, and analytics instantly.
            </p>
            <form
              action={async () => {
                "use server";
                await signIn("demo-login", { redirectTo: "/dashboard" });
              }}
            >
              <DemoLoginSubmit />
            </form>
          </div>

          {/* ── Divider ── */}
          <div className="relative mb-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <span className="relative bg-white dark:bg-slate-900 px-3 text-xs font-semibold uppercase text-slate-400">
              OR CONTINUE WITH MAGIC LINK
            </span>
          </div>

          {/* ── Option 2: Magic Link ── */}
          <form
            action={async (formData) => {
              "use server";
              await signIn("nodemailer", formData);
            }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <Label className="text-slate-700 dark:text-slate-300 text-xs font-semibold">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <Input
                  name="email"
                  required
                  type="email"
                  placeholder="name@company.com"
                  className="h-10 pl-9 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 dark:text-slate-100 rounded-xl text-xs sm:text-sm"
                />
              </div>
            </div>

            <SubmitButton text="Send Magic Link" />
          </form>

          <DemoNotice />

          <div className="mt-5">
            <Link
              href="/"
              className={buttonVariants({
                variant: "outline",
                className: "w-full h-10 rounded-xl border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-all",
              })}
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Homepage
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
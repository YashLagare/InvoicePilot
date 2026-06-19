import { ModeToggle } from "@/app/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, FileText, Send, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white">
              Invoice<span className="text-blue-600">Pilot</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
            </Link>
            {/* <Link href="/login">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">Get Started</Button>
            </Link> */}
          </div>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="flex-1 flex items-center justify-center pt-20 pb-24 lg:pt-32 lg:pb-40 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            <span>The modern standard for invoicing</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Create beautiful invoices in <span className="text-blue-600 dark:text-blue-500">seconds.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop wrestling with spreadsheets and word docs. InvoicePilot gives freelancers and SMBs everything they need to create, manage, and deliver professional invoices instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/login">
              <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl w-full sm:w-auto shadow-xl shadow-blue-200 dark:shadow-none transition-all hover:-translate-y-1">
                Get Started for Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex flex-col items-center justify-center gap-3">
            <p className="text-sm text-slate-500 font-medium uppercase tracking-widest">Trusted by Modern Teams</p>
            <div className="flex items-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="font-bold text-xl">Acme Corp</span>
              <span className="font-bold text-xl">Globex</span>
              <span className="font-bold text-xl">Initech</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Everything you need to get paid faster</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">A complete toolkit designed to eliminate administrative overhead so you can focus on doing what you do best.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Lightning Fast Creation</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Build detailed invoices with dynamic line items, auto-calculated totals, and customizable notes in under 60 seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6">
                <Send className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">One-Click Delivery</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate pixel-perfect PDFs or email them directly to your clients from the dashboard with a single click.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6">
                <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Total Tracking Control</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Never lose track of payments again. View pending and paid invoices at a glance with our intuitive filtering system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Footer Section ── */}
      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Ready to streamline your invoicing?</h2>
          <Link href="/login">
            <Button size="lg" className="h-14 px-8 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl shadow-xl shadow-blue-200 dark:shadow-none transition-all hover:-translate-y-1">
              Create Your First Invoice
            </Button>
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-8">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-slate-500 dark:text-slate-400">
              Invoice<span className="text-blue-600/70 dark:text-blue-500/70">Pilot</span>
            </span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} InvoicePilot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

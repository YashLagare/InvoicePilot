import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Play, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden bg-background text-foreground">
      {/* Radial ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 text-center">
        {/* Product Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary border border-border text-secondary-foreground text-xs font-semibold mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span>The All-In-One Modern Invoicing Platform</span>
        </div>

        {/* Strong 1-Sentence Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]">
          Create professional invoices, get paid online, and manage clients — <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600 dark:to-indigo-400">all from one modern dashboard.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-normal">
          Stop wrestling with static templates and spreadsheets. InvoicePilot gives freelancers and teams live split-screen visual previews, saved client management, and automated Stripe Checkout.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" className="h-13 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl w-full shadow-lg transition-all hover:-translate-y-0.5 font-semibold">
              Get Started for Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <a href="#demo-preview" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="h-13 px-7 text-base border-border bg-background hover:bg-accent hover:text-accent-foreground rounded-2xl w-full font-medium transition-all">
              <Play className="w-4 h-4 mr-2 text-primary fill-primary" /> Explore Demo
            </Button>
          </a>
        </div>

        {/* Social Proof / Tech Stack */}
        <div className="pt-6 border-t border-border max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-muted-foreground font-medium">
          <span className="uppercase tracking-widest text-[11px] text-muted-foreground/80 font-semibold w-full sm:w-auto mb-1 sm:mb-0">Powered By Modern Stack</span>
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Next.js 16 (App Router)
          </span>
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> Stripe Payments
          </span>
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> PostgreSQL & Prisma
          </span>
          <span className="flex items-center gap-1.5 text-foreground font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> TypeScript & Tailwind
          </span>
        </div>
      </div>
    </section>
  );
}

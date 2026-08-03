import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Lock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Stripe Security & Compliance | InvoicePilot",
  description: "Learn how InvoicePilot uses Stripe PCI-DSS Level 1 compliance for online payments.",
};

export default function StripeSecurityPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12 max-w-4xl space-y-8">
        <div className="space-y-3 border-b border-border pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Bank-Grade Security</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Stripe Payment Security</h1>
          <p className="text-sm text-muted-foreground">PCI-DSS Level 1 Compliant Payment Architecture</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. PCI Service Provider Level 1</h2>
            <p>
              InvoicePilot relies on Stripe for credit card payment processing. Stripe has been audited by an independent PCI Quality Security Assessor (QSA) and is certified as a PCI Service Provider Level 1 — the most stringent level of certification available in the payments industry.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Zero Card Data Storage</h2>
            <p>
              No credit card numbers or sensitive cardholder data are ever stored on InvoicePilot servers. All payment inputs are handled directly by Stripe Checkout via encrypted, tokenized iframe sessions.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. Encryption & HTTPS Protocol</h2>
            <p>
              All traffic between your browser, InvoicePilot, and Stripe is encrypted using Transport Layer Security (TLS 1.3/HTTPS). Public invoice links use cryptographic UUID tokens (`/pay/[token]`) to prevent unauthorized URL manipulation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. Webhook Signature Verification</h2>
            <p>
              Server-to-server payment notifications sent from Stripe to InvoicePilot use cryptographic signature verification (`stripe-signature`) to ensure payment status updates originate strictly from Stripe servers.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

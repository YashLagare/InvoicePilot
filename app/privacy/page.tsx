import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Shield } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | InvoicePilot",
  description: "InvoicePilot Privacy Policy and data protection terms.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12 max-w-4xl space-y-8">
        <div className="space-y-3 border-b border-border pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Legal Notice</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground">Last updated: August 3, 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Introduction</h2>
            <p>
              InvoicePilot (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our website and invoicing platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Information We Collect</h2>
            <p>
              We collect information that you provide directly to us when creating an account, setting up company profiles, managing clients, generating invoices, and processing online payments through Stripe.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Account credentials (Email, Name)</li>
              <li>Company profile details (Business name, Tax ID, Address, Currency preferences)</li>
              <li>Client information (Name, Email, Billing Address)</li>
              <li>Transaction data processed securely via Stripe</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. How We Use Your Information</h2>
            <p>
              We use collected information to operate, maintain, and provide the core features of InvoicePilot, including generating PDF invoices, sending billing emails, and tracking revenue analytics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. Data Security</h2>
            <p>
              We implement industry-standard technical measures, including encrypted PostgreSQL databases, HTTPS communication, and tokenized payment links via Stripe Checkout to protect your personal and financial data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">5. Contact Us</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please contact our support team at <a href="mailto:yashlagare77@gmail.com" className="text-primary hover:underline">yashlagare77@gmail.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

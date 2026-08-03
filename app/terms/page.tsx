import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { FileText } from "lucide-react";

export const metadata = {
  title: "Terms of Service | InvoicePilot",
  description: "InvoicePilot Terms of Service and user agreement.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 lg:px-8 py-12 max-w-4xl space-y-8">
        <div className="space-y-3 border-b border-border pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>User Agreement</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-muted-foreground">Last updated: August 3, 2026</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing or using InvoicePilot, you agree to be bound by these Terms of Service. If you do not agree to all terms and conditions, you may not access or use the platform.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">2. Description of Service</h2>
            <p>
              InvoicePilot provides cloud-based invoicing, client management, PDF invoice generation, and Stripe online payment integration for freelancers, agencies, and SMBs.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">3. User Responsibilities</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials and ensuring the accuracy of all invoicing data, client records, and tax calculations submitted through the service.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">4. Payment Processing</h2>
            <p>
              Payment processing services for InvoicePilot are provided by Stripe and are subject to the Stripe Connected Account Agreement. By using Stripe Checkout on InvoicePilot, you agree to comply with Stripe&apos;s terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-foreground">5. Termination</h2>
            <p>
              We reserve the right to suspend or terminate access to our service for conduct that violates these Terms of Service or is harmful to other users or third parties.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

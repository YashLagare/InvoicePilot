import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Download, FileText, Sparkles, UserCheck } from "lucide-react";

export default function ProductPreview() {
  return (
    <section id="demo-preview" className="py-12 lg:py-20 relative bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-3 px-3 py-1 border-border text-primary bg-secondary/50 font-semibold">
            Interactive Product Tour
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            See the actual product in action
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            No abstract placeholders. Experience our split-screen invoice builder and public client checkout portal.
          </p>
        </div>

        {/* Dashboard & Live Preview Graphic Card Container */}
        <div className="max-w-6xl mx-auto rounded-3xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden">
          {/* Top Browser Bar */}
          <div className="h-11 bg-muted/70 border-b border-border px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="px-4 py-1 rounded-lg bg-background border border-border text-xs text-muted-foreground font-mono flex items-center gap-2 max-w-sm w-full justify-center">
              <span className="text-emerald-500 font-semibold">https://</span>invoice-pilot.app/dashboard/invoices/create
            </div>
            <div className="w-12" />
          </div>

          {/* Realistic Split-Screen Mockup Content */}
          <div className="p-6 md:p-8 bg-muted/20 grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs text-card-foreground">
            {/* Left Column: Builder Form Preview */}
            <div className="lg:col-span-7 bg-card rounded-2xl border border-border p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="font-bold text-sm text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Invoice #INV-2026-004
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-secondary text-secondary-foreground border border-border">
                  Live Builder
                </span>
              </div>

              {/* Saved Client Selector mockup */}
              <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Saved Client Auto-filled</p>
                  <p className="font-semibold text-foreground">Acme Corporation (contact@acmecorp.com)</p>
                </div>
                <UserCheck className="w-4 h-4 text-primary" />
              </div>

              {/* Items row */}
              <div className="space-y-2">
                <p className="font-semibold text-foreground">Line Items</p>
                <div className="grid grid-cols-12 gap-2 font-medium bg-muted p-2 rounded-lg text-[11px] text-muted-foreground">
                  <span className="col-span-6">Description</span>
                  <span className="col-span-2 text-center">Qty</span>
                  <span className="col-span-4 text-right">Rate ($)</span>
                </div>
                <div className="grid grid-cols-12 gap-2 p-2 rounded-lg border border-border text-foreground">
                  <span className="col-span-6 font-medium">UI/UX Design & Frontend Development</span>
                  <span className="col-span-2 text-center text-muted-foreground">1</span>
                  <span className="col-span-4 text-right font-semibold">$1,250.00</span>
                </div>
                <div className="grid grid-cols-12 gap-2 p-2 rounded-lg border border-border text-foreground">
                  <span className="col-span-6 font-medium">Stripe Payment Gateway Integration</span>
                  <span className="col-span-2 text-center text-muted-foreground">1</span>
                  <span className="col-span-4 text-right font-semibold">$450.00</span>
                </div>
              </div>

              {/* Tax & Discount controls mockup */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-2.5 rounded-lg border border-border bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block font-medium">Tax Rate</span>
                  <span className="font-bold text-foreground">10% ($170.00)</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block font-medium">Discount</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">5% (-$85.00)</span>
                </div>
                <div className="p-2.5 rounded-lg border border-border bg-muted/40">
                  <span className="text-[10px] text-muted-foreground block font-medium">Grand Total</span>
                  <span className="font-extrabold text-primary">$1,785.00</span>
                </div>
              </div>
            </div>

            {/* Right Column: Live Rendered PDF / Document Paper Mockup */}
            <div className="lg:col-span-5 bg-card rounded-2xl border border-border p-5 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Live Rendered Preview
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    CLIENT PORTAL
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-muted/30 border border-border space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-foreground text-sm">InvoicePilot Studio</p>
                      <p className="text-[11px] text-muted-foreground">hello@invoicepilot.com</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary text-xs">INV-2026-004</p>
                      <p className="text-[10px] text-muted-foreground">Due: Net 15</p>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-background border border-border text-[11px]">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase">Billed To</p>
                    <p className="font-medium text-foreground">Acme Corporation</p>
                  </div>

                  <div className="pt-2 border-t border-border space-y-1 text-right text-[11px]">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal:</span>
                      <span>$1,700.00</span>
                    </div>
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                      <span>Discount (5%):</span>
                      <span>-$85.00</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax (10%):</span>
                      <span>+$170.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-foreground pt-1 text-xs border-t border-border">
                      <span>Amount Due:</span>
                      <span className="text-primary font-extrabold">$1,785.00</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <Button variant="outline" size="sm" className="w-1/2 text-xs rounded-xl h-9 border-border bg-background hover:bg-accent">
                  <Download className="w-3.5 h-3.5 mr-1" /> PDF Download
                </Button>
                <Button size="sm" className="w-1/2 text-xs bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-9">
                  <CreditCard className="w-3.5 h-3.5 mr-1" /> Pay via Stripe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

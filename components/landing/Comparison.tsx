import { CheckCircle2, XCircle } from "lucide-react";

export default function Comparison() {
  const items = [
    {
      feature: "Invoice Document Generation",
      traditional: "Manual Word / Excel / Canva PDFs",
      invoicePilot: "Live Split-Screen Visual Builder",
    },
    {
      feature: "Client Sharing & Delivery",
      traditional: "Static PDF Email Attachments",
      invoicePilot: "Public Responsive Client Portal (/pay/[token])",
    },
    {
      feature: "Tax & Discount Math",
      traditional: "Manual Calculator Work",
      invoicePilot: "Automatic Subtotal, Tax %, Discount % & Fees",
    },
    {
      feature: "Client Payment Collection",
      traditional: "Offline Checks & Bank Wire Transfers",
      invoicePilot: "Stripe Online Credit Card Checkout Sessions",
    },
    {
      feature: "Client Records",
      traditional: "Scattered Email Threads & Spreadsheets",
      invoicePilot: "Saved Client Directory & History Views",
    },
    {
      feature: "Business Intelligence",
      traditional: "No Dashboard Visibility",
      invoicePilot: "Real-Time Revenue & Outstanding Analytics",
    },
  ];

  return (
    <section id="comparison" className="py-20 bg-muted/20 border-t border-border text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            Why Upgrade?
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Traditional Invoicing vs. InvoicePilot
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            See how modern invoicing compares to outdated manual spreadsheets.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="max-w-4xl mx-auto bg-card text-card-foreground rounded-3xl border border-border shadow-sm overflow-hidden">
          <div className="grid grid-cols-12 bg-muted p-4 text-xs md:text-sm font-bold border-b border-border">
            <span className="col-span-4 text-foreground">Feature</span>
            <span className="col-span-4 text-muted-foreground text-center">Traditional Way</span>
            <span className="col-span-4 text-primary text-right pr-2">InvoicePilot</span>
          </div>

          <div className="divide-y divide-border text-xs md:text-sm">
            {items.map((row, idx) => (
              <div key={idx} className="grid grid-cols-12 p-4 items-center hover:bg-muted/40 transition-colors">
                <span className="col-span-4 font-semibold text-foreground">
                  {row.feature}
                </span>

                <div className="col-span-4 flex items-center justify-center gap-1.5 text-muted-foreground text-center px-2">
                  <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span className="truncate">{row.traditional}</span>
                </div>

                <div className="col-span-4 flex items-center justify-end gap-1.5 font-bold text-right pr-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-primary truncate">{row.invoicePilot}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

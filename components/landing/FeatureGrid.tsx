import { Badge } from "@/components/ui/badge";
import { Activity, Building2, Calculator, CreditCard, Eye, ShieldCheck, Users, Zap } from "lucide-react";

export default function FeatureGrid() {
  const categories = [
    {
      categoryName: "Build",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      features: [
        {
          title: "Live Visual Preview",
          description: "See your invoice update in real-time side-by-side as you add line items, taxes, notes, and prices.",
          icon: Eye,
        },
        {
          title: "Automated Math & Taxes",
          description: "Interactive calculations for tax rates (GST/VAT%), discount rates %, and shipping fees with zero manual errors.",
          icon: Calculator,
        },
      ],
    },
    {
      categoryName: "Manage",
      badgeColor: "bg-secondary text-secondary-foreground border-border",
      features: [
        {
          title: "Client Directory",
          description: "Save client contact records, tax IDs, and billing addresses for instant auto-filling when creating invoices.",
          icon: Users,
        },
        {
          title: "Company Branding & Settings",
          description: "Upload business logos, set default currencies, tax IDs, and configure bank payout transfer instructions.",
          icon: Building2,
        },
      ],
    },
    {
      categoryName: "Get Paid",
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      features: [
        {
          title: "Stripe Online Checkout",
          description: "Collect payments via credit card directly on invoice pages. Webhooks automatically mark invoices as PAID.",
          icon: CreditCard,
        },
        {
          title: "Tokenized Client Portals",
          description: "Issue secure web links (/pay/[token]) where clients can view details, download PDFs, and pay instantly.",
          icon: ShieldCheck,
        },
      ],
    },
    {
      categoryName: "Track",
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      features: [
        {
          title: "Revenue & Receivables Analytics",
          description: "Real-time dashboard cards for Collected Revenue, Pending Receivables, Active Clients, and Total Invoices.",
          icon: Zap,
        },
        {
          title: "Invoice Activity Audit Trail",
          description: "Complete chronological logs for invoice creation, client views, sent emails, and payment receipts.",
          icon: Activity,
        },
      ],
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30 border-y border-border text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 px-3 py-1 border-border font-semibold text-muted-foreground">
            Categorized Platform Features
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            Everything you need to run invoicing smoothly
          </h2>
          <p className="text-muted-foreground mt-4 text-base md:text-lg">
            Organized into four core pillars designed to save administrative hours every month.
          </p>
        </div>

        {/* Feature Grid by Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground rounded-3xl border border-border p-7 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${cat.badgeColor}`}>
                  {cat.categoryName}
                </span>
              </div>

              <div className="space-y-6">
                {cat.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center flex-shrink-0 mt-0.5 border border-border">
                      <feat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

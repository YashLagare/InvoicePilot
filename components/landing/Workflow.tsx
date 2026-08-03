import { CheckCircle2, CreditCard, Eye, Users } from "lucide-react";

export default function Workflow() {
  const steps = [
    {
      number: "01",
      title: "Set Up Company Profile & Clients",
      description: "Save client contact details, upload your business logo, tax IDs, default currency, and bank transfer payout notes.",
      icon: Users,
    },
    {
      number: "02",
      title: "Build Invoices with Live Preview",
      description: "Select a client, type line items, adjust tax rates or discounts, and preview your PDF document in real-time.",
      icon: Eye,
    },
    {
      number: "03",
      title: "Deliver Link & Get Paid Online",
      description: "Send client portal links. Clients can view details, download PDFs, and pay instantly via Stripe credit card checkout.",
      icon: CreditCard,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-2">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            How InvoicePilot works
          </h2>
          <p className="text-muted-foreground mt-3 text-base">
            From setup to payment collection in under 2 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="bg-card text-card-foreground rounded-3xl border border-border p-8 relative flex flex-col justify-between shadow-sm hover:-translate-y-1 transition-transform"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-primary/30 font-mono">
                    {s.number}
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-secondary flex items-center justify-center text-primary border border-border">
                    <s.icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center text-xs font-semibold text-primary">
                <span>Fast Setup</span>
                <CheckCircle2 className="w-3.5 h-3.5 ml-auto text-emerald-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

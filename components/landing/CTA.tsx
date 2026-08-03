import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 relative overflow-hidden bg-muted/30 border-t border-border text-foreground">
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10 max-w-4xl">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground mx-auto mb-6 shadow-xl">
          <Sparkles className="w-6 h-6" />
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          Ready to streamline your invoicing & get paid faster?
        </h2>

        <p className="text-muted-foreground text-base md:text-lg mb-10 max-w-2xl mx-auto">
          Join freelancers and SMBs taking control of their invoicing, client records, and Stripe online payments.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/login">
            <Button size="lg" className="h-14 px-9 text-base bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-xl transition-all hover:-translate-y-1 font-semibold">
              Create Your First Invoice <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

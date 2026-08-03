import { FileText } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card text-card-foreground py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Invoice<span className="text-primary">Pilot</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Professional invoicing, saved client profiles, live previews, and Stripe payment collection for modern teams.
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Product</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#comparison" className="hover:text-primary transition-colors">Why Choose Us</a></li>
              <li><span className="text-muted-foreground/60">Pricing (Coming Soon)</span></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Contact Us</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="mailto:yashlagare77@gmail.com" className="hover:text-primary transition-colors">Email</Link></li>
              <li><Link href="https://portfolio-five-opal-53.vercel.app/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link href="https://github.com/YashLagare" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Legal & Security</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/stripe-security" className="hover:text-primary transition-colors">Stripe Security</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InvoicePilot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

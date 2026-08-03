import { FileText, Heart } from "lucide-react";
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
            <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Resources</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/login" className="hover:text-primary transition-colors">Sign In</Link></li>
              <li><Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Legal & Security</p>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-primary transition-colors cursor-pointer">Stripe Security</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} InvoicePilot. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> Next.js 16, TypeScript & Stripe
          </p>
        </div>
      </div>
    </footer>
  );
}

import { ModeToggle } from "@/app/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md transition-colors">
      <div className="container mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-foreground tracking-tight">
            Invoice<span className="text-primary">Pilot</span>
          </span>
        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#comparison" className="hover:text-primary transition-colors">
            Why Us
          </a>
          <span className="inline-flex items-center gap-1 text-muted-foreground/70 cursor-not-allowed">
            Pricing <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-semibold border border-border">Soon</span>
          </span>
        </nav>

        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex font-medium text-foreground hover:bg-accent hover:text-accent-foreground">
              Sign In
            </Button>
          </Link>
          <Link href="/login">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium shadow-sm">
              Get Started <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

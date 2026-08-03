"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DemoLoginSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-200 dark:shadow-none transition-all hover:-translate-y-0.5 text-sm md:text-base"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Setting Up Demo Workspace...
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
          Explore Demo (Instant Access)
          <ArrowRight className="w-4 h-4 ml-1" />
        </span>
      )}
    </Button>
  );
}

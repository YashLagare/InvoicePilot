import { Info } from "lucide-react";

export function DemoNotice() {
  return (
    <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 mt-5">
      <Info className="w-5 h-5 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        <span className="font-semibold text-slate-700 dark:text-slate-200">Demo Environment:</span> You can use the password login for quick access, or the magic-link option if you prefer passwordless sign-in. Email delivery may still be limited by the sandbox service.
      </p>
    </div>
  );
}

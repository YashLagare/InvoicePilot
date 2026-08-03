import { Info } from "lucide-react";

export function DemoNotice() {
  return (
    <div className="flex items-start gap-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 mt-4">
      <Info className="w-4 h-4 text-slate-500 dark:text-slate-400 flex-shrink-0 mt-0.5" />
      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
        <span className="font-semibold text-slate-700 dark:text-slate-300">Magic Link SMTP Note:</span> Verification emails are routed via Mailtrap sandbox SMTP and delivered to the project owner&apos;s test inbox. Use <span className="font-semibold text-blue-600 dark:text-blue-400">Explore Demo</span> above for instant workspace access.
      </p>
    </div>
  );
}

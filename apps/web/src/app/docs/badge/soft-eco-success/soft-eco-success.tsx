import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function SoftEcoSuccess() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all duration-300">
      <span className="bg-emerald-500 text-white px-3 py-1.5 text-xs font-bold rounded-full leading-none flex items-center shadow-[0_0_10px_rgba(16,185,129,0.4)]">
        Resolved
      </span>
      <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-200 text-sm font-medium leading-none pb-[1px]">
        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
        <span>All systems operational</span>
      </span>
      <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-500 opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

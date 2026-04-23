import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Glassmorphism() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-zinc-100/50 dark:bg-white/5 backdrop-blur-md border border-zinc-200 dark:border-white/10 rounded-full hover:bg-zinc-200/50 dark:hover:bg-white/10 transition-all duration-300">
      <span className="bg-zinc-200/50 dark:bg-white/10 text-zinc-900 dark:text-white px-3 py-1.5 text-xs font-medium rounded-full leading-none flex items-center backdrop-blur-lg">
        v2.0
      </span>
      <span className="flex items-center gap-1.5 text-zinc-800 dark:text-gray-100 text-sm font-medium leading-none pb-[1px]">
        <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-300" />
        <span>Dashboard Redesign</span>
      </span>
      <ArrowRight className="w-4 h-4 text-zinc-500 dark:text-gray-400 opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

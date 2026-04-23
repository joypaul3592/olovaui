import React from 'react';
import { ArrowRight, Rocket } from 'lucide-react';

export default function GhostOutline() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-transparent border-2 border-blue-500/40 rounded-full hover:border-blue-500 transition-all duration-300">
      <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full leading-none flex items-center">
        Beta
      </span>
      <span className="flex items-center gap-1.5 text-blue-900 dark:text-blue-100 text-sm font-medium leading-none pb-[1px]">
        <Rocket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <span>Try the new API</span>
      </span>
      <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

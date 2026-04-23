import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FloatingOutlinePill() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 py-2 px-4 bg-transparent rounded-full hover:bg-zinc-100 dark:hover:bg-white/5 transition-all duration-300">
      <span className="flex items-center gap-2 text-zinc-600 dark:text-gray-300 text-sm font-medium leading-none">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
        </span>
        <span>Live collaboration is here</span>
      </span>
      <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-gray-500 opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

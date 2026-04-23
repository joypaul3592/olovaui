import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function DarkMinimalist() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-zinc-100 dark:bg-[#141414] border border-zinc-200 dark:border-[#2a2a2a] rounded-full hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] hover:border-zinc-300 dark:hover:border-[#404040] transition-all duration-300">
      <span className="bg-zinc-200 dark:bg-[#2a2a2a] text-zinc-600 dark:text-gray-300 px-3 py-1.5 text-xs font-medium rounded-full leading-none flex items-center">
        Changelog
      </span>
      <span className="flex items-center gap-1.5 text-zinc-500 dark:text-gray-400 text-sm font-medium leading-none pb-[1px] group-hover:text-zinc-800 dark:group-hover:text-gray-200 transition-colors">
        <span>Fixes & Improvements</span>
      </span>
      <ArrowRight className="w-4 h-4 text-zinc-400 dark:text-gray-500 opacity-90 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-600 dark:group-hover:text-gray-300" />
    </a>
  );
}

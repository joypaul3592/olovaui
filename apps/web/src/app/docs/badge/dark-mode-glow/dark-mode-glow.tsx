import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export default function DarkModeGlow() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-white dark:bg-black border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] rounded-full hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:border-purple-400 transition-all duration-300">
      <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1.5 text-xs font-semibold rounded-full leading-none flex items-center">
        New Feature
      </span>
      <span className="flex items-center gap-1.5 text-gray-200 text-sm font-medium leading-none pb-[1px]">
        <Zap className="w-4 h-4 text-purple-400" fill="currentColor" />
        <span>AI powered insights</span>
      </span>
      <ArrowRight className="w-4 h-4 text-purple-400 opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

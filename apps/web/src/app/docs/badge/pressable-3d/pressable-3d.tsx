import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

export default function Pressable3D() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-indigo-500 border-b-[4px] border-indigo-700 rounded-full active:border-b-0 active:translate-y-[4px] hover:bg-indigo-400 transition-all duration-100">
      <span className="bg-indigo-900/40 text-white px-3 py-1.5 text-xs font-bold rounded-full leading-none flex items-center">
        Pro
      </span>
      <span className="flex items-center gap-1.5 text-white text-sm font-medium leading-none pb-[1px]">
        <Star className="w-4 h-4 text-yellow-300" fill="currentColor" />
        <span>Upgrade your plan</span>
      </span>
      <ArrowRight className="w-4 h-4 text-white opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

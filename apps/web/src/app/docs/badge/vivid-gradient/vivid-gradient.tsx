import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';

export default function VividGradient() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-full hover:opacity-90 transition-all duration-300 shadow-lg shadow-purple-500/20">
      <span className="bg-white text-black px-3 py-1.5 text-xs font-bold rounded-full leading-none flex items-center">
        Hot
      </span>
      <span className="flex items-center gap-1.5 text-white text-sm font-semibold leading-none pb-[1px]">
        <Flame className="w-4 h-4 text-yellow-200" fill="currentColor" />
        <span>Trending Templates</span>
      </span>
      <ArrowRight className="w-4 h-4 text-white opacity-90 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

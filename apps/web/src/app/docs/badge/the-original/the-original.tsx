import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TheOriginal() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-[#4353FF] border-[3px] border-zinc-950 dark:border-[#1F2023] rounded-full hover:bg-[#3b4ae6] transition-all duration-300">
      <span className="bg-white text-black px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full leading-none flex items-center">
        Update
      </span>
      <span className="flex items-center gap-1.5 text-white text-[15px] font-medium leading-none pb-[1px]">
        <span className="text-lg leading-none drop-shadow-sm">✨</span> 
        <span>Introducing <span className="font-bold">Saas App</span></span>
      </span>
      <ArrowRight className="w-4 h-4 text-white opacity-90 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
    </a>
  );
}

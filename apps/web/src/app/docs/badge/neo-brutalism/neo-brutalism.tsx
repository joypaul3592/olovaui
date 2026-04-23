import React from 'react';
import { ArrowRight, Bell } from 'lucide-react';

export default function NeoBrutalism() {
  return (
    <a href="#" className="group relative inline-flex items-center gap-3 p-1 pr-4 bg-yellow-300 border-2 border-black rounded-full shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all duration-200">
      <span className="bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full leading-none flex items-center">
        Alert
      </span>
      <span className="flex items-center gap-1.5 text-black text-sm font-bold leading-none pb-[1px]">
        <Bell className="w-4 h-4 text-black" />
        <span>Action Required</span>
      </span>
      <ArrowRight className="w-4 h-4 text-black opacity-90 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={3} />
    </a>
  );
}

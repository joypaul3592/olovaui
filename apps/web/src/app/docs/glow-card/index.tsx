"use client";

import { GlowCard } from "./glow-card";

export function GlowCardView() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex min-h-[520px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-[#07050d] p-8 shadow-[0_30px_120px_rgba(7,5,13,0.65)]">
        <GlowCard>
          <h2>Your Title</h2>
          <p>Your content here</p>
        </GlowCard>
      </div>
    </div>
  );
}

export default GlowCardView;

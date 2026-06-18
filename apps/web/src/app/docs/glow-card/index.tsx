"use client";

import { GlowCard } from "./glow-card";

export function GlowCardView() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center overflow-hidden rounded-[28px]">
        <GlowCard>
          <h2>Your Title</h2>
          <p>Your content here</p>
        </GlowCard>
      </div>
    </div>
  );
}

export default GlowCardView;

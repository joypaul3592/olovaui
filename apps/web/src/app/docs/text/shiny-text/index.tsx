"use client";

import { ShinyText } from "./shiny-text";

export function ShinyTextView() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      {/* Default shiny text */}
      <ShinyText 
        className="text-4xl font-bold"
        speed={3}
      >
        Shiny Text Effect
      </ShinyText>

      {/* Custom colors */}
      <ShinyText 
        className="text-3xl font-semibold"
        speed={2}
        colors={["#FFD700", "rgba(255, 215, 0, 0)", "#FFD700"]}
      >
        Golden Shine
      </ShinyText>

      {/* Different angle */}
      <ShinyText 
        className="text-3xl font-semibold"
        speed={4}
        angle={45}
        colors={["#00C9FF", "rgba(0, 201, 255, 0)", "#00C9FF"]}
      >
        Diagonal Flow
      </ShinyText>

      {/* Slower animation */}
      <ShinyText 
        className="text-2xl"
        speed={6}
        colors={["#FF6B6B", "rgba(255, 107, 107, 0)", "#FF6B6B"]}
      >
        Slow Red Glow
      </ShinyText>

      {/* Disabled state */}
      <ShinyText 
        className="text-xl text-gray-500"
        disabled
      >
        Disabled State
      </ShinyText>
    </div>
  );
}

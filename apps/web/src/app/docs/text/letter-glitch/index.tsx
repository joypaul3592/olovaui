"use client";

import { useEffect, useState } from "react";
import { GlitchText } from "./glitch-text";

const lines = [
  { text: "> Initializing system...", color: "#61dca3", delay: 0 },
  { text: "> Loading modules...", color: "#61dca3", delay: 400 },
  { text: "> Connecting to server...", color: "#61dca3", delay: 800 },
  { text: "> STATUS: ONLINE", color: "#ffffff", delay: 1200 },
];

export function LetterGlitchView() {
  const [triggers, setTriggers] = useState(lines.map(() => 0));

  useEffect(() => {
    const timers = lines.map((line, index) =>
      window.setTimeout(() => {
        setTriggers((current) =>
          current.map((value, currentIndex) => (currentIndex === index ? value + 1 : value)),
        );
      }, line.delay),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
        <div className="space-y-1">
          {lines.map((line, index) => (
            <div key={line.text}>
              <GlitchText
                glitchColors={["#1a3a2a", "#61dca3", "#2a4a3a"]}
                color={line.color}
                duration={700}
                stagger={22}
                glitchSpeed={35}
                triggerKey={triggers[index]}
                className="text-[14px]"
              >
                {line.text}
              </GlitchText>
            </div>
          ))}
        </div>
  );
}

export default LetterGlitchView;

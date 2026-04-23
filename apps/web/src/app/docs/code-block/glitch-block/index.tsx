"use client";

import { GlitchBlock } from "./glitch-block";

const tabs = [
    { label: "npm", command: "npm create vite@latest" },
    { label: "Yarn", command: "yarn create vite" },
    { label: "pnpm", command: "pnpm create vite@latest" },
    { label: "Bun", command: "bun create vite@latest" },
    { label: "Deno", command: "deno run npm:create-vite@latest" },
];

export default function GlitchBlockView() {
    return <GlitchBlock tabs={tabs} />;
}

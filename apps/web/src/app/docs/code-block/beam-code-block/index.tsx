"use client";

import { BeamCodeBlock } from "./beam-code-block";

export default function BeamCodeBlockView() {
    return (
        <BeamCodeBlock
            tabs={[
                { label: "npm", command: "npm create vite@latest" },
                { label: "Yarn", command: "yarn create vite" },
                { label: "pnpm", command: "pnpm create vite" },
                { label: "Bun", command: "bun create vite" },
                { label: "Deno", command: "deno run -A npm:create-vite" },
            ]}
        />
    );
}

"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface SmCodeBlockCommandProps {
  pnpm: string;
  yarn: string;
  npm: string;
  bun: string;
}

export function SmCodeBlockCommand({
  pnpm,
  yarn,
  npm,
  bun,
}: SmCodeBlockCommandProps) {
  const commands = {
    npm,
    bun,
    yarn,
    pnpm,
  } as const;

  const tabs = Object.keys(commands) as (keyof typeof commands)[];

  const [activeTab, setActiveTab] = useState<keyof typeof commands>("npm");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = commands[activeTab];
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-fit overflow-hidden rounded-lg border border-border bg-zinc-100 dark:bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-medium ${
                activeTab === tab
                  ? "text-zinc-900 dark:text-white"
                  : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-600 dark:text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="overflow-x-auto p-4">
        <pre className="text-sm text-zinc-800 dark:text-zinc-100">
          <code>
            <span className="text-zinc-400 dark:text-zinc-500">$ </span>
            {commands[activeTab]}
          </code>
        </pre>
      </div>
    </div>
  );
}

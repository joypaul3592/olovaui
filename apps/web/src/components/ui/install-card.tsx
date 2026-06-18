"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import CodeSnippet from "./code-snippet";

export default function InstallCard({
  manager,
  command,
}: {
  manager: string;
  command: string;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="relative rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-3">
        <h3 className="font-semibold">{manager}</h3>
      </div>

      <div className="absolute right-3 top-3">
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${manager} command`}
          className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <CodeSnippet
        code={command}
        ariaLabel={`Copy ${manager} command`}
        hideButton
      />
    </article>
  );
}

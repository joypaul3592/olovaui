"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

export default function CodeSnippet({
  code,
  ariaLabel = "Copy code",
  hideButton = false,
}: {
  code: string;
  ariaLabel?: string;
  hideButton?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="relative">
      <pre className="overflow-x-auto rounded-md bg-muted px-3 py-3 text-sm leading-7">
        <code>{code}</code>
      </pre>

      {!hideButton ? (
        <button
          type="button"
          onClick={copy}
          aria-label={ariaLabel}
          className="absolute right-2 top-2 inline-flex items-center gap-2 rounded-md border border-border bg-background px-2 py-1 text-xs font-medium text-foreground shadow-sm transition hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      ) : null}
    </div>
  );
}

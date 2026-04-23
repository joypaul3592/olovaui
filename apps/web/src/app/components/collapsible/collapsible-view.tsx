"use client";

import * as React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./collapsible";

const panelClassName = "flex w-full max-w-lg flex-col gap-4";

export function CollapsibleDefaultView() {
  return (
    <div className={panelClassName}>
      <Collapsible defaultOpen>
        <CollapsibleTrigger>Release notes · v1.8</CollapsibleTrigger>
        <CollapsibleContent>
          The new release adds smart defaults, improved a11y states, and tighter
          spacing for dense layouts.
        </CollapsibleContent>
      </Collapsible>
      <Collapsible>
        <CollapsibleTrigger>What is included?</CollapsibleTrigger>
        <CollapsibleContent>
          Source-ready React + Tailwind components, theme tokens, and a matching
          documentation system.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export function CollapsibleControlledView() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className={panelClassName}>
      <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 px-4 py-2 text-sm">
        <span className="text-muted-foreground">
          Sync status: {open ? "Expanded" : "Collapsed"}
        </span>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-md border border-border bg-background px-3 py-1 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted"
        >
          Toggle
        </button>
      </div>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger>Sync preferences</CollapsibleTrigger>
        <CollapsibleContent>
          Choose which workspaces to sync, schedule background updates, and keep
          offline access enabled.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}

export default CollapsibleDefaultView;

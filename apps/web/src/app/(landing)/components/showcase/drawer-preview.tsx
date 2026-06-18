import { PanelRight } from "lucide-react";

export default function DrawerPreview() {
  return (
    <div className="relative h-32 w-full max-w-[240px] overflow-hidden rounded-lg border border-border bg-background">
      <div className="absolute inset-y-0 left-0 w-11 border-r border-border bg-muted/60 p-2">
        <div className="h-3 w-5 rounded bg-foreground/25" />
        <div className="mt-5 space-y-2">
          {[0, 1, 2].map((item) => (
            <span key={item} className="block h-5 rounded bg-background" />
          ))}
        </div>
      </div>
      <div className="ml-11 p-3 opacity-[0.45]">
        <div className="h-3 w-24 rounded bg-muted" />
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="h-16 rounded-md bg-muted" />
          <div className="h-16 rounded-md bg-muted" />
        </div>
      </div>
      <div className="absolute inset-y-0 right-0 w-[112px] border-l border-border bg-card p-3 shadow-[-16px_0_30px_rgba(15,23,42,0.12)]">
        <PanelRight className="h-4 w-4 text-primary" aria-hidden="true" />
        <p className="mt-3 text-sm font-semibold">Settings</p>
        <div className="mt-3 space-y-2">
          <div className="h-2 rounded bg-muted" />
          <div className="h-2 w-4/5 rounded bg-muted" />
          <div className="h-6 rounded-md border border-border bg-background" />
        </div>
      </div>
    </div>
  );
}

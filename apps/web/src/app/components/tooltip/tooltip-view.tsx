"use client";

import { useEffect, useRef, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Button } from "../button/button";

// ── Spec row
// Reads layout size from nearest ancestor with data-size="sm|md|lg"
// set by the ResizeObserver in TooltipDefaultView.

function Row({
  index,
  label,
  prop,
  children,
}: {
  index: string;
  label: string;
  prop: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="
      flex flex-col border-t first:border-t-0
      group-data-[size=md]:flex-row group-data-[size=md]:items-stretch group-data-[size=md]:min-h-12
      group-data-[size=lg]:flex-row group-data-[size=lg]:items-stretch group-data-[size=lg]:min-h-12
    "
    >
      {/* Label */}
      <div
        className="
        flex shrink-0 items-center gap-2.5 px-4 pt-3 pb-1
        group-data-[size=md]:py-0 group-data-[size=md]:pl-5 group-data-[size=md]:pr-4 group-data-[size=md]:w-40 group-data-[size=md]:border-r group-data-[size=md]:border-dashed group-data-[size=md]:border-border
        group-data-[size=lg]:py-0 group-data-[size=lg]:pl-5 group-data-[size=lg]:pr-4 group-data-[size=lg]:w-52 group-data-[size=lg]:border-r group-data-[size=lg]:border-dashed group-data-[size=lg]:border-border
      "
      >
        <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">
          {index}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>

      {/* Demo buttons */}
      <div
        className="
        flex flex-1 flex-wrap items-center gap-2 px-4 pb-3 pt-1
        group-data-[size=md]:py-0 group-data-[size=md]:px-5
        group-data-[size=lg]:py-0 group-data-[size=lg]:px-5
      "
      >
        {children}
      </div>

      {/* Prop code — lg only */}
      <div
        className="
        hidden
        group-data-[size=lg]:flex shrink-0 items-center border-l border-dashed border-border px-5 w-[40%]
      "
      >
        <code className="font-mono text-xs text-muted-foreground/60 break-all">
          {prop}
        </code>
      </div>
    </div>
  );
}

export function TooltipDefaultView() {
  const [open, setOpen] = useState(false);
  const [defaultIsOpen, setDefaultIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const initialResizeDone = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = (w: number) => {
      el.setAttribute("data-size", w >= 1024 ? "lg" : w >= 640 ? "md" : "sm");
    };

    const ro = new ResizeObserver(([entry]) => {
      update(entry.contentRect.width);
      if (initialResizeDone.current) {
        setDefaultIsOpen(false);
      } else {
        initialResizeDone.current = true;
      }
    });
    ro.observe(el);
    update(el.offsetWidth);
    const raf = requestAnimationFrame(() => setDefaultIsOpen(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-size="lg"
      className="group w-full rounded-md border border-border"
    >
      {/* 01 — Sides: where the tooltip is placed relative to the trigger */}
      <Row
        index="01"
        label="Side"
        prop={`<TooltipContent side="top | bottom | left | right" />`}
      >
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Top
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Placed on top</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Bottom
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Placed on bottom</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Left
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Placed on left</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Right
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Placed on right</TooltipContent>
        </Tooltip>
      </Row>

      {/* 02 — Alignment: how the tooltip aligns along the trigger edge */}
      <Row
        index="02"
        label="Align"
        prop={`<TooltipContent align="start | center | end" />`}
      >
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Start
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="start">
            Aligned to start
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Center
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            Aligned to center
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              End
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            Aligned to end
          </TooltipContent>
        </Tooltip>
      </Row>

      {/* 03 — Trigger: the interaction that opens the tooltip */}
      <Row
        index="03"
        label="Trigger"
        prop={`<Tooltip trigger="hover | click | focus | contextMenu" />`}
      >
        <Tooltip trigger="hover">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Hover
            </Button>
          </TooltipTrigger>
          <TooltipContent>Opens on hover / focus</TooltipContent>
        </Tooltip>

        <Tooltip trigger="click">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Click
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggles on click</TooltipContent>
        </Tooltip>

        <Tooltip trigger="focus">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Focus
            </Button>
          </TooltipTrigger>
          <TooltipContent>Opens on focus only</TooltipContent>
        </Tooltip>

        <Tooltip trigger="contextMenu">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Right-click
            </Button>
          </TooltipTrigger>
          <TooltipContent>Opens on context menu</TooltipContent>
        </Tooltip>
      </Row>

      {/* 04 — Arrow: toggle the little pointer on the tooltip */}
      <Row
        index="04"
        label="Arrow"
        prop={`<Tooltip showArrow={true | false} />`}
      >
        <Tooltip showArrow>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              With arrow
            </Button>
          </TooltipTrigger>
          <TooltipContent>Pointer is shown</TooltipContent>
        </Tooltip>

        <Tooltip showArrow={false}>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              No arrow
            </Button>
          </TooltipTrigger>
          <TooltipContent>Pointer is hidden</TooltipContent>
        </Tooltip>
      </Row>

      {/* 05 — Color: override the tooltip background */}
      <Row index="05" label="Color" prop={`<Tooltip color="#6d28d9" />`}>
        <Tooltip color="#6d28d9">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Violet
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-white">Custom color</TooltipContent>
        </Tooltip>

        <Tooltip color="#0f766e">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Teal
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-white">Custom color</TooltipContent>
        </Tooltip>

        <Tooltip color="#b91c1c">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Red
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-white">Custom color</TooltipContent>
        </Tooltip>
      </Row>

      {/* 06 — Delay: how long before the tooltip appears */}
      <Row index="06" label="Delay" prop={`<Tooltip delayDuration={300} />`}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Instant
            </Button>
          </TooltipTrigger>
          <TooltipContent>delayDuration = 0ms</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={300}>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              300ms
            </Button>
          </TooltipTrigger>
          <TooltipContent>delayDuration = 300ms</TooltipContent>
        </Tooltip>

        <Tooltip delayDuration={700}>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              700ms
            </Button>
          </TooltipTrigger>
          <TooltipContent>delayDuration = 700ms</TooltipContent>
        </Tooltip>
      </Row>

      {/* 07 — Controlled: drive open state from outside */}
      <Row
        index="07"
        label="Controlled"
        prop={`<Tooltip open={open} onOpenChange={setOpen} />`}
      >
        <Tooltip open={open} onOpenChange={setOpen} trigger="hover">
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Bound trigger
            </Button>
          </TooltipTrigger>
          <TooltipContent>open = {String(open)}</TooltipContent>
        </Tooltip>

        <Button
          size="xs"
          variant="default"
          className="cursor-pointer rounded-sm px-4"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Open"} externally
        </Button>
      </Row>

      {/* 08 — Rich content: tooltips can hold structured markup */}
      <Row
        index="08"
        label="Rich content"
        prop={`<TooltipContent>{...}</TooltipContent>`}
      >
        <Tooltip>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Multi-line
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-50">
            <p className="font-semibold">Keyboard shortcut</p>
            <p className="mt-1 text-muted-foreground">
              Press <kbd className="rounded bg-background/60 px-1">⌘</kbd> +{" "}
              <kbd className="rounded bg-background/60 px-1">K</kbd> to open the
              command menu.
            </p>
          </TooltipContent>
        </Tooltip>

        <Tooltip open={defaultIsOpen} onOpenChange={setDefaultIsOpen}>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Default open
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Open on first render</TooltipContent>
        </Tooltip>
      </Row>
    </div>
  );
}

export default TooltipDefaultView;

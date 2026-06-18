"use client";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Button } from "../button/button";

// ── Spec row — numbered index + label on the left, demo triggers on the right

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
    <div className="flex flex-col gap-3 border-t first:border-t-0 first:pt-0 sm:flex-row sm:items-center sm:gap-5 h-12">
      <div className="flex shrink-0 items-center gap-3 sm:w-52 border-r border-dashed border-border  h-full pl-5">
        <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
          {index}
        </span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
      <div className="flex flex-1 flex-wrap items-center gap-2.5">{children}</div>
      <div className="hidden h-full items-center border-l border-dashed border-border px-5 sm:flex sm:w-[42%]">
        <code className="font-mono text-xs text-muted-foreground/80">
          {prop}
        </code>
      </div>
    </div>
  );
}

export function TooltipDefaultView() {
  // controlled example state
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-md border border-border ">
      {/* 01 — Sides: where the tooltip is placed relative to the trigger */}
      <Row index="01" label="Side" prop={`<TooltipContent side="top | bottom | left | right" />`}>
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
      <Row index="02" label="Align" prop={`<TooltipContent align="start | center | end" />`}>
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
      <Row index="03" label="Trigger" prop={`<Tooltip trigger="hover | click | focus | contextMenu" />`}>
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
      <Row index="04" label="Arrow" prop={`<Tooltip showArrow={true | false} />`}>
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
      <Row index="07" label="Controlled" prop={`<Tooltip open={open} onOpenChange={setOpen} />`}>
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
      <Row index="08" label="Rich content" prop={`<TooltipContent>{...}</TooltipContent>`}>
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

        <Tooltip defaultOpen>
          <TooltipTrigger>
            <Button
              size="xs"
              variant="outline"
              className="cursor-pointer rounded-sm px-4"
            >
              Default open
            </Button>
          </TooltipTrigger>
          <TooltipContent>Open on first render</TooltipContent>
        </Tooltip>
      </Row>
    </div>
  );
}

export default TooltipDefaultView;

"use client";

import { useEffect, useRef, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectItems,
  SelectGroup,
  SelectSeparator,
  SelectField,
  type SelectOption,
} from "./select";

// ── Demo data

const frameworks: SelectOption[] = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

const plans: SelectOption[] = [
  { value: "free", label: "Free", description: "$0/mo" },
  { value: "pro", label: "Pro", description: "$12/mo" },
  { value: "team", label: "Team", description: "$30/mo" },
  { value: "enterprise", label: "Enterprise", description: "Custom" },
];

const seats: SelectOption[] = [
  { value: "1", label: "1 seat" },
  { value: "5", label: "5 seats" },
  { value: "10", label: "10 seats", disabled: true },
  { value: "25", label: "25 seats", disabled: true },
];

const timezones: SelectOption[] = [
  { value: "utc", label: "UTC" },
  { value: "est", label: "Eastern (EST)" },
  { value: "cst", label: "Central (CST)" },
  { value: "mst", label: "Mountain (MST)" },
  { value: "pst", label: "Pacific (PST)" },
  { value: "gmt", label: "London (GMT)" },
  { value: "cet", label: "Berlin (CET)" },
  { value: "ist", label: "India (IST)" },
  { value: "jst", label: "Tokyo (JST)" },
  { value: "aest", label: "Sydney (AEST)" },
];

const statusColors: Record<string, string> = {
  active: "#16a34a",
  away: "#f59e0b",
  busy: "#dc2626",
  offline: "#9ca3af",
};

const statuses: SelectOption[] = [
  { value: "active", label: "Active" },
  { value: "away", label: "Away" },
  { value: "busy", label: "Busy" },
  { value: "offline", label: "Offline" },
];

const GlobeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// ── Spec row
// Reads layout size from nearest ancestor with data-size="sm|md|lg"
// set by the ResizeObserver in SelectDefaultView.

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
      group-data-[size=md]:flex-row group-data-[size=md]:items-stretch group-data-[size=md]:min-h-16
      group-data-[size=lg]:flex-row group-data-[size=lg]:items-stretch group-data-[size=lg]:min-h-16
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

      {/* Demo */}
      <div
        className="
        flex flex-1 flex-wrap items-center gap-3 px-4 pb-3 pt-1
        group-data-[size=md]:py-3 group-data-[size=md]:px-5
        group-data-[size=lg]:py-3 group-data-[size=lg]:px-5
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

export function SelectDefaultView() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [controlled, setControlled] = useState("react");

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = (w: number) => {
      el.setAttribute("data-size", w >= 1024 ? "lg" : w >= 640 ? "md" : "sm");
    };

    const ro = new ResizeObserver(([entry]) => {
      update(entry.contentRect.width);
    });
    ro.observe(el);
    update(el.offsetWidth);
    return () => {
      ro.disconnect();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-size="lg"
      className="group w-full rounded-md border border-border"
    >
      {/* 01 — Default: basic composition with SelectItem children */}
      <Row index="01" label="Default" prop={`<SelectItem value="..." />`}>
        <div className="w-56">
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder="Select a framework"
                options={frameworks}
              />
            </SelectTrigger>
            <SelectContent>
              {frameworks.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 02 — Array helper: feed options[] instead of children */}
      <Row index="02" label="Options array" prop={`<SelectItems options={...} />`}>
        <div className="w-56">
          <Select defaultValue="next">
            <SelectTrigger>
              <SelectValue
                placeholder="Select a framework"
                options={frameworks}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={frameworks} />
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 03 — Searchable: trigger becomes an editable combobox while open */}
      <Row
        index="03"
        label="Searchable"
        prop={`<SelectTrigger searchable />`}
      >
        <div className="w-56">
          <Select>
            <SelectTrigger searchable searchPlaceholder="Search timezone…">
              <SelectValue
                placeholder="Pick a timezone"
                options={timezones}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={timezones} />
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 04 — Descriptions: secondary text alongside each label */}
      <Row
        index="04"
        label="Descriptions"
        prop={`{ value, label, description }`}
      >
        <div className="w-56">
          <Select defaultValue="pro">
            <SelectTrigger>
              <SelectValue placeholder="Choose a plan" options={plans} />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={plans} />
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 05 — Disabled options: individual items can be locked */}
      <Row
        index="05"
        label="Disabled options"
        prop={`{ value, label, disabled: true }`}
      >
        <div className="w-56">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Team size" options={seats} />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={seats} />
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 06 — Disabled select: the whole control is non-interactive */}
      <Row index="06" label="Disabled" prop={`<Select disabled />`}>
        <div className="w-56">
          <Select disabled defaultValue="react">
            <SelectTrigger>
              <SelectValue options={frameworks} />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={frameworks} />
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 07 — Start icon: decorate the trigger with a leading icon */}
      <Row
        index="07"
        label="Start icon"
        prop={`<SelectTrigger startIcon={...} />`}
      >
        <div className="w-56">
          <Select>
            <SelectTrigger startIcon={<GlobeIcon />}>
              <SelectValue placeholder="Region" options={timezones} />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={timezones} />
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 08 — Groups: labelled sections with separators */}
      <Row
        index="08"
        label="Groups"
        prop={`<SelectGroup label="..." /> + <SelectSeparator />`}
      >
        <div className="w-56">
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder="Pick a food"
                options={[
                  { value: "apple", label: "Apple" },
                  { value: "banana", label: "Banana" },
                  { value: "carrot", label: "Carrot" },
                  { value: "potato", label: "Potato" },
                ]}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup label="Fruits">
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup label="Vegetables">
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </Row>

      {/* 09 — Field: label, helper text, and error state */}
      <Row
        index="09"
        label="Field & error"
        prop={`<SelectField label helperText error />`}
      >
        <div className="w-56">
          <Select>
            <SelectField
              label="Framework"
              helperText="Pick your primary stack"
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select…" options={frameworks} />
              </SelectTrigger>
              <SelectContent>
                <SelectItems options={frameworks} />
              </SelectContent>
            </SelectField>
          </Select>
        </div>

        <div className="w-56">
          <Select>
            <SelectField label="Framework" error="This field is required">
              <SelectTrigger error>
                <SelectValue placeholder="Select…" options={frameworks} />
              </SelectTrigger>
              <SelectContent>
                <SelectItems options={frameworks} />
              </SelectContent>
            </SelectField>
          </Select>
        </div>
      </Row>

      {/* 10 — Controlled: drive the value from outside state */}
      <Row
        index="10"
        label="Controlled"
        prop={`<Select value={value} onValueChange={setValue} />`}
      >
        <div className="w-56">
          <Select value={controlled} onValueChange={setControlled}>
            <SelectTrigger>
              <SelectValue options={frameworks} />
            </SelectTrigger>
            <SelectContent>
              <SelectItems options={frameworks} />
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs text-muted-foreground">
          value = <code className="font-mono">{controlled}</code>
        </span>
      </Row>

      {/* 11 — Custom renderer: full control over each row's markup */}
      <Row
        index="11"
        label="Custom render"
        prop={`<SelectItems optionRenderer={(o) => ...} />`}
      >
        <div className="w-56">
          <Select defaultValue="active">
            <SelectTrigger>
              <SelectValue placeholder="Status" options={statuses} />
            </SelectTrigger>
            <SelectContent>
              <SelectItems
                options={statuses}
                optionRenderer={(option, isSelected, isHighlighted) => (
                  <div
                    className={[
                      "flex items-center gap-2 rounded px-3 py-2 text-sm cursor-pointer transition-colors",
                      isSelected || isHighlighted ? "bg-muted" : "",
                    ].join(" ")}
                  >
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: statusColors[option.value] }}
                    />
                    <span>{option.label}</span>
                  </div>
                )}
              />
            </SelectContent>
          </Select>
        </div>
      </Row>
    </div>
  );
}

export default SelectDefaultView;

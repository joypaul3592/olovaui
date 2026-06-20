"use client";

import { useState, type ReactNode } from "react";
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

// ── Controlled example (needs its own state)

function ControlledDemo() {
  const [value, setValue] = useState("react");
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-56">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue options={frameworks} />
          </SelectTrigger>
          <SelectContent>
            <SelectItems options={frameworks} />
          </SelectContent>
        </Select>
      </div>
      <span className="text-xs text-muted-foreground">
        value = <code className="font-mono">{value}</code>
      </span>
    </div>
  );
}

// ── Examples

interface Example {
  index: string;
  label: string;
  description: string;
  prop: string;
  render: () => ReactNode;
}

const examples: Example[] = [
  {
    index: "01",
    label: "Default",
    description: "Basic composition with SelectItem children.",
    prop: `<SelectItem value="..." />`,
    render: () => (
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
    ),
  },
  {
    index: "02",
    label: "Options array",
    description: "Feed an options[] array instead of children.",
    prop: `<SelectItems options={...} />`,
    render: () => (
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
    ),
  },
  {
    index: "03",
    label: "Searchable",
    description: "Trigger becomes an editable combobox while open.",
    prop: `<SelectTrigger searchable />`,
    render: () => (
      <div className="w-56">
        <Select>
          <SelectTrigger searchable searchPlaceholder="Search timezone…">
            <SelectValue placeholder="Pick a timezone" options={timezones} />
          </SelectTrigger>
          <SelectContent>
            <SelectItems options={timezones} />
          </SelectContent>
        </Select>
      </div>
    ),
  },
  {
    index: "04",
    label: "Descriptions",
    description: "Secondary text alongside each label.",
    prop: `{ value, label, description }`,
    render: () => (
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
    ),
  },
  {
    index: "05",
    label: "Disabled options",
    description: "Individual items can be locked.",
    prop: `{ value, label, disabled: true }`,
    render: () => (
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
    ),
  },
  {
    index: "06",
    label: "Disabled",
    description: "The whole control is non-interactive.",
    prop: `<Select disabled />`,
    render: () => (
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
    ),
  },
  {
    index: "07",
    label: "Start icon",
    description: "Decorate the trigger with a leading icon.",
    prop: `<SelectTrigger startIcon={...} />`,
    render: () => (
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
    ),
  },
  {
    index: "08",
    label: "Groups",
    description: "Labelled sections with separators.",
    prop: `<SelectGroup label="..." /> + <SelectSeparator />`,
    render: () => (
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
    ),
  },
  {
    index: "09",
    label: "Field & error",
    description: "Label, helper text, and error state.",
    prop: `<SelectField label helperText error />`,
    render: () => (
      <div className="flex flex-wrap items-start justify-center gap-4">
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
      </div>
    ),
  },
  {
    index: "10",
    label: "Controlled",
    description: "Drive the value from outside state.",
    prop: `<Select value={value} onValueChange={setValue} />`,
    render: () => <ControlledDemo />,
  },
  {
    index: "11",
    label: "Custom render",
    description: "Full control over each row's markup.",
    prop: `<SelectItems optionRenderer={(o) => ...} />`,
    render: () => (
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
    ),
  },
];

export function SelectDefaultView() {
  const [activeIndex, setActiveIndex] = useState(examples[0].index);
  const active = examples.find((e) => e.index === activeIndex) ?? examples[0];

  return (
    <div className="@container w-full">
      <div className="flex w-full flex-col overflow-hidden rounded-md border border-border @xl:flex-row">
        {/* Example list */}
        <nav
          aria-label="Examples"
          className="
            flex shrink-0 gap-1 overflow-x-auto border-b border-dashed border-border p-2
            @xl:w-56 @xl:flex-col @xl:overflow-x-visible @xl:border-b-0 @xl:border-r
          "
        >
          {examples.map((ex) => {
            const isActive = ex.index === active.index;
            return (
              <button
                key={ex.index}
                type="button"
                onClick={() => setActiveIndex(ex.index)}
                aria-current={isActive ? "true" : undefined}
                className={[
                  "flex shrink-0 items-center gap-3.5 rounded-md px-3 py-2 text-left text-sm transition-colors cursor-pointer",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                ].join(" ")}
              >
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50">
                  {ex.index}
                </span>
                <span className="whitespace-nowrap">{ex.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Active example */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-baseline gap-2.5 border-b border-dashed border-border px-5 py-3">
            <span className="font-mono text-sm tabular-nums text-muted-foreground/50">
              {active.index}
            </span>
            <h3 className="text-sm font-medium text-foreground">
              {active.label}
            </h3>
            <p className="ml-auto hidden text-xs text-muted-foreground @md:block">
              {active.description}
            </p>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 py-12">
            {active.render()}
          </div>

          <div className="border-t border-dashed border-border px-5 py-3">
            <code className="font-mono text-xs text-muted-foreground/70 break-all">
              {active.prop}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectDefaultView;

"use client";
import { Button } from "../button/button";
import {
  Combobox,
  ComboboxChips,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox";

const frameworks = [
  { value: "nextjs", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

const disabledFrameworks = [
  { value: "solidstart", label: "SolidStart", disabled: true },
  { value: "gatsby", label: "Gatsby" },
  { value: "qwik", label: "Qwik" },
  { value: "vite", label: "Vite" },
];

export function ComboboxBasicView() {
  return (
    <div className="w-full max-w-sm">
      <Combobox>
        <ComboboxInput placeholder="Select a framework..." />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxMultipleView() {
  return (
    <div className="w-full max-w-sm">
      <Combobox multiple defaultValue={["sveltekit", "remix", "nuxt" , "astro"]}>
        <ComboboxInput
          placeholder="Pick frameworks..."
          showClear
          containerClassName="min-h-12 rounded-2xl px-3 py-2"
        >
          <ComboboxChips className="gap-1.5" />
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxClearView() {
  return (
    <div className="w-full max-w-sm">
      <Combobox defaultValue="sveltekit">
        <ComboboxInput placeholder="Search frameworks..." showClear />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxPopupView() {
  return (
    <div className="w-full max-w-sm">
      <Combobox
        render={({ open, setOpen, selectedLabels }) => (
          <Button
            variant="outline"
            size="lg"
            className="w-full justify-between"
            onClick={() => setOpen(!open)}
          >
            {selectedLabels[0] ?? "Choose framework"}
          </Button>
        )}
      >
        <ComboboxContent className="w-full">
          <div className="p-3">
            <ComboboxInput placeholder="Search frameworks..." autoFocus />
          </div>
          <ComboboxList className="pt-0">
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxDisabledView() {
  return (
    <div className="w-full max-w-sm">
      <Combobox>
        <ComboboxInput placeholder="Try a disabled option..." />
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No frameworks found.</ComboboxEmpty>
            {disabledFrameworks.map((framework) => (
              <ComboboxItem
                key={framework.value}
                value={framework.value}
                disabled={framework.disabled}
              >
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export default ComboboxBasicView;

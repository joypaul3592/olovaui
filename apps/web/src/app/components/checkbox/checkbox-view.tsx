"use client";

import { Checkbox } from "./checkbox";

const panelClassName =
  "flex w-full flex-wrap items-center justify-center gap-6";
const stackClassName = "flex flex-col gap-3";
const labelClassName = "flex items-center gap-2 text-sm font-medium";

export function CheckboxDefaultView() {
  return (
    <div className={panelClassName}>
      <label className={labelClassName}>
        <Checkbox id="checkbox-default" />
        <span>Remember me</span>
      </label>
      <label className={labelClassName}>
        <Checkbox id="checkbox-checked" defaultChecked />
        <span>Enable sync</span>
      </label>
      <label className={labelClassName}>
        <Checkbox id="checkbox-disabled" disabled />
        <span className="text-muted-foreground">Disabled</span>
      </label>
    </div>
  );
}

export function CheckboxStatesView() {
  return (
    <div className={panelClassName}>
      <div className={stackClassName}>
        <label className={labelClassName}>
          <Checkbox defaultChecked />
          <span>Marketing updates</span>
        </label>
        <label className={labelClassName}>
          <Checkbox disabled />
          <span className="text-muted-foreground">Billing access</span>
        </label>
      </div>
      <div className={stackClassName}>
        <label className={labelClassName}>
          <Checkbox defaultChecked size="lg" />
          <span>Daily digest</span>
        </label>
        <label className={labelClassName}>
          <Checkbox size="lg" />
          <span>Weekly summary</span>
        </label>
        <label className={labelClassName}>
          <Checkbox size="lg" disabled />
          <span className="text-muted-foreground">Monthly archive</span>
        </label>
      </div>
    </div>
  );
}

export function CheckboxSizesView() {
  return (
    <div className={panelClassName}>
      <label className={labelClassName}>
        <Checkbox size="sm" defaultChecked />
        <span>Small</span>
      </label>
      <label className={labelClassName}>
        <Checkbox size="md" defaultChecked />
        <span>Medium</span>
      </label>
      <label className={labelClassName}>
        <Checkbox size="lg" defaultChecked />
        <span>Large</span>
      </label>
    </div>
  );
}

export default CheckboxDefaultView;

"use client";
import * as React from "react";
import { Switch } from "./switch";
export function SwitchDefaultView() {
  const [value, setValue] = React.useState(true);
  return (
    <div className="mx-auto flex w-full max-w-sm items-center justify-between rounded-md border p-4">
      <p className="text-sm font-medium">Marketing emails</p>
      <Switch checked={value} onCheckedChange={setValue} />
    </div>
  );
}
export default SwitchDefaultView;

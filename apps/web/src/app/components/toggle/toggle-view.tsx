"use client";
import * as React from "react";
import { Bold } from "lucide-react";
import { Toggle } from "./toggle";
export function ToggleDefaultView() {
  const [active, setActive] = React.useState(false);
  return <Toggle pressed={active} onPressedChange={setActive}><Bold className="mr-2 h-4 w-4" />Bold</Toggle>;
}
export default ToggleDefaultView;

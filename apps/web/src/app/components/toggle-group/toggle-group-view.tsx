"use client";
import * as React from "react";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
export function ToggleGroupDefaultView() {
  const [value, setValue] = React.useState("left");
  return (
    <ToggleGroup>
      <ToggleGroupItem pressed={value === "left"} onClick={() => setValue("left")}>Left</ToggleGroupItem>
      <ToggleGroupItem pressed={value === "center"} onClick={() => setValue("center")}>Center</ToggleGroupItem>
      <ToggleGroupItem pressed={value === "right"} onClick={() => setValue("right")}>Right</ToggleGroupItem>
    </ToggleGroup>
  );
}
export default ToggleGroupDefaultView;

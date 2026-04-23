"use client";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
export function TooltipDefaultView() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent>Quick helper text</TooltipContent>
    </Tooltip>
  );
}
export default TooltipDefaultView;

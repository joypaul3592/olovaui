"use client";
import { Button } from "../button/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
export function TooltipDefaultView() {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Button variant={"secondary"} className="cursor-pointer">
          Hover me
        </Button>
      </TooltipTrigger>
      <TooltipContent>Quick helper text</TooltipContent>
    </Tooltip>
  );
}
export default TooltipDefaultView;

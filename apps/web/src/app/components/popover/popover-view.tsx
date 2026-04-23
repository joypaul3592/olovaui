"use client";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
export function PopoverDefaultView() {
  return (
    <Popover>
      <PopoverTrigger>Open popover</PopoverTrigger>
      <PopoverContent>
        <p className="text-sm font-medium">Quick settings</p>
        <p className="mt-1 text-sm text-muted-foreground">Adjust notifications and preferences.</p>
      </PopoverContent>
    </Popover>
  );
}
export default PopoverDefaultView;

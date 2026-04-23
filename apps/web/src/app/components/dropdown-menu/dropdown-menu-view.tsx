"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
export function DropdownMenuDefaultView() {
  return (
    <div className="relative inline-flex">
      <DropdownMenu>
        <DropdownMenuTrigger />
      </DropdownMenu>
      <div className="absolute left-0 top-full mt-2">
        <DropdownMenuContent>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Sign out</DropdownMenuItem>
        </DropdownMenuContent>
      </div>
    </div>
  );
}
export default DropdownMenuDefaultView;

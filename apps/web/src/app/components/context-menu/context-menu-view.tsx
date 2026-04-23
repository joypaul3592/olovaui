"use client";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./context-menu";
export function ContextMenuDefaultView() {
  return (
    <div className="relative inline-flex">
      <ContextMenu>
        <ContextMenuTrigger />
      </ContextMenu>
      <div className="absolute left-0 top-full mt-2">
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Sign out</ContextMenuItem>
        </ContextMenuContent>
      </div>
    </div>
  );
}
export default ContextMenuDefaultView;

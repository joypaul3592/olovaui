"use client";

import { Calendar, Calculator, Search, Settings, User } from "lucide-react";

import {
  CommandMenu,
  CommandMenuEmpty,
  CommandMenuGroup,
  CommandMenuInput,
  CommandMenuItem,
  CommandMenuList,
  CommandMenuSeparator,
  CommandMenuShortcut,
} from "./command-menu";

const panelClassName =
  "flex w-full max-w-md flex-col gap-4 rounded-2xl border border-border/70 bg-card/90  shadow-2xl";

export function CommandMenuDefaultView() {
  return (
    <div className="flex w-full items-center justify-center">
      <CommandMenu className={panelClassName}>
        <CommandMenuInput
          icon={<Search size={16} />}
          placeholder="Type a command or search..."
          aria-label="Search commands"
        />
        <CommandMenuList>
          <CommandMenuEmpty>No results found.</CommandMenuEmpty>
          <CommandMenuGroup heading="Suggestions">
            <CommandMenuItem value="Calendar" leftIcon={<Calendar size={16} />}>
              Calendar
            </CommandMenuItem>
            <CommandMenuItem value="Calculator" leftIcon={<Calculator size={16} />}>
              Calculator
            </CommandMenuItem>
          </CommandMenuGroup>
          <CommandMenuSeparator />
          <CommandMenuGroup heading="Settings">
            <CommandMenuItem
              value="Profile"
              leftIcon={<User size={16} />}
              rightSlot={<CommandMenuShortcut>Ctrl P</CommandMenuShortcut>}
            >
              Profile
            </CommandMenuItem>
            <CommandMenuItem
              value="Settings"
              leftIcon={<Settings size={16} />}
              rightSlot={<CommandMenuShortcut>Ctrl S</CommandMenuShortcut>}
            >
              Settings
            </CommandMenuItem>
          </CommandMenuGroup>
        </CommandMenuList>
      </CommandMenu>
    </div>
  );
}

export function CommandMenuEmptyView() {
  return (
    <div className="flex w-full items-center justify-center">
      <CommandMenu className={panelClassName}>
        <CommandMenuInput placeholder="Search for anything..." />
        <CommandMenuList>
          <CommandMenuEmpty>No quick actions match that search.</CommandMenuEmpty>
        </CommandMenuList>
      </CommandMenu>
    </div>
  );
}

export default CommandMenuDefaultView;

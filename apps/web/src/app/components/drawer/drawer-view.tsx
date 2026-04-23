"use client";

import {
  Drawer,
  DrawerAction,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

export function DrawerView() {
  return (
    <div className="flex w-full items-center justify-center">
      <Drawer>
        <DrawerTrigger>Open drawer</DrawerTrigger>
        <DrawerContent size="lg">
          <DrawerHeader>
            <DrawerTitle>Account settings</DrawerTitle>
            <DrawerDescription>
              Manage your workspace settings and update your team preferences.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerClose
            aria-label="Close drawer"
            className="absolute right-4 top-4 h-8 w-8 border-border/60 text-muted-foreground"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </DrawerClose>
          <DrawerBody className="space-y-4 text-muted-foreground">
            <p>
              Keep your brand assets up to date so every project stays aligned
              with the latest guidelines.
            </p>
            <p>
              Update default roles, notification settings, and activity digests
              for the workspace.
            </p>
            <p>
              Review connected tools, API keys, and data syncs to ensure
              everything is running securely.
            </p>
            <div className="space-y-3 rounded-xl border border-border/60 bg-muted/40 p-4 text-sm text-foreground">
              <div className="flex items-center justify-between">
                <span className="font-medium">Weekly summary</span>
                <span className="text-xs text-muted-foreground">Enabled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Auto archive projects</span>
                <span className="text-xs text-muted-foreground">After 90 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">Security scan</span>
                <span className="text-xs text-muted-foreground">Running</span>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter sticky>
            <DrawerClose className="h-9 min-w-[96px] rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm">
              Cancel
            </DrawerClose>
            <DrawerAction>Save changes</DrawerAction>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export function DrawerBottomView() {
  return (
    <div className="flex w-full items-center justify-center">
      <Drawer>
        <DrawerTrigger>Open bottom drawer</DrawerTrigger>
        <DrawerContent side="bottom" size="lg">
          <DrawerHeader>
            <DrawerTitle>Quick actions</DrawerTitle>
            <DrawerDescription>
              Pick an action to continue managing your project.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerClose
            aria-label="Close drawer"
            className="absolute right-4 top-4 h-8 w-8 border-border/60 text-muted-foreground"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </DrawerClose>
          <DrawerBody className="space-y-3 text-muted-foreground">
            <div className="rounded-xl border border-border/60 bg-background p-4">
              <div className="text-sm font-semibold text-foreground">
                Schedule review
              </div>
              <p className="mt-1 text-sm">
                Invite stakeholders to review the next project milestone.
              </p>
            </div>
            <div className="rounded-xl border border-border/60 bg-background p-4">
              <div className="text-sm font-semibold text-foreground">
                Export report
              </div>
              <p className="mt-1 text-sm">
                Download a summary of tasks, budget, and timeline updates.
              </p>
            </div>
          </DrawerBody>
          <DrawerFooter>
            <DrawerClose className="h-9 min-w-[96px] rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm">
              Later
            </DrawerClose>
            <DrawerAction className="min-w-[140px]">Continue</DrawerAction>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default DrawerView;

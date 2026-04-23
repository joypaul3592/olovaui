"use client";

import {
  Dialog,
  DialogAction,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

export function DialogView() {
  return (
    <div className="flex w-full items-center justify-center">
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader>
            <DialogTitle>Publish update</DialogTitle>
            <DialogDescription>
              Review the update details and publish when you are ready.
            </DialogDescription>
          </DialogHeader>
          <DialogClose
            aria-label="Close dialog"
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
          </DialogClose>
          <DialogBody className="mt-6 max-h-[360px] space-y-4 text-muted-foreground">
            <p>
              This release includes a new onboarding flow, improved search
              relevance, and updated billing emails for enterprise accounts.
            </p>
            <p>
              Please confirm that the changelog reflects all fixes and that the
              customer-facing release notes are complete.
            </p>
            <p>
              Scheduled rollout is set to 10:00 AM local time with a staged
              deployment to minimize risk.
            </p>
            <p>
              You can revert within 30 minutes if any regression is detected.
            </p>
            <p>
              Once published, all customers will see the update in their
              activity feed and email digest.
            </p>
            <p>
              Make sure the support team has the updated FAQ before proceeding.
            </p>
          </DialogBody>
          <DialogFooter sticky>
            <DialogClose className="h-9 min-w-[96px] rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm">
              Keep draft
            </DialogClose>
            <DialogAction>Publish update</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function DialogEditProfileView() {
  return (
    <div className="flex w-full items-center justify-center">
      <Dialog>
        <DialogTrigger>Invite collaborator</DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader>
            <DialogTitle>Invite collaborator</DialogTitle>
            <DialogDescription>
              Add a teammate by email and choose their access level.
            </DialogDescription>
          </DialogHeader>
          <DialogClose
            aria-label="Close dialog"
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
          </DialogClose>
          <div className="mt-6 space-y-4">
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Email
              <input
                defaultValue="name@company.com"
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </label>
            <label className="grid gap-2 text-sm font-medium text-foreground">
              Access level
              <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40">
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </select>
            </label>
          </div>
          <DialogFooter>
            <DialogClose className="h-9 min-w-[96px] rounded-lg border border-border bg-background px-5 text-sm font-medium text-foreground shadow-sm">
              Cancel
            </DialogClose>
            <DialogAction className="min-w-[130px]">Send invite</DialogAction>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DialogView;

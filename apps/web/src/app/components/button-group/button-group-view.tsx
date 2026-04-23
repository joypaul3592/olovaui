"use client";

import { Archive, Bell, Flag, MoreHorizontal } from "lucide-react";
import { Button } from "../button/button";
import { ButtonGroup } from "./button-group";

const panelClassName = "flex w-full flex-wrap items-center justify-center gap-4";

export function ButtonGroupDefaultView() {
  return (
    <div className={panelClassName}>
        <ButtonGroup aria-label="Message actions">
          <Button variant="outline" size="sm" leftIcon={<Archive className="h-4 w-4" />}>
            Archive
          </Button>
          <Button variant="outline" size="sm">
            Report
          </Button>
          <Button variant="outline" size="sm" leftIcon={<Bell className="h-4 w-4" />}>
            Snooze
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2"
            aria-label="More options"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </ButtonGroup>
    </div>
  );
}

export function ButtonGroupSeparatedView() {
  return (
    <div className={panelClassName}>
      <ButtonGroup attached={false} aria-label="Selection actions">
        <Button variant="secondary" size="sm">
          Accept
        </Button>
        <Button variant="secondary" size="sm">
          Hold
        </Button>
        <Button variant="secondary" size="sm">
          Decline
        </Button>
      </ButtonGroup>
    </div>
  );
}

export function ButtonGroupVerticalView() {
  return (
    <div className={panelClassName}>
      <ButtonGroup orientation="vertical" aria-label="Flag actions">
        <Button variant="outline" size="sm" leftIcon={<Flag className="h-4 w-4" />}>
          Flag
        </Button>
        <Button variant="outline" size="sm">
          Review
        </Button>
        <Button variant="outline" size="sm">
          Resolve
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default ButtonGroupDefaultView;

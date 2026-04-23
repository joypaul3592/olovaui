"use client";

import {
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";

import { Button } from "../button/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const panelClassName =
  "flex w-full max-w-3xl flex-wrap items-center justify-center gap-6";

export function CardDefaultView() {
  return (
    <div className={panelClassName}>
      <Card
        size="sm"
        className="w-full max-w-md rounded-2xl border-border/70 bg-card/80 shadow-lg"
      >
        <CardHeader>
          <div className="space-y-1.5">
            <CardTitle>Small Card</CardTitle>
            <CardDescription>This card uses the small size variant.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-2">
          <p className="text-sm text-muted-foreground">
            The card component supports a size prop that can be set to &quot;sm&quot; for a
            more compact appearance.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm" className="w-full">
            Action
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardActionView() {
  return (
    <div className={panelClassName}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div>
            <CardTitle>Weekly report</CardTitle>
            <CardDescription>Performance highlights and signals.</CardDescription>
          </div>
          <CardAction>
            <Button size="sm" variant="outline" leftIcon={<Star className="h-4 w-4" />}>
              Star
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
            Engagement climbed 12% with a 3.4% CTR across new campaigns.
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Subscribers</span>
            <span className="font-medium">24.1k</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="secondary" rightIcon={<ArrowRight className="h-4 w-4" />}>
            View details
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardMediaView() {
  return (
    <div className={panelClassName}>
      <Card className="w-full max-w-sm overflow-hidden">
        <div className="h-36 w-full bg-gradient-to-br from-foreground/10 via-muted to-foreground/5" />
        <CardHeader>
          <div>
            <CardTitle>Design sprint</CardTitle>
            <CardDescription>Remote workshop toolkit for teams.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>
            Share a ready-to-run agenda, sticky templates, and timeboxed
            exercises for fast alignment.
          </p>
          <div className="flex items-center justify-between">
            <span>5 modules</span>
            <span>2.5 hrs</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm">Start sprint</Button>
          <Button size="sm" variant="outline">
            Preview
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardStatsView() {
  return (
    <div className={panelClassName}>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div>
            <CardTitle>Usage overview</CardTitle>
            <CardDescription>Last 7 days summary.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Active", value: "1.2k" },
              { label: "Exports", value: "86" },
              { label: "Errors", value: "2" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-muted/30 px-2 py-3"
              >
                <div className="text-lg font-semibold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-lg border border-dashed border-border px-3 py-2 text-sm">
            <span className="text-muted-foreground">Trend</span>
            <span className="inline-flex items-center gap-1 font-medium">
              <Sparkles className="h-4 w-4" />
              Stable
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="sm" variant="outline">
            Download
          </Button>
          <Button size="sm">Share</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardExamples() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <CardBasicExample />
      <CardSmallExample />
      <CardHeaderActionExample />
      <CardMediaExample />
    </div>
  );
}

export default CardDefaultView;

export function CardBasicExample() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Basic Card</CardTitle>
          <CardDescription>Simple card with title and description</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is a minimal card component with essential elements.
        </p>
      </CardContent>
    </Card>
  );
}

export function CardSmallExample() {
  return (
    <Card size="sm">
      <CardHeader>
        <div className="space-y-1.5">
          <CardTitle>Small Card</CardTitle>
          <CardDescription>Compact variant</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-sm text-muted-foreground">
          Uses the small size variant for tighter spacing.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm" className="w-full">
          Action
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardHeaderActionExample() {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Weekly Report</CardTitle>
          <CardDescription>Performance highlights</CardDescription>
        </div>
        <CardAction>
          <Button size="sm" variant="outline" leftIcon={<Star className="h-4 w-4" />}>
            Star
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border bg-muted/30 p-3 text-sm">
          Engagement up 12% with 3.4% CTR across campaigns.
        </div>
      </CardContent>
    </Card>
  );
}

export function CardMediaExample() {
  return (
    <Card className="overflow-hidden">
      <div className="h-32 w-full bg-gradient-to-br from-foreground/10 via-muted to-foreground/5" />
      <CardHeader>
        <div>
          <CardTitle>Design Sprint</CardTitle>
          <CardDescription>Workshop toolkit</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Ready-to-run agenda with templates and exercises for alignment.
        </p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Start</Button>
        <Button size="sm" variant="outline">
          Preview
        </Button>
      </CardFooter>
    </Card>
  );
}

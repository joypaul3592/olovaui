"use client";

import dynamic from "next/dynamic";

export type AIButtonProps = {
  dir?: "left" | "right";
  inline?: boolean;
};

const LazyAIButton = dynamic(
  () => import("./ai-assistant-button").then((mod) => mod.AIButton),
  { ssr: false }
);

export const AIButtonLazy = (props: AIButtonProps) => {
  return <LazyAIButton {...props} />;
};

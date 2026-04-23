import ButtonView from "@/app/docs/button";
import BorderBeamView from "@/app/docs/border-beam";
import ShineBorderView from "@/app/docs/shine-border";

// Component registry mapping component names to their view components
export const ComponentRegistry: Record<string, React.ComponentType> = {
  "button": ButtonView,
  "border-beam": BorderBeamView,
  "shine-border": ShineBorderView,
};

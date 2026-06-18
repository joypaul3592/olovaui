export type ShowcaseCategory =
  | "Core"
  | "Forms"
  | "Overlays"
  | "Navigation"
  | "Feedback"
  | "Advanced"
  | "Text"
  | "Media";

export type ShowcaseItem = {
  name: string;
  category: ShowcaseCategory;
  href: string;
  description: string;
};

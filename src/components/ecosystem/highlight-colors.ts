import type { WorldHighlight } from "./worlds";

export const highlightStroke: Record<WorldHighlight, string> = {
  amber: "#d8b77a",
  blue: "#83c7f7",
  green: "#9ac5a1",
  muted: "#adb5bf",
};

export const highlightFill: Record<WorldHighlight, string> = {
  amber: "rgba(216, 183, 122, 0.14)",
  blue: "rgba(131, 199, 247, 0.12)",
  green: "rgba(154, 197, 161, 0.12)",
  muted: "rgba(173, 181, 191, 0.1)",
};
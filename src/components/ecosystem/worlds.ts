import type { Project } from "@/content";
import { getFeaturedProjects, getProjectsByCollection } from "@/lib/content";

export type WorldHighlight = "amber" | "blue" | "green" | "muted";

export interface EcosystemWorld {
  slug: string;
  name: string;
  summary: string;
  highlight: WorldHighlight;
  tier: "foreground" | "midground" | "background";
  anchorId: string;
  metaphor: string;
}

const researchLead = getProjectsByCollection("research").find(
  (project) => project.slug === "geoai",
);

const featured = getFeaturedProjects();

function projectWorld(
  project: Project,
  highlight: WorldHighlight,
  tier: EcosystemWorld["tier"],
  metaphor: string,
): EcosystemWorld {
  return {
    slug: project.slug,
    name: project.name,
    summary: project.summary,
    highlight,
    tier,
    anchorId: `project-${project.slug}`,
    metaphor,
  };
}

export const ecosystemWorlds: EcosystemWorld[] = [
  projectWorld(
    featured[0]!,
    "amber",
    "foreground",
    "Camera volumes, calibrated floor plane, responder routing",
  ),
  projectWorld(
    featured[1]!,
    "blue",
    "foreground",
    "Branching executable states and validated adoption paths",
  ),
  projectWorld(
    featured[2]!,
    "blue",
    "midground",
    "Captured documents linked to retrieval structure",
  ),
  projectWorld(
    featured[3]!,
    "green",
    "midground",
    "Terraced routines and measured progression",
  ),
  {
    slug: "research",
    name: "Research terrain",
    summary: researchLead
      ? `${researchLead.summary} Additional research areas remain in review.`
      : "Undergraduate research across geospatial ML, speech, autonomy, and systems.",
    highlight: "muted",
    tier: "background",
    anchorId: "research",
    metaphor: "Terrain contours and spatial sampling",
  },
];

export const worldLayout: Record<
  string,
  { x: number; y: number; w: number; h: number }
> = {
  aegis: { x: 72, y: 300, w: 168, h: 132 },
  paradox: { x: 430, y: 248, w: 186, h: 148 },
  synapse: { x: 248, y: 168, w: 152, h: 118 },
  bettr: { x: 578, y: 188, w: 146, h: 112 },
  research: { x: 318, y: 72, w: 200, h: 96 },
};

export const worldConnections: Array<[string, string]> = [
  ["aegis", "paradox"],
  ["aegis", "synapse"],
  ["synapse", "paradox"],
  ["paradox", "bettr"],
  ["synapse", "research"],
  ["bettr", "research"],
  ["aegis", "research"],
];
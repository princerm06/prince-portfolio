import { experience, identity, projects } from "@/content";
import type { ExperienceRecord, Project } from "@/content";

export type EcosystemDepth = "foreground" | "midground" | "context";

export const ecosystemWorldKeys = [
  "aegis",
  "paradox",
  "synapse",
  "bettr",
  "research",
] as const;

export type EcosystemWorldKey = (typeof ecosystemWorldKeys)[number];

export interface EcosystemWorld {
  key: EcosystemWorldKey;
  label: string;
  depth: EcosystemDepth;
  href: string;
  projects: Project[];
}

export type ContactLinkKind = "github" | "linkedin" | "email" | "resume";

export interface ContactLink {
  kind: ContactLinkKind;
  label: string;
  href: string;
}

export const homeSectionIds = {
  selectedWork: "selected-work",
  research: "research",
} as const;

const flagshipRankLimit = 2;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter(
      (project): project is Project & { featuredRank: number } =>
        project.featuredRank !== null,
    )
    .sort((firstProject, secondProject) => firstProject.featuredRank - secondProject.featuredRank);
}

export function getProjectsByCollection(
  collection: Project["collection"],
): Project[] {
  return projects.filter((project) => project.collection === collection);
}

export function getReviewRequiredProjects(): Project[] {
  return projects.filter(
    (project) => project.implementationStatus === "review-required",
  );
}

export function getIncomingExperience(): ExperienceRecord[] {
  return experience.filter((record) => record.status === "incoming-confirmed");
}

export function getPendingExperience(): ExperienceRecord[] {
  return experience.filter(
    (record) => record.status === "pending-resume-details",
  );
}

export function isFlagshipProject(project: Project): boolean {
  return project.featuredRank !== null && project.featuredRank <= flagshipRankLimit;
}

export function getProjectAnchorId(slug: string): string {
  return `project-${slug}`;
}

export function getProjectHref(slug: string): string {
  return `#${getProjectAnchorId(slug)}`;
}

export function getEcosystemWorlds(): EcosystemWorld[] {
  return ecosystemWorldKeys.map((key): EcosystemWorld => {
    if (key === "research") {
      return {
        key,
        label: "Research",
        depth: "context",
        href: `#${homeSectionIds.research}`,
        projects: getProjectsByCollection("research"),
      };
    }
    const project = getProjectBySlug(key);
    if (!project || project.featuredRank === null) {
      throw new Error(`Ecosystem world "${key}" has no featured project record.`);
    }
    return {
      key,
      label: project.name,
      depth: isFlagshipProject(project) ? "foreground" : "midground",
      href: getProjectHref(project.slug),
      projects: [project],
    };
  });
}

export function getPublishedContactLinks(): ContactLink[] {
  const candidates: { kind: ContactLinkKind; label: string; href: string | null }[] = [
    { kind: "github", label: "GitHub", href: identity.github },
    { kind: "linkedin", label: "LinkedIn", href: identity.linkedin },
    {
      kind: "email",
      label: "Email",
      href: identity.email === null ? null : `mailto:${identity.email}`,
    },
    { kind: "resume", label: "Resume", href: identity.resumePdf },
  ];
  return candidates.flatMap(({ kind, label, href }) =>
    href === null ? [] : [{ kind, label, href }],
  );
}

import { experience, projects } from "@/content";
import type { ExperienceRecord, Project } from "@/content";

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

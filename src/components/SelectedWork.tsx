import { getFeaturedProjects } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

export function SelectedWork() {
  const featured = getFeaturedProjects();
  return (
    <section
      aria-labelledby="selected-work-heading"
      id="selected-work"
      className="scroll-mt-24 mt-24 md:mt-32"
    >
      <SectionHeading
        id="selected-work-heading"
        eyebrow="Selected work"
        title="Systems built for real constraints"
        description="Flagship projects lead the ecosystem. Summaries and evidence labels come from typed owner records — not independently audited."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            rank={project.featuredRank ?? undefined}
          />
        ))}
      </div>
    </section>
  );
}
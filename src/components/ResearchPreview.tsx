import { getProjectsByCollection } from "@/lib/content";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeading } from "@/components/SectionHeading";

export function ResearchPreview() {
  const research = getProjectsByCollection("research");

  return (
    <section
      aria-labelledby="research-heading"
      id="research"
      className="scroll-mt-24 mt-24 md:mt-32"
    >
      <SectionHeading
        id="research-heading"
        eyebrow="Research"
        title="Terrain under review"
        description="Research records stay honest about evidence gaps. GeoAI includes owner-reported metrics; other areas await owner review."
      />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {research.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
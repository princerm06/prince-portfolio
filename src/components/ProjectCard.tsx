import type { Project } from "@/content";

interface ProjectCardProps {
  project: Project;
  rank?: number;
}

const statusLabel: Record<Project["implementationStatus"], string> = {
  "owner-reported-implemented": "Owner-reported implemented",
  "review-required": "Status requires review",
};

export function ProjectCard({ project, rank }: ProjectCardProps) {
  const anchorId = `project-${project.slug}`;
  return (
    <article
      id={anchorId}
      className="scroll-mt-28 rounded-sm border border-border bg-surface p-6 md:p-8"
    >
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="font-serif text-2xl text-ink">{project.name}</h3>
        {rank ? (
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
            Flagship {rank}
          </span>
        ) : null}
      </header>
      <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-muted">
        {project.domains.join(" · ")}
      </p>
      <p className="mt-4 max-w-[65ch] text-muted">{project.summary}</p>
      <dl className="mt-6 grid gap-3 font-mono text-xs text-muted md:grid-cols-2">
        <div>
          <dt className="text-ink">Implementation</dt>
          <dd>{statusLabel[project.implementationStatus]}</dd>
        </div>
        <div>
          <dt className="text-ink">Evidence</dt>
          <dd>
            {project.evidenceStatus === "none-provided"
              ? "None provided yet"
              : "Owner-supplied; unverified"}
          </dd>
        </div>
      </dl>
      {project.technologies.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.slice(0, 8).map((tech) => (
            <li
              key={tech}
              className="rounded-sm border border-border px-2 py-1 font-mono text-[11px] text-blue"
            >
              {tech}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="mt-6 font-mono text-[11px] text-muted">
        Full case study page pending Milestone 2 — repository links awaiting
        owner approval.
      </p>
    </article>
  );
}
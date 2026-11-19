import type { EcosystemWorld } from "./worlds";
import { highlightStroke } from "./highlight-colors";

interface ProjectPreviewProps {
  world: EcosystemWorld | null;
}

export function ProjectPreview({ world }: ProjectPreviewProps) {
  if (!world) {
    return (
      <p className="min-h-[5.5rem] rounded-sm border border-border bg-surface px-4 py-3 font-mono text-xs leading-relaxed text-muted">
        Hover or focus a world to see a short summary. Paths highlight connected
        engineering areas. All diagrams are conceptual.
      </p>
    );
  }

  const accent = highlightStroke[world.highlight];

  return (
    <div
      id={`preview-${world.slug}`}
      className="min-h-[5.5rem] rounded-sm border border-border bg-surface px-4 py-3"
      style={{ borderColor: accent }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: accent }}>
        {world.metaphor}
      </p>
      <p className="mt-2 text-sm text-ink">{world.summary}</p>
      <p className="mt-2 font-mono text-[11px] text-muted">
        Jump to{" "}
        <a href={`#${world.anchorId}`} className="text-blue underline-offset-2 hover:underline">
          {world.name} section
        </a>
        . Case study routes arrive Milestone 2.
      </p>
    </div>
  );
}
import { getIncomingExperience, getPendingExperience } from "@/lib/content";
import { SectionHeading } from "@/components/SectionHeading";

export function ExperiencePreview() {
  const incoming = getIncomingExperience();
  const pending = getPendingExperience();

  return (
    <section
      aria-labelledby="experience-heading"
      id="experience"
      className="scroll-mt-24 mt-24 md:mt-32"
    >
      <SectionHeading
        id="experience-heading"
        eyebrow="Experience"
        title="Incoming and pending roles"
        description="Exact titles and dates publish only after resume approval. Accenture is incoming — not completed."
      />
      <ul className="mt-10 space-y-4">
        {incoming.map((record) => (
          <li
            key={record.slug}
            className="rounded-sm border border-border bg-raised p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-amber">
              Incoming · not completed
            </p>
            <h3 className="mt-2 font-serif text-xl">
              {record.organization} — {record.title}
            </h3>
            <p className="mt-1 font-mono text-sm text-muted">{record.period}</p>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-muted">
              {record.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      {pending.length > 0 ? (
        <div className="mt-8 rounded-sm border border-dashed border-border p-6">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
            Pending resume details ({pending.length})
          </p>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {pending.map((record) => (
              <li key={record.slug}>{record.ownerMention ?? record.slug}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
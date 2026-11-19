import { identity } from "@/content";
import { getIncomingExperience, getPendingExperience } from "@/lib/content";

const pendingItems = [
  "Integration and verification of the approved homepage implementation",
  "LinkedIn URL",
  "Public contact email",
  "Approved resume PDF",
  "Exact titles and dates for pending experience entries",
  "Repository links, real assets, and individual contribution details for projects",
];

export default function Home() {
  const incoming = getIncomingExperience();
  const pendingExperienceCount = getPendingExperience().length;

  return (
    <>
      <header className="mx-auto w-full max-w-[1440px] px-6 py-6 md:px-12">
        <p className="font-mono text-sm uppercase tracking-[0.12em] text-amber">
          {identity.name}
        </p>
      </header>
      <main
        id="main"
        className="mx-auto w-full max-w-[1440px] px-6 pb-24 pt-12 md:px-12"
      >
        <p className="font-mono text-sm uppercase tracking-[0.12em] text-muted">
          Milestone 0 · Foundation
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
          {identity.name}
        </h1>
        <p className="mt-6 max-w-[65ch] text-lg text-muted">
          {identity.roleLine.join(" | ")}
        </p>
        <p className="mt-2 max-w-[65ch] text-lg text-muted">
          {identity.institution} — {identity.degree}, expected graduation{" "}
          {identity.expectedGraduation}.
        </p>
        <p className="mt-6 max-w-[65ch] text-lg">{identity.philosophyShort}</p>
        <p className="mt-6">
          <a
            href={identity.github}
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-sm border border-blue px-4 font-mono text-sm text-blue underline-offset-4 hover:underline"
          >
            GitHub: princerm06
          </a>
        </p>

        <section
          aria-labelledby="status-heading"
          className="mt-16 max-w-[65ch] rounded-sm border border-border bg-surface p-6"
        >
          <h2
            id="status-heading"
            className="font-mono text-sm uppercase tracking-[0.12em] text-amber"
          >
            Project status
          </h2>
          <p className="mt-4">
            This site is at Milestone 0: the engineering foundation only. The
            homepage, project pages, and other public content are not built.
            The architecture and visual direction are owner-approved. Homepage
            implementation proceeds on separate feature branches and is not yet
            integrated here.
          </p>
          {incoming.map((record) => (
            <p key={record.slug} className="mt-4">
              Incoming: {record.organization} {record.title}, {record.period}.
              Not completed.
            </p>
          ))}
        </section>

        <section aria-labelledby="pending-heading" className="mt-12 max-w-[65ch]">
          <h2
            id="pending-heading"
            className="font-mono text-sm uppercase tracking-[0.12em] text-amber"
          >
            Pending before launch
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted">
            {pendingItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-4 text-muted">
            {pendingExperienceCount} experience entries await exact resume
            titles and dates.
          </p>
        </section>
      </main>
      <footer className="mx-auto w-full max-w-[1440px] border-t border-border px-6 py-8 md:px-12">
        <p className="font-mono text-sm text-muted">
          Content is owner-supplied and has not been independently verified.
        </p>
      </footer>
    </>
  );
}

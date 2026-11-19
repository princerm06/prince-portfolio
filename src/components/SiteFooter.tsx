import { identity } from "@/content";

export function SiteFooter() {
  return (
    <footer className="mx-auto mt-24 w-full max-w-[1440px] border-t border-border px-5 py-10 md:px-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl text-ink">{identity.name}</p>
          <p className="mt-2 max-w-[50ch] text-sm text-muted">
            {identity.institution} · {identity.degree}, expected{" "}
            {identity.expectedGraduation}
          </p>
        </div>
        <div className="flex flex-col gap-3 font-mono text-xs text-muted">
          <p>Owner-supplied content; not independently verified by this build.</p>
          <p>
            Conceptual ecosystem illustration — not product screenshots.
          </p>
          <a
            href={identity.github}
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-blue"
          >
            github.com/princerm06
          </a>
        </div>
      </div>
    </footer>
  );
}
import { identity } from "@/content";

export function HeroIdentity() {
  return (
    <div className="flex flex-col justify-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {identity.roleLine.join(" · ")}
      </p>
      <h1 className="mt-4 font-serif text-[clamp(3rem,9vw,4.75rem)] leading-[0.98] tracking-tight text-ink md:text-[clamp(3.75rem,6vw,7.5rem)]">
        {identity.name}
      </h1>
      <p className="mt-6 max-w-[32ch] font-serif text-xl leading-snug text-amber md:text-2xl">
        {identity.philosophyHeadline}
      </p>
      <p className="mt-4 max-w-[60ch] text-base text-muted md:text-lg">
        {identity.institution} — {identity.degree}, expected graduation{" "}
        {identity.expectedGraduation}. {identity.philosophyShort}
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <a
          href="#selected-work"
          className="inline-flex min-h-11 items-center rounded-sm border border-amber bg-raised px-5 font-mono text-xs uppercase tracking-[0.12em] text-amber transition-colors hover:bg-surface"
        >
          Explore work
        </a>
        <a
          href={identity.github}
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center rounded-sm border border-border px-5 font-mono text-xs text-blue"
        >
          View GitHub
        </a>
      </div>
      <p className="mt-8 max-w-[55ch] font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted lg:max-w-none">
        <span className="lg:hidden">
          Project cards below summarize each world. Case study pages arrive in
          Milestone 2.
        </span>
        <span className="hidden lg:inline">
          Interactive ecosystem at right — conceptual architectural diagram, not
          product screenshots.
        </span>
      </p>
    </div>
  );
}
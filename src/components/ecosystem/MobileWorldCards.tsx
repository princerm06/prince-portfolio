import type { CSSProperties } from "react";
import { ecosystemWorlds } from "./worlds";
import { highlightStroke } from "./highlight-colors";

export function MobileWorldCards() {
  return (
    <div className="mt-10 lg:hidden">
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-amber">
        Engineering worlds
      </h2>
      <ul className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {ecosystemWorlds.map((world) => (
          <li key={world.slug} className="min-w-[min(86vw,320px)] snap-start">
            <a
              href={`#${world.anchorId}`}
              className="flex min-h-44 flex-col rounded-sm border border-border bg-surface p-5 outline-none transition-colors hover:border-[color:var(--accent)] focus-visible:border-[color:var(--accent)]"
              style={
                {
                  "--accent": highlightStroke[world.highlight],
                } as CSSProperties
              }
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.12em]"
                style={{ color: highlightStroke[world.highlight] }}
              >
                {world.tier}
              </span>
              <span className="mt-2 font-serif text-xl text-ink">{world.name}</span>
              <span className="mt-3 line-clamp-3 text-sm text-muted">{world.summary}</span>
              <span className="mt-auto pt-4 font-mono text-[11px] text-blue">
                View details →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
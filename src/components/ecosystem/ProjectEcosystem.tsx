"use client";

import { useCallback, useEffect, useState } from "react";
import { ConnectionPaths } from "./ConnectionPaths";
import { MobileWorldCards } from "./MobileWorldCards";
import { ProjectPreview } from "./ProjectPreview";
import { SceneAtmosphere } from "./SceneAtmosphere";
import { WorldNode } from "./WorldNode";
import { ecosystemWorlds } from "./worlds";

export function ProjectEcosystem() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const onActivate = useCallback((slug: string | null) => {
    setActiveSlug(slug);
  }, []);

  const activeWorld =
    ecosystemWorlds.find((world) => world.slug === activeSlug) ?? null;

  return (
    <section
      aria-label="Interconnected engineering ecosystem"
      className="relative w-full"
    >
      <MobileWorldCards />
      <div className="hidden lg:block">
        <div className="relative h-[min(52vw,540px)] min-h-[420px] w-full overflow-hidden rounded-sm border border-border bg-canvas">
          <svg
            viewBox="0 0 800 520"
            className="h-full w-full"
            role="img"
            aria-label="Conceptual architectural map of flagship projects and research"
          >
            <SceneAtmosphere />
            <ConnectionPaths
              activeSlug={activeSlug}
              reducedMotion={reducedMotion}
            />
            {ecosystemWorlds.map((world) => (
              <WorldNode
                key={world.slug}
                world={world}
                isActive={activeSlug === world.slug}
                onActivate={onActivate}
              />
            ))}
          </svg>
        </div>
        <ProjectPreview world={activeWorld} />
      </div>
    </section>
  );
}
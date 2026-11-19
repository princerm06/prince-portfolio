import {
  ecosystemWorlds,
  worldConnections,
  worldLayout,
} from "./worlds";
import { highlightStroke } from "./highlight-colors";

interface ConnectionPathsProps {
  activeSlug: string | null;
  reducedMotion: boolean;
}

function center(slug: string): { x: number; y: number } {
  const box = worldLayout[slug];
  if (!box) return { x: 0, y: 0 };
  return { x: box.x + box.w / 2, y: box.y + box.h / 2 };
}

export function ConnectionPaths({
  activeSlug,
  reducedMotion,
}: ConnectionPathsProps) {
  const activeWorld = ecosystemWorlds.find((w) => w.slug === activeSlug);
  const activeStroke = activeWorld
    ? highlightStroke[activeWorld.highlight]
    : "#303a45";

  return (
    <g aria-hidden="true">
      {worldConnections.map(([from, to]) => {
        const a = center(from);
        const b = center(to);
        const isHot =
          activeSlug !== null && (from === activeSlug || to === activeSlug);
        return (
          <line
            key={`${from}-${to}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isHot ? activeStroke : "#303a45"}
            strokeWidth={isHot ? 2 : 1}
            strokeOpacity={isHot ? 0.85 : 0.45}
            className={
              reducedMotion
                ? undefined
                : "transition-[stroke,stroke-opacity,stroke-width] duration-200"
            }
          />
        );
      })}
    </g>
  );
}
"use client";

import type { EcosystemWorld } from "./worlds";
import { worldLayout } from "./worlds";
import { highlightFill, highlightStroke } from "./highlight-colors";

interface WorldNodeProps {
  world: EcosystemWorld;
  isActive: boolean;
  onActivate: (slug: string | null) => void;
}

function miniatureMarkup(slug: string) {
  switch (slug) {
    case "aegis":
      return (
        <>
          <rect x="18" y="52" width="28" height="18" fill="#182028" stroke="#d8b77a" strokeWidth="1" />
          <rect x="54" y="44" width="28" height="18" fill="#182028" stroke="#d8b77a" strokeWidth="1" />
          <circle cx="84" cy="86" r="10" fill="#11161c" stroke="#d8b77a" />
          <path d="M 20 96 L 100 96" stroke="#d8b77a" strokeOpacity="0.5" />
        </>
      );
    case "paradox":
      return (
        <>
          <circle cx="42" cy="50" r="8" fill="#11161c" stroke="#83c7f7" />
          <circle cx="78" cy="38" r="8" fill="#11161c" stroke="#83c7f7" />
          <circle cx="98" cy="62" r="8" fill="#11161c" stroke="#83c7f7" />
          <path d="M 42 50 L 78 38 L 98 62 L 62 74 Z" fill="none" stroke="#83c7f7" strokeOpacity="0.6" />
        </>
      );
    case "synapse":
      return (
        <>
          <rect x="24" y="40" width="22" height="30" fill="#182028" stroke="#83c7f7" />
          <rect x="56" y="48" width="22" height="30" fill="#182028" stroke="#83c7f7" />
          <path d="M 46 55 L 56 55" stroke="#83c7f7" />
        </>
      );
    case "bettr":
      return (
        <>
          <path d="M 28 88 L 48 68 L 68 78 L 88 58" fill="none" stroke="#9ac5a1" />
          <rect x="36" y="72" width="40" height="8" fill="#182028" stroke="#9ac5a1" />
        </>
      );
    default:
      return (
        <>
          <path
            d="M 20 80 Q 60 40 100 70 T 140 50"
            fill="none"
            stroke="#adb5bf"
            strokeOpacity="0.7"
          />
          <path
            d="M 30 95 Q 70 75 110 90"
            fill="none"
            stroke="#83c7f7"
            strokeOpacity="0.35"
          />
        </>
      );
  }
}

export function WorldNode({ world, isActive, onActivate }: WorldNodeProps) {
  const box = worldLayout[world.slug];
  if (!box) return null;

  const stroke = highlightStroke[world.highlight];
  const fill = highlightFill[world.highlight];
  const tierScale =
    world.tier === "foreground" ? 1 : world.tier === "midground" ? 0.96 : 0.92;

  return (
    <a
      href={`#${world.anchorId}`}
      className="group block outline-none"
      onFocus={() => onActivate(world.slug)}
      onBlur={() => onActivate(null)}
      onMouseEnter={() => onActivate(world.slug)}
      onMouseLeave={() => onActivate(null)}
      aria-describedby={isActive ? `preview-${world.slug}` : undefined}
    >
      <g
        transform={`translate(${box.x} ${box.y}) scale(${tierScale})`}
        role="img"
        aria-label={`${world.name}: ${world.metaphor}`}
      >
        <rect
          width={box.w}
          height={box.h}
          rx="4"
          fill={isActive ? fill : "#11161c"}
          stroke={isActive ? stroke : "#303a45"}
          strokeWidth={isActive ? 2 : 1}
          className="transition-[fill,stroke,stroke-width] duration-200"
        />
        <g transform="translate(8 8)">{miniatureMarkup(world.slug)}</g>
        <text
          x={12}
          y={box.h - 14}
          fill="#f2eee5"
          fontSize="13"
          fontFamily="ui-monospace, monospace"
          letterSpacing="0.08em"
        >
          {world.name.toUpperCase()}
        </text>
        <text
          x={12}
          y={22}
          fill="#adb5bf"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
        >
          {world.tier}
        </text>
      </g>
    </a>
  );
}
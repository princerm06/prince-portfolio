export function SceneAtmosphere() {
  return (
    <g aria-hidden="true">
      <defs>
        <linearGradient id="sky-fall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#182028" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#11161c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#090c10" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="floor-light" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#d8b77a" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#83c7f7" stopOpacity="0.04" />
        </linearGradient>
        <pattern
          id="floor-grid"
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke="#303a45"
            strokeOpacity="0.35"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="800" height="520" fill="url(#sky-fall)" />
      <path
        d="M 0 380 Q 200 320 400 360 T 800 340 L 800 520 L 0 520 Z"
        fill="url(#floor-light)"
      />
      <path
        d="M 0 400 L 800 400"
        stroke="#d8b77a"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
      <rect
        x="40"
        y="368"
        width="720"
        height="140"
        fill="url(#floor-grid)"
        opacity="0.55"
      />
      <path
        d="M 120 120 L 200 80 L 280 120 L 200 160 Z"
        fill="#182028"
        stroke="#303a45"
        strokeWidth="1"
        opacity="0.7"
      />
      <path
        d="M 520 96 L 610 56 L 700 96 L 610 136 Z"
        fill="#11161c"
        stroke="#303a45"
        strokeWidth="1"
        opacity="0.55"
      />
      <rect
        x="64"
        y="200"
        width="48"
        height="88"
        fill="#182028"
        stroke="#303a45"
        opacity="0.65"
      />
      <rect
        x="688"
        y="210"
        width="40"
        height="76"
        fill="#182028"
        stroke="#303a45"
        opacity="0.5"
      />
    </g>
  );
}
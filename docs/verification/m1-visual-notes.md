# Milestone 1 visual verification — Cursor implementation

Captured 2026-11-19 against production build (`pnpm build` + `pnpm start` on port 3000).

## Screenshot evidence

| Viewport | File |
| --- | --- |
| Desktop 1280×900 (hero) | `docs/verification/m1-screenshots/home-desktop-1280.png` |
| Desktop 1280 full page | `docs/verification/m1-screenshots/home-desktop-1280-full.png` |
| Mobile 390×844 (hero) | `docs/verification/m1-screenshots/home-mobile-390.png` |
| Mobile 390 full page | `docs/verification/m1-screenshots/home-mobile-390-full.png` |

## Reference alignment (60/25/15)

- **60% cinematic architectural night:** Layered SVG atmosphere, floor grid, isometric massing, flagship AEGIS/Paradox foreground nodes, connected paths — not a generic node graph.
- **25% Zed editorial:** Oversized serif identity, restrained surfaces, mono labels, no fake availability or resume/contact CTAs.
- **15% isometric environment:** Miniature world glyphs per project, path highlighting on hover/focus, conceptual labeling in footer.

## Rendering choices

- **Three.js:** Not used. SVG + DOM client island only; incremental JS stays within M1 target without a WebGL render loop.
- **Fonts:** System fallbacks until `feat/m1-infra` local font bundle merges.
- **Figma MCP:** Not observed in this runtime (catalog search returned no Figma namespace; only Refero tool text mentioned Figma).

## Checks

`pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build` all passed on `feat/m1-homepage` before commit.
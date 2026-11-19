# Design system — Useful Systems / Architectural Night

Status: **owner-approved** (2026-11-19). Implement Milestone 1 against this document and `docs/cursor-design-review.md`.

## Art direction

Working name: Useful Systems / Architectural Night.

Reference priority is semantic, not attachment order: cinematic Purdue-inspired composition 60%, Zed monochrome editorial 25%, isometric environment 15%. Treat images as inspiration, never as project evidence. Do not publish the source images without permission. Private attachment paths must not appear in public docs or assets.

The signature is an elegant oversized serif identity beside an interactive architectural system with real depth — layered miniature environments, atmospheric lighting, and premium composition — not a generic node graph. Atmospheric depth belongs behind the content; contrast and hierarchy belong in front. AEGIS and Paradox are the flagship worlds. Purdue-inspired architectural rhythm only; no unlicensed Purdue photography or invented official affiliation graphics.

## Tokens

| Token | Value | Purpose |
| --- | --- | --- |
| canvas | #090C10 | Main near-black |
| surface | #11161C | Quiet panels |
| raised | #182028 | Active/detail surfaces |
| text | #F2EEE5 | Warm ivory primary text |
| muted | #ADB5BF | Readable secondary text |
| amber | #D8B77A | Identity, architectural light, emphasis |
| blue | #83C7F7 | Technical paths, focus and selection |
| green | #9AC5A1 | Real status only, never fake availability |
| border | #303A45 | Subtle surface boundaries, not body text |

Contrast must be measured on actual composited surfaces: WCAG AA 4.5:1 normal text, 3:1 large text and necessary controls. Amber/blue not relied on as sole state indicators. Focus uses a visible 2px blue ring with offset on opaque background.

## Type and spacing

- Display: Newsreader, high-contrast serif; local open-font distribution in M1. Desktop name clamp(3.75rem, 6vw, 7.5rem), restrained tracking and 0.95–1.02 line height. Mobile name wraps intentionally, never clips.
- Body: Inter, 16–18px, 1.6 line height, prose 60–70ch max.
- Technical labels: JetBrains Mono, 12–13px minimum, 0.08–0.14em tracking; do not use tiny labels for essential prose.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px. Desktop gutters 48–64px; mobile 20–24px. Content max-width 1440px.
- Corners: 2–6px on controls/cards; no excessive pills or glass. One-pixel dividers, minimal shadows.

## Ecosystem

| World | Metaphor | Highlight color |
| --- | --- | --- |
| AEGIS | Camera volumes, calibrated floor plane, route to responder node | amber |
| Paradox | Branching executable states and validated adoption path | blue |
| Synapse | Captured documents connected to retrieval structure | blue |
| Bettr | Terraced routines and measured progression | restrained green |
| Research | Terrain contours and spatial sampling | muted amber/blue |

Build with separate SVG layers / DOM anchor nodes / CSS / optimized assets so the scene keeps architectural miniature depth. Selective Three.js only if measurable visual benefit justifies the cost. Decorative abstract diagrams must be labeled conceptual, not product screenshots. Hierarchy: AEGIS/Paradox foreground, Synapse/Bettr midground, research context. Depth via occlusion, fine edge lighting, and perspective; avoid huge glows and crowded floating metadata.

Hover/focus reveals one short technical summary and activates connected paths. First tap navigates or opens an explicitly labeled preview with clear case-study link; no hover-only content. Avoid tooltip/modal behavior unless necessary. No controls for nonexistent features. Before M2 case studies exist, use meaningful selected-work anchors or honest compact previews, never broken slug links. Resume/contact destinations publish only when approved URLs/files exist.

## Motion and responsive behavior

State transitions 160–220ms, single restrained entrance <=400ms only if useful. No idle perpetual animation. Reduced motion removes transforms/path travel while preserving static highlights and all navigation. Keyboard Tab/Enter works with semantic links. Touch targets >=44x44px. Escape closes any added preview/popover and restores focus.

>=1200px: 44/56 identity/scene split. 768–1199px: simplify scene, reduce labels, retain priority. <768px: identity first, stacked or horizontally scrollable semantic project cards with visible controls; no scaled-down unreadable desktop canvas. Validate at 360, 390, 768, 1280, 1440px and 200% zoom.

## Validation

Compare actual browser screenshots to all three references (60/25/15). Verify responsive layouts, keyboard navigation, reduced motion, accessibility, and performance. Do not substitute code completion for visual verification.

## Figma

Figma stays in the workflow. Milestone 0 runtime could not verify Figma MCP. Use the standalone Cursor handoff in `docs/cursor-design-review.md`. Do not block initial Milestone 1 development on Figma access.

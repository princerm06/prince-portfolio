# prince-portfolio

Source for Prince Mohapatra's public engineering portfolio (Software Engineer | AI Builder | Undergraduate Researcher).

## Status

**Milestone 0 foundation is complete and verified.** Typed content, CI, and the neutral status root page ship on `feat/foundation`. Architecture and design direction are **owner-approved** (2026-11-19); see `docs/architecture.md`, `docs/design-system.md`, and `docs/cursor-design-review.md`.

### Milestone 1

Milestone 1 homepage implementation is authorized on dedicated feature branches (not `main`). Acceptance criteria: `docs/milestone-1-checklist.md`. Figma remains optional and must not block initial development. No merges to `main`, production deploys, or destructive git operations without master-planner approval.

`feat/m1-infra` holds the bundled fonts and homepage content queries described below. It is a checkpoint and has not been merged.

## Toolchain

| Tool | Version | Pinned in |
| --- | --- | --- |
| Node.js | 24.22.3 | `.nvmrc`, `engines` in `package.json`, CI (`node-version-file`) |
| pnpm | 12.21.0 | `packageManager` in `package.json` (Corepack) |
| Next.js / React | 16.4.6 / 19.3.1 | `package.json`, `pnpm-lock.yaml` |
| TypeScript | 6.0.3 (strict) | `package.json` |
| Tailwind CSS | 4.3.5 | `package.json` |
| ESLint | 9.39.5 | `package.json` |
| Vitest | 4.1.12 | `package.json` |

TypeScript is held below 7 and ESLint below 10 because `typescript-eslint` and `eslint-config-next` peer ranges do not yet cover them at the time of writing. Verify before upgrading.

## Setup

```sh
nvm use            # reads .nvmrc
corepack enable    # provides the pinned pnpm
pnpm install --frozen-lockfile
pnpm dev
```

No environment variables are required; there is no `.env.example` because there are none to document.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Development server |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest (content, font, and infrastructure invariants) |
| `pnpm build` | Production build |
| `pnpm check` | typecheck, lint, test, build in sequence |

CI (`.github/workflows/ci.yml`) runs a frozen install, typecheck, lint, tests, and build on pull requests and pushes to `main`. Permissions are `contents: read`; no secrets are used.

## Structure

```text
src/app/          root layout, metadata, foundation page, base styles
src/app/fonts/    bundled font files, OFL licenses, provenance record
src/content/      typed identity, project/research, and experience records
src/lib/          content query helpers
tests/            content, font, and infrastructure invariants
docs/             architecture, design system, assignments, verification
.github/workflows CI
```

Server components are the default. There are no client components yet. Fonts are bundled locally (see Fonts); there are no runtime external fonts, analytics, authentication, database, or AI packages.

## Fonts

Newsreader, Inter, and JetBrains Mono live in `src/app/fonts/` and load through `next/font/local`. The build copies them to `/_next/static/media/` and the site serves them from its own origin. There is no runtime font CDN, and builds need no network access for fonts.

| Family | Role | CSS variable | Bytes | Axes | Version | Preloaded | Fallback while loading |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Newsreader | Display | `--font-serif` | 131,848 | wght 200–800, opsz 6–72 | 1.003 | Yes | Times New Roman, size-adjusted |
| Inter | Body | `--font-sans` | 48,432 | wght 100–900 | 4.001 | Yes | Arial, size-adjusted |
| JetBrains Mono | Technical labels | `--font-mono` | 40,480 | wght 100–800 | 2.211 | No | System monospace stack |

### Provenance and license

Each file is the Google Fonts latin-subset WOFF2, downloaded once on 2026-11-19 and committed unmodified. `src/app/fonts/provenance.json` records the request URL, file URL, SHA-256, byte size, font version, axes, upstream repository and commit, and the license source pinned to a `google/fonts` commit. Each family's `OFL.txt` sits verbatim beside its file. All three fonts are SIL Open Font License 1.1 with no Reserved Font Name. Each file also embeds its copyright notice and OFL URL in its `name` table, so the notice travels with the served font.

### How the fonts reach the page

- `src/app/layout.tsx` puts the three next/font variable classes on `<html>`. They set `--font-serif`, `--font-sans`, and `--font-mono`, the variables Tailwind's `font-serif`, `font-sans`, and `font-mono` utilities read. next/font's rules are unlayered and Tailwind emits `@theme` variables inside `@layer theme`, so the bundled fonts replace the system stacks in `globals.css` without any edit to that file. Body text gets Inter through the existing `var(--font-sans)`.
- Keep font tokens in a plain `@theme` block. Declaring `--font-sans`, `--font-serif`, or `--font-mono` in `@theme inline` or in an unlayered rule bypasses the bundled fonts, and `tests/fonts.test.ts` fails if that happens.
- Fallback stacks come from the `fallback` options in `src/app/fonts/index.ts`, not from the `@theme` values in `globals.css`. Keep those names unquoted: embedded double quotes break the font module Turbopack generates.
- Newsreader's optical-size axis follows font size under the browser default `font-optical-sizing: auto`, which gives the high-contrast display cut at large sizes.

### Limits

- Latin subset only. Arrows such as → ↗ ← and symbols such as ≤ ≈ are in none of the bundled files and render in a fallback font. Use inline SVG for arrows.
- No italic files. Browsers synthesize a slant for `font-style: italic`; add the italic files (same license) only if the design needs true italics.
- Newsreader and Inter are preloaded on every route (180,280 bytes together). JetBrains Mono (40,480 bytes) is fetched when first used. The opsz axis is more than half of Newsreader's file: the weight-only file is 58,152 bytes. Google Fonts serves the full file for any opsz or weight sub-range, so shrinking it means dropping optical sizing or fixing one weight.
- Fallback metrics are computed from each font's default instance (Newsreader opsz 18, weight 400), so check the hero name at display sizes for layout shift when the font swaps in.

To update a font, replace the file, update its entry in `provenance.json`, and run `pnpm test`. The tests read each file's `name`, `fvar`, and `cmap` tables and check them against the record, the `next/font/local` options, and every character used in `src/content`.

## Homepage content queries

`src/lib/content.ts` derives what the homepage shows from the typed records, so components never restate claims.

| Helper | Returns |
| --- | --- |
| `getEcosystemWorlds()` | The five scene worlds in hierarchy order: AEGIS and Paradox (`foreground`), Synapse and Bettr (`midground`), and Research (`context`, every research record). Each has a typed `key` from `ecosystemWorldKeys`, a label, an `href`, and its project records. It throws at build time if a project world loses its featured record. |
| `getFeaturedProjects()`, `isFlagshipProject()` | Selected work in rank order; AEGIS and Paradox are the only flagships. |
| `getProjectAnchorId(slug)`, `getProjectHref(slug)` | `project-<slug>` and `#project-<slug>`. Project links stay in-page until `/projects/[slug]` exists in Milestone 2, so give each homepage project entry `id={getProjectAnchorId(slug)}`. |
| `homeSectionIds` | `selected-work` and `research`, the targets for the primary CTA and the research world. |
| `getPublishedContactLinks()` | Only destinations present in `identity`. Today that is GitHub alone; LinkedIn, email, and resume appear once their fields hold approved values. |
| `getIncomingExperience()`, `getPendingExperience()` | Accenture (incoming, Summer 2027) and the three entries awaiting exact titles and dates. |

## Content and evidence rules

Every claim and metric in `src/content` is tagged `owner-supplied`. Nothing has been independently verified by this build, and the site must not present it as audited. Unknown values are `null` or `review-required`, never guessed.

- The Paradox Factory Droid SDK-backed run (26 passing tests, 6 successful validation checks) and the scripted NASA FIRMS demo (1,198 observations, Model B approximately 11% lower RMSE versus Original) are separate evidence records. The NASA demo used scripted generation, not the Factory Droid SDK.
- Accenture Technology Summer Analyst is incoming for Summer 2027. It is not completed, and no Forward Deployed Engineer assignment is confirmed.

## Known missing evidence

- LinkedIn URL, public email, and resume PDF (all `null`).
- Exact titles, organizations, and dates for the UNG IESA AI Research Internship, CogniSpeech research engineering, and Autonomous Drone Mapping / ML@Purdue entries.
- Repository and live URLs for every project.
- Individual contribution breakdowns, including for AEGIS (four developers) and Paradox (two developers).
- AEGIS event month; no prize placement or award claims exist for AEGIS or Paradox.
- Implementation status for Blackbox, Autonomous Drone Mapping, CogniSpeech, Architectural Drift Benchmark, and QForge (all review-required); results for CogniSpeech and Architectural Drift Benchmark; evaluation protocols behind the GeoAI figures.
- Approved visual assets. None are in `public/`.

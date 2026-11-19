# prince-portfolio

Source for Prince Mohapatra's public engineering portfolio (Software Engineer | AI Builder | Undergraduate Researcher).

## Status

**Milestone 0 only: the application foundation.** The root page is a neutral status page (identity, Milestone 0 status, GitHub link). It is marked `noindex, nofollow`. The homepage, ecosystem visualization, project pages, and all other public content are not built.

### Milestone 1 approval gate

Milestone 1 does not start until the owner explicitly approves the proposals in `docs/architecture.md` and `docs/design-system.md`. Acceptance criteria are in `docs/milestone-1-checklist.md`. Owner approval is pending.

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
| `pnpm test` | Vitest (content and infrastructure invariants) |
| `pnpm build` | Production build |
| `pnpm check` | typecheck, lint, test, build in sequence |

CI (`.github/workflows/ci.yml`) runs a frozen install, typecheck, lint, tests, and build on pull requests and pushes to `main`. Permissions are `contents: read`; no secrets are used.

## Structure

```text
src/app/          root layout, metadata, foundation page, base styles
src/content/      typed identity, project/research, and experience records
src/lib/          content query helpers
tests/            content and infrastructure invariants
docs/             architecture, design system, assignments, verification
.github/workflows CI
```

Server components are the default. There are no client components yet. System fonts only; no runtime external fonts, analytics, authentication, database, or AI packages.

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
- Approved assets and licensed fonts. None are in `public/`.

# Architecture — owner-approved Milestone 1 contract

Status: **owner-approved** (2026-11-19). Milestone 1 homepage implementation is authorized under the refinements below. Further milestones still require their own gates.

## Product boundaries

Engineering portfolio for recruiters, engineering leaders, researchers, and collaborators. Position Prince as Software Engineer | AI Builder | Undergraduate Researcher; never a design agency or freelancer. Public launch contains no assistant, career dashboard, authentication, database, or external-action automation.

## Application

- Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint, pnpm with committed lockfile.
- Server-rendered content and metadata by default. Statically generated case studies in later milestones; no runtime CMS.
- Structured TypeScript content first. Introduce MDX only when technical prose warrants its additional build surface.
- Vitest for schema and content invariants. Browser navigation, keyboard, viewport, reduced-motion, and axe checks added alongside actual interactive UI.
- GitHub Actions: frozen install, typecheck, lint, unit tests, production build. Single supported Node version pinned in .nvmrc and CI; exact pnpm version in packageManager.
- Vercel deployment in Milestone 4 only. No production domain or successful deployment is assumed.
- Milestone 0 root page was a neutral foundation status page. Milestone 1 replaces it with the approved editorial homepage + ecosystem, still `noindex` until launch readiness unless the owner directs otherwise.

## Directory contract

```text
src/app/                 root layout, metadata, homepage, base styles
src/content/             typed identity, project, research, experience records
src/lib/                 schema/query helpers as needed
src/components/          reusable server components + small client islands
public/                  only approved, provenance-tracked assets
tests/                   content and infrastructure invariants
docs/                    decisions, assignments, design, verification
.github/workflows/       CI
```

## Route map

| Route | Milestone | Rendering/content |
| --- | --- | --- |
| / | 1 | Editorial homepage + isolated ecosystem client component |
| /projects | 2 | Server list + accessible client domain filters |
| /projects/[slug] | 2 | Static typed case study; unknown slugs return 404 |
| /research, /research/[slug] | 3 | Status/methodology/results/evidence explicitly separated |
| /experience, /about | 3 | Approved role titles, dates, and background |
| /notes | 3 | Honest empty state until writing is provided |
| /resume | 3 | Preview/download only after approved PDF supplied |
| /contact | 3 | Only approved contact details |

## Component contract for Milestone 1

Server: SiteHeader, SiteFooter, SectionHeading, HeroIdentity, SelectedWork, ProjectCard, ExperiencePreview, ResearchPreview, EvidencePanel (as needed for honest provenance).

Client islands: MobileNav (if necessary), ProjectEcosystem. Ecosystem contains NodeLink, ConnectionPaths, and ProjectPreview. Shared typed content supplies names, slugs, summaries, and visual keys; never duplicate claims in visualization code.

Hero order: identity and primary CTA first in DOM; large-screen two-column composition around 44/56; architectural scene behind real anchor links on the right. Hover and focus share state, touch works by tap, and primary links navigate without JavaScript. Compact ordered project cards replace the scene on small screens.

### Visual fidelity (owner refinement)

The project ecosystem must not collapse into a generic node graph or flowchart. Retain the architectural depth, layered miniature environments, atmospheric lighting, and premium composition of the cinematic primary reference. Prefer SVG, layered DOM, CSS, and optimized visual assets. Selective Three.js is permitted only when justified by measurable visual benefit and acceptable performance against the budgets below; SVG/DOM-first remains the default path.

No canvas-only navigation, autoplay, audio, scroll hijacking, or continuous particle systems.

## Content and evidence contract

Each project has stable slug, category/domain, summary, technologies, implementation status, evidence status, metrics with contextual labels, limitations, and optional real source links. Owner-provided evidence is tagged owner-supplied, not independently verified by this build. Unknown dates, contribution breakdowns, URLs, employment statuses, and assets remain null/explicitly pending, never guessed.

AEGIS and Paradox lead selected work and the ecosystem foreground; Synapse and Bettr follow; research terrain completes the five-world scene. Unknown implementation progress remains review-required. Paradox SDK validation and scripted NASA demo are separate evidence records. Incoming Accenture is Summer 2027, without FDE placement. Other experience remains pending exact resume titles/dates. Do not invent professional experience, awards, or deployments.

## Dependencies and risk controls

Required: next, react, react-dom; TypeScript, Tailwind/PostCSS, ESLint, Vitest dev tools. No motion/icon/UI library until used. CSS transitions first; Motion optional in M1 if justified by reduced-motion-aware orchestration. No Prisma, tRPC, auth, or analytics at this stage. Three.js only under the selective justification rule above.

Approved fonts: locally bundled Newsreader, Inter, JetBrains Mono with license files and fallback metrics in M1. Maintain fixed asset aspect ratios and scene height. Proposed launch budgets: LCP <=2.5s, CLS <=0.1, INP <=200ms under agreed measurement conditions; Lighthouse mobile accessibility >=95 and performance >=90 as lab goals, not achieved claims. M1 ecosystem initial incremental JS target <=50KB gzip, scene assets <=400KB, no render loop when idle.

## Git workflow (owner refinement)

Claude and Cursor may commit and push to dedicated feature branches after completing assigned checks. No direct commits to `main`, merges, production deployments, or destructive operations without master-planner approval.

## Review/dependency gates

1. Owner has approved architecture + design proposal for Milestone 1 (this document + `docs/design-system.md`).
2. Figma MCP was unavailable in the Milestone 0 delegated runtime; keep Figma in the workflow via standalone Cursor handoff. Do not block initial M1 development on Figma.
3. Owner supplies approved resume PDF, LinkedIn URL, contact address, and exact experience dates/titles before corresponding pages/CTAs publish.
4. Gather repository links and real assets; confirm individual contributions before case studies publish.
5. Background artwork requires ownership/license review. Reference compositions are not real product screenshots or approved Purdue imagery.
6. Design validation for M1 requires actual browser screenshots compared to the three-reference hierarchy, plus responsive, keyboard, reduced-motion, accessibility, and performance checks. Code completion is not visual verification.

## Technical references

Consulted official Next.js installation and Tailwind Next.js installation documentation during setup; actual versions are recorded in package.json and lockfile, not inferred from a model's training data.

- https://nextjs.org/docs/app/getting-started/installation
- https://tailwindcss.com/docs/installation/framework-guides/nextjs

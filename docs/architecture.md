# Architecture — proposal and Milestone 0 contract

Status: proposed for owner review. Milestone 1 is blocked on approval.

## Product boundaries

Engineering portfolio for recruiters, engineering leaders, researchers, and collaborators. Position Prince as Software Engineer | AI Builder | Undergraduate Researcher; never a design agency or freelancer. Public launch contains no assistant, career dashboard, authentication, database, or external-action automation.

## Application

- Next.js App Router, React, strict TypeScript, Tailwind CSS, ESLint, pnpm with committed lockfile.
- Server-rendered content and metadata by default. Statically generated case studies in later milestones; no runtime CMS.
- Structured TypeScript content first. Introduce MDX only when technical prose warrants its additional build surface.
- Vitest for schema and content invariants. Browser navigation, keyboard, viewport, reduced-motion, and axe checks added alongside actual interactive UI.
- GitHub Actions: frozen install, typecheck, lint, unit tests, production build. Single supported Node version pinned in .nvmrc and CI; exact pnpm version in packageManager.
- Vercel deployment in Milestone 4 only. No production domain or successful deployment is assumed.
- Milestone 0 root page is a neutral foundation status page with honest identity, GitHub link, skip link, and no links to unimplemented routes. Robots noindex until launch readiness; do not build the hero now.

## Directory contract

```text
src/app/                 root layout, metadata, foundation page, base styles
src/content/             typed identity, project, research, experience records
src/lib/                 schema/query helpers as needed
src/components/          introduced with actual reusable components in M1
public/                  only approved, provenance-tracked assets
tests/                   content and infrastructure invariants
docs/                    decisions, assignments, design, verification
.github/workflows/       CI
```

## Future route map (not implemented in M0)

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

## Component proposal for review

Server: SiteHeader, SiteFooter, SectionHeading, HeroIdentity, SelectedWork, ProjectCard, ExperiencePreview, ResearchPreview, EvidencePanel, CaseStudyLayout.

Client islands: MobileNav (if necessary), ProjectFilters, ProjectEcosystem. Ecosystem contains NodeLink, ConnectionPaths, and ProjectPreview. Shared typed content supplies names, slugs, summaries, and visual keys; never duplicate claims in visualization code.

Hero order: identity and primary CTA first in DOM; large-screen two-column composition around 44/56; SVG architecture behind real anchor links on right. Hover and focus share state, touch works by tap, and primary links navigate without JavaScript. Compact ordered project cards replace the scene on small screens. No canvas-only navigation, autoplay, audio, scroll hijacking, or continuous particle systems.

## Content and evidence contract

Each project has stable slug, category/domain, summary, technologies, implementation status, evidence status, metrics with contextual labels, limitations, and optional real source links. Owner-provided evidence is tagged owner-supplied, not independently verified by this build. Unknown dates, contribution breakdowns, URLs, employment statuses, and assets remain null/explicitly pending, never guessed.

AEGIS and Paradox lead selected work; Synapse and Bettr follow. Research includes Blackbox, autonomous drone mapping, GeoAI, CogniSpeech, architectural drift, QForge. Unknown implementation progress remains review-required. Paradox SDK validation and scripted NASA demo are separate evidence records. Incoming Accenture is Summer 2027, without FDE placement. Other experience remains pending exact resume titles/dates.

## Dependencies and risk controls

Required: next, react, react-dom; TypeScript, Tailwind/PostCSS, ESLint, Vitest dev tools. No motion/icon/UI library until used. CSS transitions first; Motion optional in M1 if justified by reduced-motion-aware orchestration. No Three.js, Prisma, tRPC, auth, or analytics at this stage.

Approved fonts proposed: locally bundled Newsreader, Inter, JetBrains Mono with license files and fallback metrics reviewed in M1. M0 uses system fonts and makes no font-network requests. Maintain fixed asset aspect ratios and scene height. Proposed launch budgets: LCP <=2.5s, CLS <=0.1, INP <=200ms under agreed measurement conditions; Lighthouse mobile accessibility >=95 and performance >=90 as lab goals, not achieved claims. M1 ecosystem initial incremental JS target <=50KB gzip, scene assets <=400KB, no render loop when idle.

## Review/dependency gates

1. Owner approves architecture + design proposal before M1 code.
2. Verify Figma tools inside Cursor; provider availability alone is not MCP access.
3. Owner supplies approved resume PDF, LinkedIn URL, contact address, and exact experience dates/titles before corresponding pages publish.
4. Gather repository links and real assets; confirm individual contributions before case studies publish.
5. Background artwork requires ownership/license review. Reference compositions are not real product screenshots or approved Purdue imagery.

## Technical references

Consulted official Next.js installation and Tailwind Next.js installation documentation during setup; actual versions are recorded in package.json and lockfile, not inferred from a model's training data.

- https://nextjs.org/docs/app/getting-started/installation
- https://tailwindcss.com/docs/installation/framework-guides/nextjs

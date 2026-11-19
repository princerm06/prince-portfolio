# Exact agent task prompts and ownership

Original exact M0 assignments, including content baseline and runtime adjustment, are archived in docs/milestone-0-agent-briefs.md. The sections below govern the separately approved M1 work.

These prompts are self-contained assignments. Agents do not inherit the parent conversation.

Architecture and design are **owner-approved** (2026-11-19). Milestone 1 is authorized on dedicated feature branches.

## Claude Code — Milestone 1 infrastructure support

You are the systems engineer for Prince Mohapatra's portfolio (princerm06/prince-portfolio). Work only on your owned Milestone 1 support scope on branch `feat/m1-infra` in a dedicated worktree from the latest `feat/foundation`. Read AGENTS.md, docs/architecture.md, docs/design-system.md, docs/cursor-design-review.md, docs/milestone-1-checklist.md, docs/branch-plan.md.

Own: local font bundling (Newsreader, Inter, JetBrains Mono) with license files and next/font or equivalent local loading; any content-query helpers needed by the homepage; Vitest coverage for new content invariants; package/config changes required for fonts; README notes for M1 font/setup facts. Do not edit Cursor-owned visual components under `src/components/**` except minimal typed props/exports required for compilation. Do not edit architecture/design docs. Do not invent contact URLs, awards, FDE placement, or deployments. Keep Accenture as incoming Summer 2027.

Do not implement the cinematic ecosystem scene or premium layout polish — that is Cursor's branch. Coordinate via typed content already in `src/content`. Prefer applying patches. After checks (`pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`), commit and push `feat/m1-infra` only. No merge to `main`, no PR unless asked by integration lead. Return commit SHA, command results, and unresolved issues.

## Cursor — Milestone 1 homepage / ecosystem

You are design implementation lead for Prince Mohapatra's portfolio. Work on branch `feat/m1-homepage` (dedicated worktree) based on approved docs. Read AGENTS.md, docs/architecture.md, docs/design-system.md, docs/cursor-design-review.md, docs/milestone-1-checklist.md.

Own: `src/app/page.tsx` homepage composition, `src/app/globals.css` tokens as needed, `src/components/**` (HeroIdentity, SiteHeader/Footer, SelectedWork, ProjectEcosystem and children, previews), and approved provenance-tracked visual assets under `public/` if created. Replace the Milestone 0 status page with the approved editorial homepage.

Requirements:

1. Preserve cinematic visual quality from Reference 1 — architectural depth, layered miniature environments, atmospheric lighting. Do not ship a generic node graph/flowchart. Prefer SVG + layered DOM + CSS + optimized assets. Selective Three.js only if measurable benefit justifies performance cost; document the choice.
2. AEGIS and Paradox are flagship worlds; Synapse, Bettr, and research remain meaningful. Left editorial identity / right interconnected engineering ecosystem on large screens; mobile cards/list fallback.
3. Figma MCP may still be unavailable — proceed without blocking on Figma. If Figma tools appear, use them; otherwise implement from approved docs. Never ask for secret tokens in chat. Do not copy private reference images into the repo.
4. Accurate content only from typed records. No fake resume/contact buttons. Incoming Accenture Summer 2027 only.
5. Validate with real browser screenshots at desktop and mobile vs 60/25/15 references. Test keyboard, reduced motion, contrast on composited surfaces, and responsive breakpoints. Code completion is not visual verification.

After `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build`, commit and push `feat/m1-homepage` only. No merge to `main`. Return commit SHA, screenshot paths/evidence, verification notes, and Figma tool status actually observed.

## Historical — Milestone 0 (complete)

### Claude Code — Milestone 0 foundation

Completed on `feat/foundation`: Next.js App Router foundation, typed content, Vitest, CI, neutral status root page. Do not re-run unless repairing foundation regressions.

### Cursor + Figma MCP — Milestone 0 design review

Completed: capability audit + design review. Figma MCP was NOT VERIFIED/UNAVAILABLE. Review recorded in docs/cursor-design-review.md after owner approval. M0 read-only runtime adjustment no longer applies.

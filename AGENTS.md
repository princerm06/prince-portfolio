# Portfolio engineering protocol

This repository is Prince Mohapatra's portfolio source of truth.

- Current authorized scope: Milestone 1 homepage after owner approval of architecture and design (2026-11-19). Do not implement later routes (case studies, research pages, resume/contact destinations) until their gates clear.
- Read docs/architecture.md, docs/design-system.md, and docs/cursor-design-review.md before making changes.
- Preserve owner-supplied facts without presenting them as independently audited. Track claim provenance, implementation status, and unresolved evidence explicitly.
- Accenture is incoming Summer 2027, never completed; no confirmed FDE assignment. No invented awards, publications, deployments, contact URLs, or resume dates.
- Server components by default; isolate ecosystem state in a small client boundary. SVG/layered DOM/CSS/optimized assets first; selective Three.js only with measurable visual benefit and acceptable performance.
- TypeScript strict, pnpm, ESLint, Tailwind, semantic HTML. No database/authentication/AI backend in the public launch.
- Run typecheck, lint, tests, and production build before requesting integration. Report actual results only. Validate M1 with real browser screenshots against the 60/25/15 references.
- No secrets, personal resume documents, reference images, or local attachment paths in public assets. Add approved assets only with provenance and permission.
- Use apply_patch for file edits. No inline code comments unless requested.
- Commit and push only on dedicated feature branches after assigned checks. No direct commits to `main`, merges, production deployments, or destructive operations without master-planner approval.

## Ownership

Integration lead owns docs/architecture.md, docs/design-system.md, docs/agent-briefs.md, docs/milestone-1-checklist.md, docs/verification.md, and docs/cursor-design-review.md after recording.
Claude owns application foundation continuity, typed content, tests, package/config files, CI, README, and supporting infrastructure for M1 fonts/content queries.
Cursor owns Milestone 1 visual implementation: homepage composition, ecosystem scene components, design tokens in CSS, and approved public visual assets with provenance.
No simultaneous edits to another owner's files. Dedicated worktrees/branches are required for parallel Claude and Cursor M1 work.

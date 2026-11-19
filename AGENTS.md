# Portfolio engineering protocol

This repository is Prince Mohapatra's portfolio source of truth.

- Current authorized scope: Milestone 0 only. Do not implement the homepage or other public content pages until architecture and visual direction receive owner approval.
- Read docs/architecture.md and docs/design-system.md before making changes.
- Preserve owner-supplied facts without presenting them as independently audited. Track claim provenance, implementation status, and unresolved evidence explicitly.
- Accenture is incoming Summer 2027, never completed; no confirmed FDE assignment. No invented awards, publications, deployments, contact URLs, or resume dates.
- Server components by default; isolate future ecosystem state in a small client boundary. SVG/layered DOM first, no WebGL initially.
- TypeScript strict, pnpm, ESLint, Tailwind, semantic HTML. No database/authentication/AI backend in the public launch.
- Run typecheck, lint, tests, and production build before integration. Report actual results only.
- No secrets, personal resume documents, reference images, or local attachment paths in public assets. Add approved assets only with provenance and permission.
- Use apply_patch for file edits. No inline code comments unless requested.

## Ownership

Integration lead owns docs/architecture.md, docs/design-system.md, docs/agent-briefs.md, docs/milestone-1-checklist.md, docs/verification.md.
Claude owns application foundation, typed content, tests, configuration, CI, and README.
Cursor owns docs/cursor-design-review.md only during Milestone 0 (capability audit and design review; no UI implementation).
No simultaneous edits to another owner's files. Dedicated worktrees are preferred; if unavailable, explicit disjoint file ownership is required.

# Branch and worktree plan

## Milestone 0 (complete)

- `feat/foundation`: Claude application foundation @ `9cd8e86`; design review recorded after owner approval.
- App-owned worktree isolation was initially rejected while this checkout lived only under the T3 Scratch project. The repository is now registered as T3 project `prince-portfolio` (`mcp:5803d432-0971-462a-9267-7203837caceb`) for Milestone 1 isolation.
- No merge to `main` without master-planner approval.

## Milestone 1 (authorized 2026-11-19)

Base all M1 branches from the latest `feat/foundation` (or `main` only after foundation is merged by master-planner). Prefer `t3_thread_launch` / `delegate_task` with worktree isolation against the registered `prince-portfolio` project.

| Branch | Owner | Scope | Dependency |
| --- | --- | --- | --- |
| `feat/m1-infra` | Claude | Local fonts + licenses, content helpers, tests, package/README infra notes | Approved docs + foundation |
| `feat/m1-homepage` | Cursor | Tokens/shell, editorial homepage sections, cinematic SVG/DOM ecosystem client island, approved assets | Approved docs + foundation; consume infra fonts when merged/rebased |
| `main` | Integration lead | Reviewed integration only | Master-planner approval |

If worktree isolation fails, serialize rather than parallel-edit shared files. Cursor owns `src/components/**`, homepage composition, and visual assets. Claude owns `src/content/**`, font packaging, tests, and config. Integration lead owns docs and final composition merge.

Prompts: `docs/agent-briefs.md`. Agents commit/push only their feature branches after checks. No direct `main` commits, merges, production deploys, or destructive git operations without master-planner approval.

# Archived Milestone 0 task prompts

Historical assignment snapshot. These were the exact task contracts used for the M0 delegation, including its read-only/shared-workspace adjustment. Current M1 authorization is recorded separately in architecture.md and agent-briefs.md.

# Exact agent task prompts and ownership

These prompts are self-contained assignments. Agents do not inherit the parent conversation. The architecture/design docs are proposals, not owner approval for M1.

## Claude Code — Milestone 0 foundation

You are the systems engineer for Prince Mohapatra's new public portfolio, repository princerm06/prince-portfolio. Work only on MILESTONE 0. Read AGENTS.md, docs/architecture.md, docs/design-system.md, docs/milestone-1-checklist.md. Do not implement the premium homepage, ecosystem, case-study pages, or other milestones. Integration lead owns approval and integration.

Own application source, typed content, tests, package/config files, README, .gitignore, and .github/workflows. Do not edit design/architecture/assignment docs. Initialize a minimal Next.js App Router + strict TypeScript + Tailwind + ESLint + pnpm app in this existing repo without overwriting documentation. Verify package versions via npm; local Node is 20.20.2, Next registry reported 16.4.6 during inspection. Pin pnpm exactly in packageManager, commit lockfile, align Node in .nvmrc/engines/CI. pnpm is not initially on PATH; corepack exists. Use npx pnpm or enable corepack as appropriate. Use apply_patch for edits.

Build only an accessible neutral foundation/status root page: honest identity, explicit Milestone 0 status and pending design review, real GitHub link, skip link, appropriate metadata/noindex. No premium M1 hero, mock project scene, or dead navigation. System fonts for now; no runtime external fonts, analytics, auth/database/AI packages. No default Next logos/favicon or stock branding. Avoid linking unimplemented routes. Use semantic landmarks and visible keyboard focus.

Create typed structured content with stable slugs, domains, summary, technologies, implementation status, claim/evidence provenance, metric contexts, limitations, optional URLs. Distinguish OWNER-SUPPLIED claims from independently verified evidence. Use honest unknown/review-required states, not invented completion levels. Identity: Prince Mohapatra, Purdue University, B.S. Computer Science + Artificial Intelligence, expected graduation 2028; Software Engineer | AI Builder | Undergraduate Researcher; philosophy 'BUILD WHAT PEOPLE CAN USE. BUILD FOR BETTER LIVING.' / 'Build useful things.' GitHub https://github.com/princerm06. LinkedIn, email, resume PDF unavailable: leave null, no guesses.

Record these owner-provided facts without extending them:

- AEGIS: AI Systems / Computer Vision / Autonomous Coordination; HackPrinceton 2026, four developers; emergency coordination with multi-camera perception, persistent tracking, floor mapping, responder assignment/operator approval/hardware. YOLO11 pose, stable actor identities, occlusion/freshness, floor calibration, FastAPI, OR-Tools, A*, dashboard, ElevenLabs, Arduino, ACK/DONE. 455 passing tests; functioning hardware/software demonstration. No prize placement claim; individual contributions not yet provided.
- Paradox: Developer Infrastructure / AI Engineering; Cal Hacks 13.0, October 2026, two developers across stack. Generate/execute/validate/compare/activate/restore alternative working-app implementations. React, TypeScript, React Flow, Python, FastAPI, SQLite, Factory Droid SDK, persistent branching timelines, isolated code/database snapshots, compilation/regression/boot/HTTP validation, controlled adoption/restoration. SDK-backed run: 26 passing tests, 6 successful validation checks. SEPARATE scripted NASA FIRMS demo: 1,198 observations, alternative regression models, Model B approximately 11% lower RMSE vs Original; NASA demo used scripted generation, NOT Factory Droid. No award.
- Synapse: Backend Systems / AI Retrieval; knowledge engine with Chrome extension capture/search. Python/FastAPI/PostgreSQL/pgvector; 384-dimensional embeddings, chunk-level cosine retrieval, duplicate-safe ingestion, Docker/GitHub Actions. Frozen 25-query benchmark: Hit Rate@5 0.840, Recall@5 0.840, MRR 0.820.
- Bettr: Full-Stack Product / Applied ML; cross-platform goals/routines/planning/progress; TypeScript/Next.js/React Native/Supabase/PostgreSQL/MiniLM/trained logistic classifier/Google Calendar; semantic log validation, priority-weighted progression, recurring plans, immutable completion records, calendar imports. 20+ users, owner-supplied.
- Blackbox: AI Research / Visual Memory; persistent visual memory under partial observability; tracked observations, provenance, uncertainty-aware reasoning. No calibrated probability, deployment, or publication claims; implementation status review-required.
- Autonomous Drone Mapping: Autonomous Systems / Robotics; simulation-first quadrotor exploration/mapping; PyBullet, ROS, SLAM, LiDAR, reinforcement learning/navigation. Completed vs assigned/in-progress work NOT known: explicitly review-required, not claimed complete.
- GeoAI: Applied ML / Geospatial Research; UNG IESA precipitation-frequency modeling, spatial validation, water-quality forecasting/geospatial ML. Precipitation spatial-block R² 0.9454; water-quality LSTM R² 0.957. Not live weather forecasting.
- CogniSpeech: Speech AI / Research Engineering; acoustic/temporal/lexical speech/transcript extraction, Python/Parselmouth/librosa/spaCy. Unknown dates/status left pending.
- Architectural Drift Benchmark: Software Engineering Research / AI Agents; whether coding agents preserve architectural invariants under developer pressure/long-horizon changes. Unknown results left pending.
- QForge: Hardware/ML Research; FPGA quantized neural-network accelerator/runtime research. No completed accelerator results; status review-required.

Experience: confirmed incoming Accenture Technology Summer Analyst, Summer 2027, NOT completed and no FDE placement. UNG IESA AI Research Internship, CogniSpeech research engineering, Autonomous Drone Mapping / ML@Purdue mentioned by owner, but exact resume titles/dates are missing: mark pending; do not invent. Never infer public email from git configuration.

Set up Vitest tests for uniqueness, featured ordering (AEGIS, Paradox, Synapse, Bettr), evidence/provenance and Paradox demo separation, incoming role status, unresolved contact fields. Add CI on pull requests and main pushes: frozen install, typecheck, lint, tests, production build. CI permissions contents:read, no secrets required. Document setup, structure, commands, known missing evidence, and M1 approval gate in README. Add .env.example only if actual variables are needed (otherwise document none).

Acceptance: run typecheck/lint/tests/build, inspect your diff, commit your owned work, and return commit SHA, commands/results, file summary and unresolved issues. Do not push or create a PR; integration lead reviews and pushes. Stop at M0. Do not claim checks not run. Report real capabilities/tool failures rather than improvising agent access.

## Cursor + Figma MCP — Milestone 0 design review only

You are design implementation lead for Prince Mohapatra's engineering portfolio, but THIS assignment is a READ-ONLY CAPABILITY AUDIT plus DESIGN REVIEW, not implementation. Read AGENTS.md, docs/architecture.md, docs/design-system.md and docs/milestone-1-checklist.md. You own only docs/cursor-design-review.md. Do not modify source, package files, any other docs, branches or external Figma files. Do not create UI, a Figma design, or claim owner approval. Milestone 1 is explicitly blocked on owner architecture/design review.

First inspect actual tools available to your Cursor runtime, especially Figma MCP. Name exact tools observed. Provider/model availability is not proof of MCP access. If Figma cannot be enumerated, report 'not verified/unavailable in this delegated runtime'; do not pretend it exists. If standalone Cursor is required, document a precise handoff: open this repo in Figma-enabled Cursor, verify Figma MCP resource access, ask for a Figma file URL/permission if needed, create desktop/mobile design frames only after owner approval, then implement in dedicated worktree/branch and return a commit for integration. Never ask for secret tokens in chat.

Reference hierarchy: 60% cinematic Purdue-inspired engineering portfolio, 25% Zed editorial restraint, 15% isometric interaction. The three local reference files are available to inspect if your tools can access them; report whether you actually viewed each. Do not copy them into the public repo:

1. Futuristic AI Portfolio Interface (1).png (cinematic primary)
2. ChatGPT Image Nov 18, 2026, 11_48_58 PM.png (Zed secondary)
3. ChatGPT Image Nov 18, 2026, 11_49_02 PM.png (isometric tertiary)

Private local attachment paths are supplied at delegation time, not retained as asset URLs in the public repository.

Identity: software engineer / AI builder / undergraduate researcher, not designer/freelancer. Name Prince Mohapatra; Purdue University CS+AI, graduation expected 2028. Incoming Accenture Technology Summer Analyst Summer 2027, no FDE assignment. Philosophy Build useful things. Preserve oversized serif identity, mono labels, dark architectural depth, restrained amber/blue. Make AEGIS (emergency perception/coordination) and Paradox (branching executable application timelines) flagship worlds; Synapse retrieval, Bettr growth, Research terrain complete five-world scene. No fake screenshots, awards, arbitrary performance claims, or static AI image pretending to be interactive.

Review proposal with concrete refinements: token contrast risks, typography/licensing, hero spatial layout, SVG/DOM layering, responsive fallback, keyboard/touch/reduced-motion behavior, client/server boundaries, nonblocking asset strategy, and M1 acceptance criteria. No implementation. Record Figma status and image inspection status honestly in docs/cursor-design-review.md; do not include private attachment paths in the report. Commit only that report and return SHA, tool evidence, concerns, and exact follow-up handoff instructions. Do not push/create PR. Use apply_patch. Stop at the review gate.

## Runtime adjustment for this scratch project

T3 rejected worktree isolation because its parent project root is the scratch directory rather than this repository. The integration lead creates feat/foundation before Claude starts. Claude is the sole code writer. Cursor runs concurrently in strictly read-only mode, returns its review text, and does NOT write/commit the report; the integration lead records it after Claude finishes. This overrides the report-writing/commit instruction above for this run. Parent makes no repository writes while Claude is working. This explicit ownership prevents conflicting shared edits without claiming unsupported worktree isolation. Future milestones should register/use the actual repository project before requesting app-owned isolated worktrees.

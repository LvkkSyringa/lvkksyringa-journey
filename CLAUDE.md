# Fengqiao World Agent Rules

This file is the project-local source of truth for agents. `AGENTS.md` only points here.

## Start Here

1. Read `HANDOFF.md` for the exact current state, next action, blockers, and owner questions.
2. Read `docs/ENVIRONMENT.md` before installing dependencies or assuming local paths.
3. Read `docs/DECISIONS.md` before changing visuals, portfolio claims, assets, or ingest behavior.
4. Use `docs/next-handoff.md` for the detailed current UI and proposed photo-ingest specification.

## Repository Boundary

- The Git/project root is this `fengqiao-world` directory, not its parent `Elysiae` directory.
- Run Git, npm, build, and search commands from this directory.
- Exclude `.git/`, `.next/`, and `node_modules/` from broad source audits.

## Sources of Truth

- `src/data/works.ts`: canonical portfolio work entries and metadata.
- `src/data/exif.json`: legacy/intermediate data from the original 102-photo import; do not add new creative fields here.
- `scripts/ingest-photo.mjs`: preview-first photo conversion, EXIF mapping, collision checks, and apply workflow.
- `src/data/photo-ingest-history.json`: hashes of originals already applied by the ingest script.
- `public/images/`: the 116 photography web JPGs referenced by `works.ts` after the September 2026 batch.
- `public/logos/` and `public/avatar1.jpg`: tracked portfolio assets.
- `src/components/StarChart/StarChart.tsx`: star-map rendering and interaction.
- `src/app/page.tsx`: `welcome -> entering -> starchart` experience flow and work selection.

## Guardrails

- Begin implementation work with a read-only pass over the affected source and current Git status.
- Preserve the quiet, poetic, glass-and-starlight identity. Improve meaning, clarity, affordance, or responsive stability; avoid turning the site into a heavy VFX demo.
- Keep the approved purple geometric About black hole. Do not revive the rejected warm cinematic/Interstellar-like version without fresh owner approval.
- Preserve supplied portfolio facts and authorship boundaries. Do not invent impact, users, deployment results, feedback, or creative ownership.
- Do not edit existing photo entries or replace original tracked images during ingest experiments. Use copies and show a preview before applying data changes.
- Keep `public/incoming/photos/metadata.json` and incoming originals local. Commit only processed web JPGs, updated portfolio data, and ingest history.
- When a display PNG/JPG has no useful EXIF, set its per-file `exifSource` to the matching original RAW. Use `skipExif: true` only for intentional no-EXIF works such as composites.
- A successful build is not browser or visual acceptance. Report build, lint, HTTP, browser, and human visual checks separately.

## Commands

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run lint
.\dev.bat
```

The current machine-specific tool paths, versions, known lint baseline, and ignored-file recovery commands are documented in `docs/ENVIRONMENT.md`.

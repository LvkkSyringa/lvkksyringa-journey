# Fengqiao World Handoff

Verified against the repository on 2026-08-18.

## What This Project Is

Fengqiao World is LvkkSyringa's single-page, interactive portfolio built with Next.js 16 and React 19. A WebGL welcome scene leads into a Canvas star chart containing Photography, Game Design, and the central About experience. Selecting a work opens a glass detail card.

The Git root is this directory. The parent `Elysiae` directory is only a local container and is not the website repository.

## Exact Current State

- Branch: `main`, tracking `origin/main`.
- Remote: `https://github.com/LvkkSyringa/lvkksyringa-journey.git`, verified from local Git configuration.
- Product baseline before this continuity sync: commit `aea7f95` (`Update portfolio visuals and game entries`), also present at `origin/main` when checked.
- Other work: no additional local branch, stash, or linked worktree was found.
- Experience flow: `src/app/page.tsx` uses `welcome -> entering -> starchart`; a selected work opens `GlassCard`.
- Portfolio data: `src/data/works.ts` contains 102 unique photo entries and 5 unique game entries.
- Asset consistency: all 107 work image/logo references resolve to tracked files; `public/images/` contains 102 files.
- Star chart: Photography is an aperture/lens constellation; Game Design is a branched interaction graph; the background has far/mid/near star layers; the About entrance uses the approved purple geometric black hole.
- Responsive implementation exists for the star-chart hints, About cards, and internally scrolling work card. This has been verified in source, not visually re-accepted on every target display during this sync.
- Repository integrity documentation is now local: `CLAUDE.md`, this file, `docs/ENVIRONMENT.md`, `docs/DECISIONS.md`, and `docs/next-handoff.md`.
- Last-known public deployment: `https://lvkksyringa.vercel.app/`. It returned HTTP 200 on 2026-07-18, but live verification on 2026-08-18 was not completed because the available network check failed at SSL setup; treat deployment health as unverified until opened in a real browser or Vercel dashboard.

## Work in Progress and Partial Work

There is no half-edited product feature and no unmerged product branch.

One planned feature is specified but has no implementation: the photo-ingest pipeline in `docs/next-handoff.md`. There is currently no `ingest:photo` package script, ingest source file, or Sharp/HEIC/EXIF dependency in `package.json`. Treat the specification as a proposal, not an existing capability.

No ignored, irreplaceable source asset was found. The large ignored directories are generated dependencies/build output and are documented in `docs/ENVIRONMENT.md`.

## Next Concrete Action

After restoring the directory on another machine, establish a trustworthy baseline before product work:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run lint
.\dev.bat
```

Then manually inspect `http://localhost:3000` in this order: welcome screen, main star chart, each constellation, About, one photo card, and one long game card. Record browser, viewport, and any visual failure; do not infer visual acceptance from the build.

The next recommended product task is the photo-ingest pipeline because its behavior is already specified and it removes repeated manual work. It is blocked on the owner answers below. Once approved and sample copies are available, the first implementation action is to select and pin the image/HEIC/EXIF packages, add an `ingest:photo` script, and make its first run preview-only; it must not edit `src/data/works.ts` until explicit confirmation.

## Waiting for the Owner

1. **Which product task comes next?** Recommendation: photo ingest before a Reviewer Path, because ingest has detailed requirements and supports recurring photo updates. A curated Reviewer Path is still viable later; a random three-photo feature is not recommended.
2. **Can you provide disposable sample copies?** Recommendation: one representative HEIC and one JPEG from the cameras/phones you actually use, including an iPhone image whose lens label and 35 mm equivalent differ. This is needed to verify metadata mapping without touching originals.
3. **How should ingest application work?** Recommendation: default dry-run preview, then an explicit `--apply` step that writes the converted JPG and updates `works.ts`; never overwrite an existing ID or image silently.
4. **Who performs final visual acceptance after restore?** Recommendation: you inspect the 4K desktop and the 2.5K laptop at normal and 125% browser zoom; the agent records browser checks but does not claim human aesthetic approval.
5. **What exactly will the cloud backup contain?** Recommendation: ensure this entire Git-root directory, including its hidden `.git` directory, is included. The parent `Elysiae` folder is not required to build the website.

## Verification Status

The final pre-repair verification results for build, lint, Git state, and documentation checks belong at the bottom of `docs/ENVIRONMENT.md`. If a restored-machine result differs, append a dated result there rather than overwriting the 2026-08-18 evidence.

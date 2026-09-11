# Fengqiao World Handoff

Verified against the repository on 2026-09-11.

## What This Project Is

Fengqiao World is LvkkSyringa's single-page, interactive portfolio built with Next.js 16 and React 19. A WebGL welcome scene leads into a Canvas star chart containing Photography, Game Design, and the central About experience. Selecting a work opens a glass detail card.

The Git root is this directory. The parent `Elysiae` directory is only a local container and is not the website repository.

## Exact Current State

- Branch: `main`, tracking `origin/main`.
- Remote: `https://github.com/LvkkSyringa/lvkksyringa-journey.git`, verified from local Git configuration.
- Product baseline before this continuity sync: commit `aea7f95` (`Update portfolio visuals and game entries`), also present at `origin/main` when checked.
- Other work: no additional local branch, stash, or linked worktree was found.
- Experience flow: `src/app/page.tsx` uses `welcome -> entering -> starchart`; a selected work opens `GlassCard`.
- Portfolio data: `src/data/works.ts` contains 116 unique photo entries and 5 unique game entries.
- Asset consistency: all 121 work image/logo references resolve to files; `public/images/` contains 116 files.
- Star chart: Photography is an aperture/lens constellation; Game Design is a branched interaction graph; the background has far/mid/near star layers; the About entrance uses the approved purple geometric black hole.
- Responsive implementation exists for the star-chart hints, About cards, and internally scrolling work card. This has been verified in source, not visually re-accepted on every target display during this sync.
- Repository integrity documentation is now local: `CLAUDE.md`, this file, `docs/ENVIRONMENT.md`, `docs/DECISIONS.md`, and `docs/next-handoff.md`.
- Photo ingest is implemented in `scripts/ingest-photo.mjs`. It defaults to a read-only preview, reads original EXIF, maps iPhone focal length from 35 mm equivalent data, converts applied files to JPG through Sharp, blocks unresolved metadata and collisions, and records original hashes in `src/data/photo-ingest-history.json`.
- `public/incoming/photos/` contains the ignored source copies for the completed 14-work batch: 3 edited camera PNGs, 10 iPhone HEIC files, and 1 intentional no-EXIF composite JPG. The ignored `metadata.json` contains the owner's final title, location, tag, and composite-date choices.
- The 3 PNGs read EXIF from matching `DSC00047/64/68.ARW` files in `D:\Creation\ArtWorks\Images\RAW\20260905`. All matched exactly and returned camera, lens, exposure, ISO, date, and focal data.
- The 10 iPhone files expose 35 mm equivalent focal lengths. Preview uses those values rather than physical focal lengths; `IMG_9780.HEIC` correctly resolves to `Lens: Tele 100mm` and `Focal: 200mm`.
- `galaxy.jpg` was applied with `skipExif: true`, date `2026-09-06`, plus manual `Sony ILCE-7M4` and `FE 20-70mm F4 G` fields. Photo dates now render even when no metadata object exists.
- Last-known public deployment: `https://lvkksyringa.vercel.app/`. It returned HTTP 200 on 2026-07-18, but live verification on 2026-08-18 was not completed because the available network check failed at SSL setup; treat deployment health as unverified until opened in a real browser or Vercel dashboard.

## Work in Progress and Partial Work

The photo-ingest implementation has now been exercised with real iPhone HEIC and Sony ARW data. All 14 new works were applied locally on 2026-09-11. Eight explicit empty titles were preserved as intentional untitled works.

The 14 upload JPGs total 1,755,119 bytes versus 112,764,429 bytes for the incoming source copies, a reduction of about 98.4 percent. Every output is JPEG and fits inside 1920x1280. The source copies and local metadata remain ignored and untouched.

For the September batch, Sony camera values use the established `Sony ILCE-7M4` form. Non-empty bilingual titles use English first, one space, then Chinese; eight intentional empty titles remain unchanged.

Photography works are sorted by their `photo-YYYYMMDDN` IDs before they are exposed to the UI, so the website remains in ascending capture-date order even when an incoming batch is scanned by filename.

The repository had no uncommitted changes before this implementation. Local `main` began one documentation commit ahead of `origin/main` (`aadd51f`); the current ingest work is intentionally uncommitted until the first real batch is reviewed.

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

The next concrete action is browser/owner visual review of the 14 new photo cards, followed by a scoped commit and push only after approval. Production build, script-only ESLint, data integrity, dimensions, compression, and duplicate-skip checks passed locally.

## Waiting for the Owner

1. **Do the 14 new photo cards look correct in the browser?** Confirm image orientation/crop, titles, locations, tags, dates, and technical metadata before release.
2. **Should the completed local batch be committed and pushed to `main`?** The ignored source originals and metadata file will not be included.
3. **Who performs final visual acceptance?** Recommendation: the owner inspects the updated constellation and cards on the 4K desktop and 2.5K laptop at normal and 125% browser zoom.

## Verification Status

The final pre-repair verification results for build, lint, Git state, and documentation checks belong at the bottom of `docs/ENVIRONMENT.md`. If a restored-machine result differs, append a dated result there rather than overwriting the 2026-08-18 evidence.

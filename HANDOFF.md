# Fengqiao World Handoff

Verified against source, Git, and the production deployment on 2026-09-12.

## What This Project Is

Fengqiao World is LvkkSyringa's single-page, interactive portfolio built with Next.js 16 and React 19. A WebGL welcome scene leads into a Canvas star chart containing Photography, Game Design, and the central About experience. Selecting a work opens a desktop-focused three-card glass carousel.

The Git root is this directory. The parent `Elysiae` directory is only a local container and is not the website repository.

## Exact Current State

- Branch: `main`, tracking `origin/main` with no uncommitted changes at this verification point.
- Remote: `https://github.com/LvkkSyringa/lvkksyringa-journey.git`.
- Current product implementation commit: `9317383` (`Add preloaded 3D work carousel`), verified in the `main` history and deployed before this documentation sync.
- Production: `https://lvkksyringa.vercel.app/`. Vercel reported the `9317383` Production deployment successful and the production URL returned HTTP 200 on 2026-09-12.
- Experience flow: `src/app/page.tsx` uses `welcome -> entering -> starchart`; a selected work opens `GlassCard`.
- Portfolio data: `src/data/works.ts` contains 116 unique photo entries and 5 unique game entries. All 121 work image/logo references resolve; `public/images/` contains 116 files.
- `src/data/works.ts` is the runtime source of truth. `src/data/exif.json` remains legacy/intermediate data from the original import and does not drive the website.
- Photography works are sorted by `photo-YYYYMMDDN`, preserving ascending capture-date order and stable same-day sequence order.
- Star chart: Photography is an aperture/lens constellation; Game Design is a branched interaction graph; the background has far/mid/near star layers; About uses the approved purple geometric black hole.
- The Canvas DPR is capped at 2, and backing-store sizing happens when the render effect is established rather than on every animation frame. The starfield and black hole continue animating behind an open work viewer and respond to viewport-size changes.
- Work viewer: the active card is centered, with the immediately previous and next works staged as dimmed 3D glass cards. Side-card clicks, arrow buttons, and keyboard arrows navigate; Escape closes full-screen imagery first, then the viewer.
- Image loading: the active image is requested at high priority through `next/image`; after it resolves, immediate neighbors warm at 1920 px. Second neighbors warm at 640 px during idle time unless Save-Data or a 2G-class connection is reported.
- A 16 px frosted backdrop improves text separation without freezing the animated background. The owner visually reviewed the deployed result and accepted it on 2026-09-12.
- Photo ingest is implemented in `scripts/ingest-photo.mjs`: preview is read-only, `--apply` is the write boundary, iPhone focal length prefers 35 mm equivalent data, RAW files can provide EXIF for edited display images, and applied web files are non-enlarged 1920x1280 quality-75 MozJPEGs.
- The completed 14-work September 2026 batch is included in production. Its outputs total 1,755,119 bytes versus 112,764,429 bytes for the local source copies, a reduction of about 98.4 percent.
- The two `Circle of Life` titles are synchronized in both legacy `exif.json` and canonical `works.ts` with one space between English and Chinese.

## Current Work and Blockers

There is no active implementation task or known release blocker. The 3D carousel/preload pass and the photo batch are committed, pushed, deployed, and owner-accepted.

The repository-wide lint command still has the pre-existing Aurora/Strands baseline described in `docs/ENVIRONMENT.md`; the files changed for the carousel pass lint cleanly. Do not describe the whole repository as lint-clean until those unrelated baseline errors are fixed.

## Next Concrete Action

No action is required until the owner supplies another batch or requests another visual pass. For a new session, establish the baseline with:

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run lint
.\dev.bat
```

Treat the expected repository-wide lint baseline separately from new errors. For visual changes, manually inspect the welcome screen, main star chart, each constellation, About, a photo carousel sequence, one long game card, full-screen imagery, and live resizing while the viewer is open.

## Owner Decisions Already Settled

- The site targets desktop/laptop presentation; phone adaptation is not a current requirement.
- Keep the star chart animated behind the frosted work-viewer backdrop so live resizing remains coherent.
- Keep the approved purple geometric About black hole; do not revive the rejected warm cinematic version without fresh approval.
- Preserve the three-card 3D carousel and staged preload strategy as the current accepted baseline.

## Verification Status

Detailed dated build, lint, data-integrity, compression, Git, and deployment evidence is maintained at the bottom of `docs/ENVIRONMENT.md`. Keep build/static/HTTP evidence distinct from browser and owner visual acceptance.

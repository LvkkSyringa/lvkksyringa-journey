# Fengqiao World

Personal portfolio site for LvkkSyringa, built with Next.js. The experience is structured as an interactive star chart that connects photography, game design works, and an about section.

## Local Development

From `cmd.exe`:

```bat
dev.bat
```

From PowerShell:

```powershell
.\dev.bat
```

Open `http://localhost:3000` after the terminal shows `Ready`.

## Build

```bat
npm.cmd run build
```

## Add Photography Works

1. Put disposable copies of `.heic`, `.jpg`, `.jpeg`, or `.png` originals in `public/incoming/photos/`.
2. Copy `metadata.example.json` to the ignored local file `metadata.json`, then add the owner-controlled title, location, and tags for each filename. Do not add new works to the legacy `src/data/exif.json`.
   - Keep `"title": ""` when a work is deliberately untitled; omitting the `title` field is treated as unresolved.
   - Set `exifSource` when the displayed PNG/JPG should read metadata from a matching RAW file.
   - Set `skipExif: true` and provide `date` for an intentional no-EXIF composite. Optional manual fields such as `camera` and `lens` are still displayed.
3. Preview EXIF mapping, generated IDs, and missing fields without changing the portfolio:

```powershell
npm.cmd run ingest:photo
```

4. After reviewing the preview, apply the batch explicitly:

```powershell
npm.cmd run ingest:photo -- --apply
```

Apply converts each image to a non-enlarged JPG inside 1920x1280 at quality 75, appends resolved entries to `src/data/works.ts`, and records original hashes so the same source is not imported twice. Incoming originals remain untouched.

## Project Map

- `src/app/page.tsx` - main experience flow and selected work state.
- `src/components/StarChart/StarChart.tsx` - canvas star map, constellations, black hole, click/hover logic.
- `src/components/GlassCard/GlassCard.tsx` - preloaded three-card 3D work viewer and full-image view.
- `src/components/AboutPanel.tsx` - about view cards.
- `src/data/works.ts` - photography and game portfolio data.
- `scripts/ingest-photo.mjs` - preview-first photo import and conversion workflow.
- `src/data/photo-ingest-history.json` - duplicate-import protection for applied originals.
- `public/images/` - photography images.
- `public/logos/` - game and profile visual assets.

## Portfolio Content

- Photography: 116 works in `public/images/`; 115 display camera/phone EXIF and one intentional composite omits EXIF.
- Game Design: Vafi, Infinity, Safe Harbor, What's Under the Mask?, and After Light.
- `src/data/works.ts` is the canonical portfolio-data source; use paragraph breaks (`\n\n`) for longer work descriptions.
- `src/data/exif.json` is retained only as legacy/intermediate import data; edits there do not update the live site unless canonical `works.ts` is also updated.

## Handoff Notes

For the current implementation state and constraints, read:

- `HANDOFF.md`
- `docs/next-handoff.md`

Recovery and decision references:

- `docs/ENVIRONMENT.md`
- `docs/DECISIONS.md`

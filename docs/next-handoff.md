# Fengqiao World Handoff

For active status, the exact next action, blockers, and owner questions, read the repository-root `HANDOFF.md`. This file is the detailed implementation and photo-ingest reference.

This document records the portfolio site's current structure, verified implementation constraints, and the implemented photo-ingest workflow.

## Project Snapshot

- Framework: Next.js 16 App Router, React 19, Tailwind CSS, Framer Motion.
- Main route: `src/app/page.tsx`.
- Star map: `src/components/StarChart/StarChart.tsx`.
- Work detail modal: `src/components/GlassCard/GlassCard.tsx`.
- About view: `src/components/AboutPanel.tsx`.
- Work data: `src/data/works.ts`.
- Static assets:
  - Photos: `public/images/`.
  - Game logos: `public/logos/`.
- Local dev command from `cmd.exe`:

```bat
dev.bat
```

From PowerShell:

```powershell
.\dev.bat
```

`dev.bat` runs `npm run dev`, which starts `next dev` at `http://localhost:3000`.

## Current Implementation

### StarChart

File: `src/components/StarChart/StarChart.tsx`

- Added `isWorkOpen?: boolean` to `StarChartProps`.
- `src/app/page.tsx` now passes `isWorkOpen={selectedWork !== null}`.
- Bottom guidance text behaves as intended:
  - Main view: `Click a constellation to explore works.`
  - Constellation view: `Click a glowing star to view a work.`
  - When a work detail card is open, the constellation bottom hint is hidden.
- Top tag filters must remain visible while a work detail card is open.
- Back button z-index was raised so it remains clickable in smaller responsive layouts.
- Camera zoom is clamped for better cross-screen composition:
  - Main map zoom is clamped after fitting the map to the viewport.
  - About/center zoom is clamped.
  - Constellation zoom is clamped and uses wider padding on narrow screens.
- Main-view label font size and label offset are responsive.
- Constellation symbolism is implemented:
  - `Photography` uses a double-ring aperture / lens skeleton.
  - `Game Design` uses a branched interaction-map skeleton with core, choice, feedback, and outcome nodes.
- The starfield now has far, mid, and near layers. Near stars drift subtly and use restrained cool / purple / pink accents.
- Main-view hover brightens the relevant constellation, stars, and label without drawing a surrounding ellipse.
- The About entrance uses the original purple geometric black-hole design. Do not restart a cinematic / Interstellar-style black-hole redesign without a new approved visual direction; a prior attempt was explicitly rejected.
- Canvas DPR is capped at 2. Canvas backing-store dimensions are updated when the render effect is established after viewport/state changes rather than on every animation frame.
- Opening a work viewer hides the bottom constellation hint but does not pause the starfield or black-hole animation. The live Canvas continues to respond to viewport-size changes behind the frosted backdrop.

### GlassCard

File: `src/components/GlassCard/GlassCard.tsx`

- The desktop work viewer presents the previous, active, and next works in a perspective stage. The active card is centered; adjacent cards sit dimmed and rotated on either side.
- Side-card clicks, fixed arrow buttons, and keyboard ArrowLeft/ArrowRight navigate. Escape closes full-screen imagery first and then the viewer.
- Framer Motion spring variants animate cards through `left`, `center`, `right`, `enter`, and `exit` positions.
- A frosted modal backdrop uses blur, reduced brightness, and restrained purple illumination while leaving the Canvas animation live underneath.
- The active card scrolls internally for long content; side-card content is non-interactive until selected. Visual scrollbars remain hidden.
- Images use `next/image`. Photo clicks open a full-screen contained image; game logos remain contained inside a shorter media region.
- Preloading is staged rather than gallery-wide:
  - Active image: optimized 1920 px request at high priority.
  - Immediate previous/next: optimized 1920 px warmup after the active image resolves.
  - Second previous/next: 640 px warmup during browser idle time.
  - Second-neighbor warmup is skipped when Save-Data is active or the reported connection is `slow-2g`/`2g`.
- Photo/game descriptions support paragraph breaks through `whitespace-pre-line`.
- Standard metadata stays in full-width rows. Compact exposure metadata uses two columns for `Aperture`, `Shutter`, `ISO`, and `Focal`; long values wrap naturally.

### AboutPanel

Files:

- `src/components/AboutPanel.tsx`
- `src/app/globals.css`

- Added class hooks:
  - `about-panel`
  - `about-panel-inner`
  - `about-card`
- On compact screens or short windows, the About layout becomes a vertical card flow.
- Scrolling remains available, but visual scrollbars are hidden.

### Global CSS

File: `src/app/globals.css`

Reusable classes:

- `.glass-hint`
- `.hide-scrollbar`
- `.work-modal-shell`
- `.work-modal-backdrop`
- `.work-carousel-stage`
- `.work-carousel-card`
- `.work-carousel-surface`
- `.work-card-scroll`
- `.carousel-nav`

Responsive rules cover:

- Hiding right-side star notes on smaller or shorter viewports.
- About-panel vertical layout.
- Compact glass tags.
- Short-height desktop work-card media and carousel height.

## Photo Ingest Pipeline

Implemented in `scripts/ingest-photo.mjs`. The user can now add small batches without manually resizing images or editing the photo array by hand.

User workflow:

```bat
npm.cmd run ingest:photo
```

Recommended input folder:

- `public/incoming/photos/`

Recommended output folder:

- `public/images/`

Local metadata file:

- Copy `public/incoming/photos/metadata.example.json` to `public/incoming/photos/metadata.json`.
- The local `metadata.json` and all incoming originals are ignored by Git.
- Entries are keyed by the exact source filename; filename lookup is case-insensitive.
- `title`, `location`, and `tags` belong here, not in the legacy `src/data/exif.json`.
- `exifSource` may point to a matching RAW while the displayed PNG/JPG remains the conversion input.
- `skipExif: true` bypasses EXIF parsing; provide `date` explicitly so the script can generate `photo-YYYYMMDDN`. Optional manual fields such as `camera` and `lens` are still included.

Implemented behavior:

1. Scan incoming image files.
2. Support `.heic`, `.jpg`, `.jpeg`, and `.png` inputs.
3. Read EXIF from the original file before conversion or compression.
4. Convert every web image output to `.jpg`.
5. Compress with Sharp:

```js
sharp(input)
  .resize(1920, 1280, { fit: "inside", withoutEnlargement: true })
  .jpeg({ quality: 75, mozjpeg: true })
  .toFile(outputPath)
```

6. For HEIC:
   - Use `heic-convert` to create a JPEG buffer first.
   - Pass the buffer through the same Sharp resize/compress pipeline.
7. Generate a new `Work` entry with:
   - `id`
   - `title`
   - `description` or location
   - `tags`
   - `image`
   - metadata fields
8. Ask the user for missing or ambiguous creative fields:
   - title
   - location
   - tags
   - lens name when EXIF is missing or unreliable
   - focal length when 35mm equivalent cannot be inferred
9. Show a preview and request confirmation before editing `src/data/works.ts`.
10. Reject `--apply` while any required field is unresolved.
11. Refuse existing work IDs and output image paths rather than overwriting them.
12. Record the original SHA-256 in `src/data/photo-ingest-history.json` so repeated batches are skipped safely.
13. Leave all incoming originals untouched after apply.
14. Keep EXIF input and display-image input separate when `exifSource` is configured.
15. For `skipExif: true`, require only date and creative fields; include only manually supplied Camera/Lens/exposure metadata.

### EXIF Mapping Rules

For non-iPhone cameras:

- `Camera`: camera model from EXIF.
- `Lens`: prefer EXIF `LensModel`; ask the user if missing.
- `Focal`: use physical `FocalLength`.

For iPhone photos:

- `Focal` must prioritize 35mm equivalent focal length, not physical focal length.
- Prefer EXIF `FocalLengthIn35mmFormat`.
- If that is unavailable, infer from other available focal data only when confidence is high.
- If still unclear, ask the user.

Existing iPhone lens naming conventions in `works.ts`:

- `Ultra Wide 14mm`
- `Main 24mm`
- `Main 48mm`
- `Tele 100mm`

Important nuance:

- For iPhone, `Lens` and `Focal` can differ.
- Example pattern already present: `Lens: Tele 100mm`, `Focal: 200mm`.
- This can represent digital crop or an equivalent viewing field. Do not force `Lens` and `Focal` to match.

Recommended metadata field mapping:

- `Date`
  - Currently derived by the UI from the `photo-YYYYMMDDN` id.
- `Camera`
- `Lens`
- `Aperture`
- `Shutter`
- `ISO`
- `Focal`

## Design Guardrails

- Preserve the existing poetic, quiet, glass-and-starlight tone.
- Do not turn the site into a heavy sci-fi VFX demo.
- Keep the first screen as the actual experience, not a landing page.
- Treat the site as a desktop/laptop portfolio. Phone adaptation is not currently required.
- Any visual upgrade should improve:
  - reviewer clarity
  - symbolic meaning
  - interaction affordance
  - cross-screen stability
- Test compact windows before accepting a visual pass:
  - 4K desktop and 2.5K laptop displays
  - narrow browser window
  - short-height viewport
  - browser zoom around 125 percent
  - live viewport resizing while a work viewer is open

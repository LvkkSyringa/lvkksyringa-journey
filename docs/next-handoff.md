# Fengqiao World Handoff

Last updated: 2026-07-18

This document is a handoff note for the next coding session. It records the current portfolio site structure, the local changes made in the recent work session, and the recommended next visual and workflow upgrades.

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
cd /d D:\Creation\OtherFiles\Elysiae\fengqiao-world
dev.bat
```

From PowerShell:

```powershell
Set-Location "D:\Creation\OtherFiles\Elysiae\fengqiao-world"
.\dev.bat
```

`dev.bat` runs `npm run dev`, which starts `next dev` at `http://localhost:3000`.

## Current Working Tree Notes

Known intended local changes at the time of this handoff:

- `public/logos/whatsunderthemask.png` is a user-side asset update. Do not revert it.
- `public/logos/infinity.png` is an intended Infinity game-logo asset and is referenced by `src/data/works.ts`. Do not delete it.
- Several UI and data files are modified from the last committed state:
  - `src/app/globals.css`
  - `src/app/page.tsx`
  - `src/components/AboutPanel.tsx`
  - `src/components/GlassCard/GlassCard.tsx`
  - `src/components/StarChart/StarChart.tsx`
  - `src/data/works.ts`
- `docs/next-handoff.md` is the current handoff document and is untracked until the user chooses to commit it.

Validation performed during the session:

- `npm.cmd run build` passed after the UI and content changes.
- `npm.cmd run lint` is not currently clean because of pre-existing `Aurora.tsx` / `Strands.tsx` ref-during-render errors and one `prefer-const` issue. Those files were not changed in this session.
- Next.js still warns about multiple `package-lock.json` files:
  - `D:\Creation\OtherFiles\Elysiae\package-lock.json`
  - `D:\Creation\OtherFiles\Elysiae\fengqiao-world\package-lock.json`
  This warning does not currently block local preview or production build.

## Recent UI Changes

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

### GlassCard

File: `src/components/GlassCard/GlassCard.tsx`

- Work detail modal is now structured as:
  - `work-modal-shell`
  - `work-card-frame`
  - `work-card-scroll`
- The card stays inside a safe viewport area and scrolls internally when content is long.
- Scrollbars are hidden while scroll behavior remains available.
- Photo/game descriptions support paragraph breaks through `whitespace-pre-line`.
- Metadata rendering was split:
  - Standard metadata stays as full-width rows.
  - Compact photo exposure metadata uses two columns: `Aperture`, `Shutter`, `ISO`, `Focal`.
- First-column compact metadata values align with the value column used by `Date`, `Camera`, and `Lens`.
- Long metadata values, especially `Innovation`, wrap naturally in the value column.

### AboutPanel

Files:

- `src/components/AboutPanel.tsx`
- `src/app/globals.css`

Changes:

- Added class hooks:
  - `about-panel`
  - `about-panel-inner`
  - `about-card`
- On compact screens or short windows, the About layout becomes a vertical card flow.
- Scrolling remains available, but visual scrollbars are hidden.

### Global CSS

File: `src/app/globals.css`

Added reusable classes:

- `.glass-hint`
- `.hide-scrollbar`
- `.work-modal-shell`
- `.work-card-frame`
- `.work-card-scroll`

Added responsive rules for:

- Hiding right-side star notes on smaller or shorter viewports.
- About-panel vertical layout.
- Compact glass tags.
- Compact work-card media height.

## Recent Game Content Changes

File: `src/data/works.ts`

### Vafi

Current description:

- `Vafi is a first-person exploration puzzle game about perception, uncertainty, and finding color in a grayscale world.`
- The second paragraph explains its fading flashlight, shifting maze, perspective puzzles, and restoration of color.

Current metadata:

- `Engine`: `Godot`
- `Role`: `Solo developer - design, writing, code, art`
- `Innovation`: Explains "mechanic as theme":
  - Full-screen monochrome filter.
  - Only the flashlight-lit center area shows original color.
  - Three puzzles use RGB colors that become close to gray walls under BT.601 grayscale conversion.
  - Solving the final puzzle restores color to the world, expressing a wish for visually impaired players.

### What's Under the Mask?

Current description is a three-paragraph English description:

- It is a short 2D memory puzzle game about seeing, hiding, and remembering.
- The player moves a mask to reveal hidden colors beneath blocks.
- Later stages limit mask time.
- Endless Mode drains HP while the player searches for pairs.
- The player can clear matrices, chase Perfect Memory, or challenge rising drain speed in Endless Mode.

Current metadata:

- `Engine`: `Godot`
- `Role`: `Solo developer - design, writing, code, art`
- `Innovation`: Explains:
  - It was created for Global Game Jam 2026 under the theme `Mask`.
  - It reworks classic color-pairing around a reveal mask.
  - It uses a stable random generation algorithm:
    - Select two positions from a coordinate array.
    - Select one color from a color array.
    - Spawn a matched pair at the selected positions.
  - The game challenges memory and reaction speed.

### After Light

Current metadata:

- `Engine`: `Godot`
- `Role`: `Solo developer - design, writing, code`

Important authorship note:

- Do not list `art` for After Light. Its art was made by a friend.

### Infinity

Current metadata:

- `Engine`: `Godot`
- `Role`: `Solo developer - design, writing, code, art`
- `Tags`: `3D`, `Adventure`, `Mystery`
- Itch URL: `https://lvkksyringa.itch.io/infinity`
- Logo: `public/logos/infinity.png`
- Description: a first-person atmospheric puzzle experience in an impossible archive of recurring spaces and memory, explicitly marked as an unofficial, non-commercial project inspired by *Interstellar*.

### Safe Harbor

Current metadata:

- `Engine`: `Godot`
- `Role`: `Solo developer - design, code, art (This game was modified as a team work in USC SCA Summer Program. I was a mechanic designer, then I digitalized the physical game independently.)`
- `Tags`: `2D`, `Board Game`, `Strategy`
- Itch URL: `https://lvkksyringa.itch.io/safeharbor`
- Logo: `public/logos/safeharbor.png`
- Description: a fan-made, non-commercial digital adaptation of *Up the River* for 2–3 local human or AI players, with weather events, player-triggered abilities, bilingual support, pixel art, a custom UI, and an original soundtrack.

## Photo Ingest Pipeline Requirements

This pipeline is not implemented yet. It is a recommended next workflow because the user will frequently add small batches of new photography works.

Desired user workflow:

```bat
npm.cmd run ingest:photo
```

Recommended input folder:

- `public/incoming/photos/`

Recommended output folder:

- `public/images/`

Required behavior:

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

## Current Visual Status and Next Direction

The current visual identity is quiet, mysterious, poetic, and portfolio-appropriate. The major symbolic upgrade is complete: Photography reads as an aperture, Game Design reads as an interaction graph, and the background has layered depth.

### Completed Visual Work

- Semantic constellation shapes, layered starfield, responsive camera framing, and non-elliptical hover feedback are implemented in `StarChart.tsx`.
- The original purple geometric black hole remains the approved About-center treatment.

### Next Direction: Reviewer Path or Highlights

Priority: lower than maintaining the current visual cohesion.

Recommendation:

- Do not add a random three-photo button as a formal application feature.
- If added, make it a curated `Highlights` or `Reviewer Path` feature.
- It should guide reviewers through 3 to 5 deliberately selected works:
  - one strong photography work
  - one strong game systems/design work
  - one personal/about signal
  - optional visual storytelling or technical implementation signal

Reason:

- Random recommendations feel more like a personal gallery toy.
- Curated highlights better serve admissions review.

## Design Guardrails

- Preserve the existing poetic, quiet, glass-and-starlight tone.
- Do not turn the site into a heavy sci-fi VFX demo.
- Keep the first screen as the actual experience, not a landing page.
- Any visual upgrade should improve:
  - reviewer clarity
  - symbolic meaning
  - interaction affordance
  - cross-screen stability
- Test compact windows before accepting a visual pass:
  - 13-inch laptop scale
  - narrow browser window
  - short-height viewport
  - browser zoom around 125 percent

## Suggested Next Session Plan

1. Read this file first.
2. Run:

```bat
cd /d D:\Creation\OtherFiles\Elysiae\fengqiao-world
dev.bat
```

3. Inspect current visuals at `http://localhost:3000`.
4. Inspect the completed main view, constellation view, About view, and work-card overlay before proposing another visual pass.
5. Treat the purple geometric black hole as locked unless the user supplies and approves a new visual direction.
6. Decide whether to implement a curated reviewer path or the photo-ingest pipeline.
7. If doing ingest work:
   - add dependencies deliberately.
   - avoid modifying existing 102 photo entries until the new script is tested on a sample copy.

# Decisions and Rejected Approaches

Only decisions that affect future work belong here. Current execution status belongs in `HANDOFF.md`.

## Repository Boundary

The website repository is `fengqiao-world`, not the parent `Elysiae` folder. The parent contains unrelated files and an empty `.git` directory that is not a usable repository. All Git, npm, and source work must start from the child root.

Why: running commands from the parent previously caused false Git failures, multiple-lockfile warnings, and noisy scans of unrelated `node_modules` content.

## Visual Direction

Preserve a restrained, quiet, mysterious, poetic glass-and-starlight identity. Changes should earn their place through symbolic meaning, reviewer clarity, interaction affordance, or responsive stability.

Accepted forms:

- Photography as an aperture/lens constellation.
- Game Design as a branching interaction/system graph.
- About as the central gravitational point with a purple geometric black hole.
- Layered stars and restrained cool/purple/pink accents.

Rejected approach:

- A warm, flowing, cinematic Interstellar-like black-hole/accretion-disk rewrite was tried and rejected. Do not repeat it without a new reference and explicit approval. The current purple geometric treatment is the locked baseline.

## Work Viewer and Motion

- The accepted work viewer is desktop-focused: one centered active card with the immediately previous and next works staged as lower-opacity 3D glass cards.
- Navigation may use side-card clicks, fixed arrow buttons, or keyboard arrows. Preserve Escape behavior for closing full-screen imagery and then the viewer.
- Keep a frosted, darkened backdrop for text clarity, but do not pause the Canvas starfield or black-hole animation while the viewer is open. A live background keeps viewport resizing visually coherent.
- Keep Canvas resolution bounded by a device-pixel-ratio cap of 2 and resize its backing store only when the render effect is established or viewport state changes, not on every frame.
- Preload progressively: current work first at display quality, immediate neighbors next, then smaller second-neighbor previews during idle time. Respect Save-Data and 2G-class connection hints by skipping the second-neighbor warmup.
- Use the Next.js image pipeline for the viewer instead of downloading every original-resolution asset up front.

Why: the portfolio needs a memorable spatial transition without making weak connections pay the cost of loading the whole gallery. The backdrop improves readability while the live background preserves the star-chart world's continuity.

The site is intended for desktop and laptop presentation. Phone-specific adaptation is not a current product requirement; 4K desktop, 2.5K laptop, short desktop viewports, live resizing, and 125 percent browser zoom remain meaningful review cases.

## Portfolio Data and Authorship

- `src/data/works.ts` is canonical. The UI does not parse Markdown in descriptions; use plain text and `\n\n` paragraph breaks.
- Preserve owner-supplied titles, tags, URLs, roles, descriptions, and ownership claims exactly unless the owner asks for a content edit.
- After Light must not claim art authorship; its art was made by a friend. Its current role is `Solo developer - design, writing, code`.
- Safe Harbor's role must retain the distinction between the USC SCA Summer Program team modification and the owner's independent digital implementation.
- Infinity remains explicitly described as an unofficial, non-commercial work inspired by *Interstellar*.

Why: this is an admissions-facing portfolio. Incorrect ownership or invented impact is materially worse than incomplete copy.

## Photo Ingest Contract

The pipeline is implemented in `scripts/ingest-photo.mjs` with these locked behaviors:

- Read EXIF from the original before conversion or compression.
- Convert web output to JPG, resize inside 1920x1280 without enlargement, and use quality 75 MozJPEG as currently specified in `docs/next-handoff.md`.
- HEIC conversion feeds the resulting buffer through the same image pipeline.
- For iPhone images, prefer 35 mm equivalent focal length; do not force the lens label and displayed focal length to match.
- Ask for ambiguous creative metadata and show a preview before editing `src/data/works.ts`.
- Test only on copies until duplicate-ID, collision, and failure behavior are verified.
- Keep incoming originals and `public/incoming/photos/metadata.json` ignored by Git.
- Use `src/data/photo-ingest-history.json` to identify an already-applied original by SHA-256 without deleting or moving the incoming copy.
- Treat `--apply` as the explicit write boundary. A default run must not write images, portfolio entries, or history.
- Allow a per-file `exifSource` so an edited PNG/JPG can use metadata from its original RAW without changing which image is converted for the website.
- Allow `skipExif: true` for intentional no-EXIF work. Such an entry requires an owner-provided date for its ID and may include a deliberate subset of manual metadata such as Camera and Lens.
- Keep `src/data/exif.json` as legacy/intermediate data for the original import; new creative fields belong in the ignored local `metadata.json`, and applied entries go directly to canonical `works.ts`.
- Preserve an explicit empty `title` as an intentional untitled work. A missing `title` key remains an unresolved field and blocks apply.
- Format bilingual titles as English, one space, then Chinese. Preserve explicit empty titles.
- Normalize Sony camera models to include the manufacturer prefix, for example `Sony ILCE-7M4`, while retaining the established `iPhone 17 Pro` convention for phone entries.
- Present photography works in ascending capture-date order. Since photo IDs use `photo-YYYYMMDDN`, sorting by ID also preserves the sequence of multiple works from the same date and prevents incoming filename order from affecting the website.

Why: metadata can be lost or reinterpreted during conversion, and the portfolio contains deliberate iPhone lens/focal combinations.

## Reviewer Navigation

Do not add a random three-photo recommendation as a formal admissions feature. If navigation assistance is later approved, build a curated `Highlights` or `Reviewer Path` of 3 to 5 deliberate stops across photography, game systems/design, and personal context.

Why: curation serves reviewer comprehension; randomness reads as a gallery toy and can hide the strongest evidence.

## Validation Claims

Keep these claims separate:

- `npm.cmd run build`: compilation/production-build evidence.
- `npm.cmd run lint`: static-rule evidence.
- HTTP 200: server reachability only.
- Automated browser screenshots/interactions: browser-level evidence.
- Owner review: final aesthetic acceptance.

A build or HTTP response must never be reported as visual approval. Compact laptop/short viewport and 125% zoom remain required visual cases.

## Agent Rule Portability

`CLAUDE.md` is the project rule source; `AGENTS.md` is a regular-file pointer, not a duplicated rulebook or filesystem symlink.

Why: a plain pointer survives Windows/cloud-drive restore even when symlink metadata or developer-mode permissions do not. It also keeps one authoritative rule body.

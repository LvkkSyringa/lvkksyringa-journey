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

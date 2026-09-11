# Environment and Recovery

Verified on 2026-08-18. Paths in this document describe the pre-repair Windows machine and are expected to change after restore.

## Repository and Toolchain

Pre-repair repository path:

```text
D:\Creation\OtherFiles\Elysiae\fengqiao-world
```

| Tool | Verified version | Pre-repair executable |
| --- | --- | --- |
| Node.js | 24.16.0 | `C:\Program Files\nodejs\node.exe` |
| npm | 11.13.0 | `C:\Program Files\nodejs\npm.cmd` |
| Git for Windows | 2.54.0.windows.1 | `D:\Creation\Git\cmd\git.exe` |
| PowerShell Core used by this sync | 7.6.4 | Codex-bundled path under `C:\Users\KevinKaslana\.cache\codex-runtimes\...\pwsh.exe`; do not rely on this path after restore |
| Windows PowerShell | 5.1.26100.9168 | `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe` |

No `python` or `python3` command was found, and Python is not required by the current project scripts.

The lockfile is npm lockfile version 3. Exact installed top-level packages at verification time were:

- Next.js 16.2.9; React and React DOM 19.2.4.
- Framer Motion 12.40.0; OGL 1.0.11.
- Photo ingest tooling: Sharp 0.35.4, exifr 7.1.3, and heic-convert 2.1.0, pinned as exact development dependencies.
- Tailwind CSS and `@tailwindcss/postcss` 4.3.0.
- TypeScript 5.9.3; ESLint 9.39.4; `eslint-config-next` 16.2.9.

`package.json` and `package-lock.json` remain authoritative. Restore with `npm.cmd ci`; do not reconstruct `node_modules` by copying package versions from this prose.

## Hard-Coded Absolute Paths

One active script contains a machine-specific absolute path:

- `dev.bat:2` prepends `C:\Program Files\nodejs` to `PATH`.

Recovery impact: `dev.bat` fails if Node is installed elsewhere and not otherwise discoverable. Verify with `Get-Command node` and either install Node at that location or update `dev.bat` after restore. Source code, `package.json`, Next configuration, and current docs contain no other active drive-letter path after this sync; the pre-repair path above is evidence, not an instruction.

## Shell State and Environment Variables

- No project-specific `NODE_*`, `NPM_*`, `NEXT_*`, or `VERCEL_*` environment variable was present or required by the checked source.
- No code reference to `.env` variables was found. `.env`, `.env.local`, and `.env*.local` are ignored as a safety rule; no such file was present in the repository at verification time.
- PowerShell execution policy was `RemoteSigned` at `LocalMachine`; all other scopes were `Undefined`.
- Prefer `npm.cmd` in PowerShell. It bypasses the `npm.ps1` execution-policy ambiguity and invokes the installed npm command shim directly.
- `dev.bat` sets Node's path for its own process, changes to its own directory, and calls `npm run dev`.

## Ignored and Regenerable Data

The following ignored and regenerable paths were observed during the 2026-08-18 through 2026-09-12 checks:

| Path | Verified size | Contents | Recovery |
| --- | ---: | --- | --- |
| `node_modules/` | 411.73 MiB | npm dependencies | Run `npm.cmd ci` with network access. |
| `.next/` | 333.96 MiB | Next.js development/build caches and outputs | Run `npm.cmd run build` or `npm.cmd run dev`. |
| `dev-server*.log` | variable | Disposable development-server logs | Disposable; logs are not required to run the project. |

Other ignore rules cover `out/`, `*.heic`, `*.HEIC`, `.env*`, and `black-hole-*-check.png`. None of those files existed inside the repository when checked.

Conclusion: no ignored file or directory was found that is both present and irreproducible. In particular, there were no ignored HEIC originals waiting to be ingested. The 102 portfolio JPGs and five game logos are tracked by Git.

## Recovery Procedure

From the restored Git root:

```powershell
Get-Command node
node --version
npm.cmd --version
git --version
npm.cmd ci
npm.cmd run build
npm.cmd run lint
.\dev.bat
```

Open `http://localhost:3000` only after the development server reports ready. The project has no database, external SDK, secret, or required local service in the checked source.

### Known workspace-root warning

`npm.cmd run build` currently succeeds but Next.js warns that it found both the parent `Elysiae\package-lock.json` and this repository's `package-lock.json`; it infers the parent as the workspace root. The parent lockfile is outside this repository and was not deleted. After a cloud restore containing only this Git root, the warning should disappear. If the parent lockfile is restored too, verify the warning and either set `turbopack.root` deliberately or reorganize the outer container only with owner approval.

## Verification Record

Results below are intentionally separated by evidence type:

- Source/data audit on 2026-08-18: 102 unique photo entries, 5 unique game entries, 102 files in `public/images/`, and zero missing work image/logo references.
- Git topology on 2026-08-18 before this sync: only local `main`, remote `origin/main`, no stash, and one worktree.
- Production build on 2026-08-18: passed with Next.js 16.2.9; `/` and `/_not-found` were statically generated. The multiple-lockfile warning above was non-blocking.
- Lint on 2026-08-18: failed with 3 errors and 4 warnings. Errors are `react-hooks/refs` at `src/components/Aurora/Aurora.tsx:111` and `src/components/Strands/Strands.tsx:225`, plus `prefer-const` at `Aurora.tsx:125`. Warnings are one missing-dependencies warning at `Aurora.tsx:181` and three `@next/next/no-img-element` warnings in `AboutPanel.tsx` and `GlassCard.tsx`. These are a verified baseline, not fixed by this documentation-only sync.
- Photo-ingest checks on 2026-09-04: script syntax and script-only ESLint passed; the empty incoming directory produced a no-op; dry-running against one existing web JPG made no writes and correctly reported stripped EXIF as unresolved; pure photo-array append logic passed; Sharp converted a copied web JPG to JPEG within 1920x1280 and removed its temporary output; two byte-identical files in one dry-run produced one pending work and one duplicate skip; an unresolved `--apply` exited with an error while hashes confirmed no change to `works.ts` or ingest history. Real HEIC and original-camera EXIF were still awaiting owner samples at that checkpoint and were subsequently verified on 2026-09-11 below.
- Real-source checks on 2026-09-11: exifr read all 10 iPhone HEIC files and their `FocalLengthIn35mmFormat` values; the preview used 24/48/100/200 mm equivalents rather than 6.765/16.891 mm physical values. Matching Sony ARW files supplied complete EXIF for all 3 edited PNGs. A real HEIC was converted through heic-convert and Sharp to a 1003x1280, 152,903-byte JPEG in a temporary directory, then removed. The composite `skipExif` path generated a valid work without a metadata block when given test creative fields and a date. Script-only ESLint, `git diff --check`, and the production build passed; the known multiple-lockfile warning remains non-blocking.
- Applied-batch verification on 2026-09-11: 14 new works were appended, increasing the photography set from 102 to 116. All 116 IDs are unique, all 116 `/images/` references resolve, and ingest history contains 14 hashes. The 14 source copies total 112,764,429 bytes; the 14 MozJPEG outputs total 1,755,119 bytes (about 98.4 percent smaller), are all JPEG, and fit inside 1920x1280. A second dry-run skipped all 14 originals as already imported. Production build passed after application.
- Display-normalization verification on 2026-09-11: all 94 Sony camera fields use `Sony ILCE-7M4` and zero retain the unprefixed form. The six non-empty bilingual titles in the new batch use English, one space, then Chinese. A direct `inspectPhoto` check confirmed Sony RAW normalization and the Galaxy composite's manual Camera/Lens-only metadata; the photo-card condition now renders its date even without exposure metadata. Script syntax, script-only ESLint, `git diff --check`, and the production build passed; `http://localhost:3000` returned HTTP 200. Browser visual acceptance remains with the owner.
- Release verification on 2026-09-12: commit `0d6e22f` delivered the compressed 14-photo batch and chronological ordering; commit `9317383` delivered the preloaded three-card 3D work viewer, frosted backdrop, Next.js image loading, Canvas DPR cap, and per-effect Canvas resizing. Targeted ESLint for `GlassCard.tsx` and `StarChart.tsx`, `git diff --check`, TypeScript, and the Next.js production build passed. Local and remote `main` both resolved to `9317383077e1dc55184e20ca819ef5fc563ed6ed`; Vercel reported the corresponding Production deployment successful, and `https://lvkksyringa.vercel.app/` returned HTTP 200. The owner visually reviewed the deployed result and accepted it.
- Repository-wide lint on 2026-09-12: still fails only on the known unrelated baseline, now 3 errors and 2 warnings. Errors are `react-hooks/refs` in `Aurora.tsx` and `Strands.tsx`, plus `prefer-const` in `Aurora.tsx`; warnings are one missing-dependencies warning in `Aurora.tsx` and one `no-img-element` warning in `AboutPanel.tsx`. The previous GlassCard image warning is resolved by its `next/image` migration.

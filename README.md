# Fengqiao World

Personal portfolio site for LvkkSyringa, built with Next.js. The experience is structured as an interactive star chart that connects photography, game design works, and an about section.

## Local Development

From `cmd.exe`:

```bat
cd /d D:\Creation\OtherFiles\Elysiae\fengqiao-world
dev.bat
```

From PowerShell:

```powershell
Set-Location "D:\Creation\OtherFiles\Elysiae\fengqiao-world"
.\dev.bat
```

Open `http://localhost:3000` after the terminal shows `Ready`.

## Build

```bat
npm.cmd run build
```

## Project Map

- `src/app/page.tsx` - main experience flow and selected work state.
- `src/components/StarChart/StarChart.tsx` - canvas star map, constellations, black hole, click/hover logic.
- `src/components/GlassCard/GlassCard.tsx` - work detail modal.
- `src/components/AboutPanel.tsx` - about view cards.
- `src/data/works.ts` - photography and game portfolio data.
- `public/images/` - photography images.
- `public/logos/` - game and profile visual assets.

## Portfolio Content

- Photography: 102 EXIF-backed works in `public/images/`.
- Game Design: Vafi, Infinity, Safe Harbor, What's Under the Mask?, and After Light.
- `src/data/works.ts` is the canonical portfolio-data source; use paragraph breaks (`\n\n`) for longer work descriptions.

## Handoff Notes

For the current implementation state, recent changes, and recommended next optimization directions, read:

- `docs/next-handoff.md`

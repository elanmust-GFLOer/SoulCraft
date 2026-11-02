# SoulCraft — Creator v0.3.3

Status: browser-local Creator prototype. The complete source and static distribution are tracked in this public repository under `creator/`. The separately hosted owner-private test Site is an independent deployment and is not updated automatically by GitHub commits.

## Implemented

- Five elemental origins and one Evolve Soul awakening.
- Optional Soul naming and renaming (up to 24 Unicode code points); existing saved progress is retained.
- One self-reported daily goal, awarding 40 local XP at most once per device-local calendar day.
- Three reversible cosmetic effects: Soft Halo, Starlight and Light Ribbon. One may be equipped at a time, changed, or removed. Craft does not award extra XP.
- Browser-local persistence using `localStorage` key `soulcraft.creator.v03`; tabs synchronize through storage events.
- Save my Soul: versioned JSON backup of supported local state, including private goals. The backup is **not encrypted**.
- Restore my Soul: validation and preview before overwrite confirmation. Restore replaces, rather than merges, current progress. A backup of existing progress is offered before replacement.
- Share my Soul: locally generated 900×1200 PNG with an allowlist of name, origin, XP, cosmetic effect and standard Site link. Private goals and progress events are excluded from the card.
- English-first UI, reduced-motion support and an in-app Motion control.

## Run locally

From this directory:

```sh
node --test model.test.mjs portability.test.mjs
python -m http.server 8000 --directory dist
```

Then open `http://localhost:8000`. Static files use browser ES modules; no build or dependency installation is required.

## Boundaries

This is a prototype, not a secure activity or XP ledger. Goal completion is self-reported; local data and the device clock can be edited. There is no backend, cloud/email sync, external AI, verified activity proof, GFLO rewards or Expo implementation. A share link is not a backup or account access link. Localhost, GitHub Pages and the separate hosted Site have independent browser storage; use Save/Restore to transfer progress.

The 0/40/80 XP glow and sparkle states are **not** complete, recognizably distinct character evolutions. Earlier Genesis and simulated 3-of-5 fusion are archived under [prototypes](../prototypes/); fusion is **not** part of Creator v0.3.3. Elemental design notes in [docs](../docs/ELEMENTAL-TRAITS-v0.1.md) describe proposed visuals, not validated psychological traits.

## Release history

- v0.3.1 — optional naming and renaming.
- v0.3.2 — three reversible cosmetic craft effects.
- v0.3.3 — JSON backup/validated restore and privacy-scoped PNG sharing.

See the [project README](../README.md), [Creator roadmap](ROADMAP.md), and [overall roadmap](../docs/ROADMAP.md). Artwork and animation sheets remain provisional.

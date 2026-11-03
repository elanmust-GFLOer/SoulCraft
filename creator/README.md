# SoulCraft — Creator v0.4.0 (Earth Evolution Preview)

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

The 0/40/80 XP glow and sparkle states are **not** complete, recognizably distinct character evolutions. Earlier Genesis and simulated 3-of-5 fusion are archived under [prototypes](../prototypes/); fusion is **not** part of Creator v0.4.0. Elemental design notes in [docs](../docs/ELEMENTAL-TRAITS-v0.1.md) describe proposed visuals, not validated psychological traits.

## Home-screen installation (v0.3.4)

The public GitHub Pages Creator now includes a web-app manifest, square PNG icons, and an **Add to Home Screen** control. Browsers supporting `beforeinstallprompt` can show their install prompt; others show manual browser-specific instructions. Installation is optional; no account, service worker, push notifications, or guaranteed offline mode is implemented. The storage key `soulcraft.creator.v03` and backup format remain unchanged. Browser and installed-app storage may differ by platform; make a JSON backup before changing install context.

Share cards and Copy SoulCraft link now use the public GitHub Pages root `https://elanmust-gfloer.github.io/SoulCraft/`. Existing downloaded PNG cards retain the old printed URL. The user must re-export a card for the new URL. This is a public web prototype, not a native Android application.

## Acceptance evidence (2026-11-03)

- GitHub Actions Creator/PWA checks and Pages deployment succeeded for v0.3.4.
- The user reports successfully installing SoulCraft on their phone home screen and launching/using it (Android). This is a user-reported functional acceptance, not independent device-browser verification.
- Preservation of the exact prior Soul state *inside the installed context* and re-exported share-card URL have not been separately confirmed. The existing Save/Restore workflow remains the documented transfer and recovery method.

## Earth evolution — v0.4.0

Earth alone now has three silhouette states inferred from existing earned XP: base Earth at 0 XP, Stone Guardian (mossstone armor) at 40 XP, and Crystal Guardian (crystal crown and projecting wings) at 80 XP. Two transparent SVG artwork layers supplement the original Earth character. These are a first morphology prototype, not final production illustrations or a new storage schema. Existing StoneR-style backups keep the same name, daily goal events, craft and XP. All four other elements still use the previous visual stages. The new Earth morphology is also rendered in newly generated PNG share cards; old exported PNGs never update.

The share-card GitHub Pages URL drawing also no longer depends on the former test Site domain. Visual Android acceptance is pending. Run `node --test model.test.mjs portability.test.mjs pwa.test.mjs evolution.test.mjs`.

## Release history

- v0.3.1 — optional naming and renaming.
- v0.3.2 — three reversible cosmetic craft effects.
- v0.3.3 — JSON backup/validated restore and privacy-scoped PNG sharing.
- v0.3.4 — GitHub Pages PWA manifest, installation guidance, and public share URL.
- v0.4.0 — Earth three-stage morphology and share-card URL correction.

See the [project README](../README.md), [Creator roadmap](ROADMAP.md), and [overall roadmap](../docs/ROADMAP.md). Artwork and animation sheets remain provisional.

# SoulCraft

One Soul. Three lenses. Five elemental origins.

SoulCraft is an early browser-local prototype. One Evolve Soul develops through Creator (action), with Companion (relationship) and Spark (reflection) planned as later limited previews. Essence Soul is the humanoid frontend guide.

## Current implementation — Creator v0.4.4 (Soul Presence Polish)

Complete Creator source (v0.3.3 core features, v0.3.4 PWA, and Earth-only v0.4.0 morphology) is in [`creator/`](creator/README.md): five origins, awakening, optional naming, one self-reported daily goal worth 40 local XP, three reversible cosmetic effects, JSON backup/validated restore, and a private-goal-free PNG share card. Progress is stored in the browser. No dependency installation or build is needed.

```sh
cd creator
node --test model.test.mjs portability.test.mjs pwa.test.mjs evolution.test.mjs
python -m http.server 8000 --directory dist
```

Open http://localhost:8000. Localhost, GitHub Pages and the hosted Site each have separate browser storage; use Save my Soul / Restore my Soul to transfer progress.

The [owner-private test Site](https://soulcraft-creator-gabriel-v03.tealoffer2.chatgpt.site/) is deployed separately. GitHub and Sites have independent source/deployment histories; a GitHub commit alone does not update that Site. The root GitHub Pages entrypoint redirects to Creator v0.4.4 at `creator/dist/`; earlier v0.2 demos remain under `prototypes/`. GitHub Pages deployment status and browser behavior should be checked independently.

## Evidence and boundaries

Node tests cover daily reward uniqueness, save migration, naming, craft, backup validation and share privacy. This is a prototype with self-reported actions and editable local XP, not a secure reward ledger or verified activity proof.

AI, server accounts, cloud/email backups, Companion/Spark interactions, GFLO/OctoPush integration and Expo are not implemented. Earlier Genesis and v0.2 prototypes remain in [`prototypes/`](prototypes/); their simulated 3-of-5 fusion is not implemented in Creator. Earth alone now has an XP-derived Stone Guardian (40 XP) and Crystal Guardian (80 XP) silhouette in addition to its base form; other elements remain unchanged.

See [roadmap](docs/ROADMAP.md), [Creator details](creator/README.md), and [elemental design notes](docs/ELEMENTAL-TRAITS-v0.1.md). Design notes describe intended traits, not validated personality or psychological claims.

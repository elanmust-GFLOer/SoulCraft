# Creator v0.3.3 — release acceptance checklist

Status: release verification in progress (2026-11-03). This checklist records evidence; unchecked items are **not** claims of failure or success.

## Automated evidence

- [x] Complete Creator v0.3.3 source and static assets committed under `creator/`.
- [x] Creator checks GitHub Actions run succeeded: https://github.com/elanmust-GFLOer/SoulCraft/actions/runs/41521392634
- [x] Latest GitHub Pages deployment succeeded: https://github.com/elanmust-GFLOer/SoulCraft/actions/runs/41522012249
- [x] Root Pages entrypoint redirects to `creator/dist/`.
- [ ] Browser smoke test of all five origin image paths and interactions documented.

## Manual acceptance — Android browser

Use a newly created Soul, without resetting it during the test.

- [x] User reports that GitHub Pages v0.3.3 opens and a new Earth Soul can be created (conversation report; not independently reproduced).
- [ ] Give the Earth Soul a name; reload; confirm origin and name persist.
- [x] User reports daily XP awarded and retained after reload (2026-11-03). The exact +40 amount and rejection of a second same-day claim were not separately confirmed manually; both are covered by automated model tests.
- [x] User reports craft effect activation, switching and persistence after reload (2026-11-03). Removal was not separately confirmed manually; automated model tests cover removal.
- [x] User reports successful Save/Restore with the newly created Earth Soul on Android (2026-11-03). The exact retained-file handling was not separately confirmed. JSON backups include private goals and are unencrypted.
- [x] User reports a successful Restore my Soul flow (2026-11-03); preview, confirmation and individual restored fields were not independently observed or itemized. Follow-up field-by-field verification remains open.
- [ ] Generate **Share my Soul** PNG; confirm the image omits private goals.
- [ ] Check reduced-motion mode and small-screen layout.

## Boundaries and release decision

- No cloud backup, account, secure XP ledger, full visual evolution or 3-of-5 fusion is claimed.
- GitHub Pages and separately hosted Site have independent browser storage.
- **Do not mark v0.3.3 manually accepted** until the above Android checks are reported and documented.
- The next feature gate after acceptance is a single recognizable visual evolution for one origin; it is not part of v0.3.3.

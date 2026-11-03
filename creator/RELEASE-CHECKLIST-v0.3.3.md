# Creator v0.3.3 — release acceptance checklist

Status: Creator v0.3.3 accepted for the tested Android/Pages core workflow based on user reports (2026-11-03). Remaining unchecked items are supplemental verification, **not** claims of failure or success.

## Automated evidence

- [x] Complete Creator v0.3.3 source and static assets committed under `creator/`.
- [x] Creator checks GitHub Actions run succeeded: https://github.com/elanmust-GFLOer/SoulCraft/actions/runs/41521392634
- [x] Latest GitHub Pages deployment succeeded: https://github.com/elanmust-GFLOer/SoulCraft/actions/runs/41522012249
- [x] Root Pages entrypoint redirects to `creator/dist/`.
- [ ] Browser smoke test of all five origin image paths and interactions documented.

## Manual acceptance — Android browser

Use a newly created Soul, without resetting it during the test.

- [x] User reports that GitHub Pages v0.3.3 opens and a new Earth Soul can be created (conversation report; not independently reproduced).
- [x] User-shared Earth Soul PNG displays the chosen name **StoneR**, Earth origin and 80 Creator XP (2026-11-03). Name persistence across a distinct reload was not separately itemized; daily XP and craft persistence were reported.
- [x] User reports daily XP awarded and retained after reload (2026-11-03). The exact +40 amount and rejection of a second same-day claim were not separately confirmed manually; both are covered by automated model tests.
- [x] User reports craft effect activation, switching and persistence after reload (2026-11-03). Removal was not separately confirmed manually; automated model tests cover removal.
- [x] User reports successful Save/Restore with the newly created Earth Soul on Android (2026-11-03). The exact retained-file handling was not separately confirmed. JSON backups include private goals and are unencrypted.
- [x] User reports a successful Restore my Soul flow (2026-11-03); preview, confirmation and individual restored fields were not independently observed or itemized. Follow-up field-by-field verification remains open.
- [x] User supplied a generated Share my Soul PNG (2026-11-03): name StoneR, Earth origin, 80 Creator XP and Soft Halo displayed; no private goal text visible. Static image inspection is not a comprehensive data-leak audit. Note: the printed standard link targets the separately hosted test Site rather than the GitHub Pages entrypoint; review before broader public sharing.
- [x] User reports Motion control and small-screen layout functioning correctly on Android (2026-11-03); device/browser matrix and system-level reduced-motion setting not independently verified.

## Boundaries and release decision

- No cloud backup, account, secure XP ledger, full visual evolution or 3-of-5 fusion is claimed.
- GitHub Pages and separately hosted Site have independent browser storage.
- **Acceptance decision (2026-11-03):** user-confirmed Android Creator v0.3.3 core workflow accepted (Page access, Earth Soul, Save/Restore, XP persistence, craft persistence, Share PNG, Motion and small-screen layout). Outstanding independent/browser-matrix checks remain visible and are not silently treated as passed.
- The next feature gate after acceptance is a single recognizable visual evolution for one origin; it is not part of v0.3.3.

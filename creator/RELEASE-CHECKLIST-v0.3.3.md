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
- [ ] Save a daily goal, mark it complete, verify +40 XP and that a second completion the same day does not award more.
- [ ] Equip, change and remove one cosmetic effect; verify it persists after reload.
- [ ] Download **Save my Soul** JSON; retain a safe copy. It includes private goals and is unencrypted.
- [ ] Run **Restore my Soul** using that backup, inspect the preview, confirm overwrite, then verify name/origin/XP/effect/goals.
- [ ] Generate **Share my Soul** PNG; confirm the image omits private goals.
- [ ] Check reduced-motion mode and small-screen layout.

## Boundaries and release decision

- No cloud backup, account, secure XP ledger, full visual evolution or 3-of-5 fusion is claimed.
- GitHub Pages and separately hosted Site have independent browser storage.
- **Do not mark v0.3.3 manually accepted** until the above Android checks are reported and documented.
- The next feature gate after acceptance is a single recognizable visual evolution for one origin; it is not part of v0.3.3.

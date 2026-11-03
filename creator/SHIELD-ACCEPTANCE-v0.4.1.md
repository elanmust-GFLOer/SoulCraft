# Creator v0.4.1 — Earth Shield acceptance checklist

Status: **automated coverage complete; Android acceptance partial** (2026-11-03).

## Verified so far

- [x] Five shield SVG files, unlock logic, free equip/switch/unequip.
- [x] Automated checks: state persistence, backup/restore, invalid shield rejection, privacy allowlist, PNG overlay drawing for five shields.
- [x] GitHub Pages and Creator checks previously succeeded for v0.4.1.
- [x] User screenshots: StoneR Earth, 80 XP, Crystal Guardian and visible Reflective Shield overlay.
- [x] User screenshots: five options shown; Reflective selected; Perspective produces a Reflective suggestion.

## Android PWA acceptance — still to test

- [ ] Switch Bulwark → Reflective → Bloom → Core → Halo and verify visibly different art.
- [ ] Close and reopen: StoneR, 80 XP, selected shield and cosmetic craft are preserved.
- [ ] Unequip: shield disappears, Crystal Guardian stays.
- [ ] Try an alternative Companion need; decline suggestion and confirm equipped shield remains unchanged.
- [ ] Save JSON backup first; Restore with preview and approval; verify shield/XP/name/craft. Restore overwrites local progress.
- [ ] Generate new Share my Soul PNG; verify shield art, shield name, GitHub Pages URL and no private goals.
- [ ] Check narrow mobile display and reduced-motion preference.

## Scope boundary

Five **shield forms** are implemented, but five **armor silhouettes** and cockpit-equipped humanoid exosuit are **not**. No combat powers, native AI Companion or psychological diagnosis is claimed. See [Guardian Cockpit Scope](GUARDIAN-COCKPIT-SCOPE.md).

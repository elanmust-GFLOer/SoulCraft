## Current increment — v0.5.0 Soul Care

Implemented: three daily rhythm tabs, two optional smaller tasks, quick private note, three-tap spark interaction, optional evening reflection, capped non-decaying Bond moments, and backup/restore integration. Creator's existing daily reward remains authoritative. Android/PWA acceptance on the user's device is still required.

Next: validate the complete daily loop with an existing Soul before expanding play, preferences, or generative AI. No scheduled notifications or external AI are part of this release.

# SoulCraft — next development gates

Proposed sequence, 2026-11-02. Naming, the first craft choice, backup/restore, and privacy-scoped card sharing are implemented. Remaining gates are proposals, not completed functionality or promised dates.

1. **First craft choice — implemented in v0.3.2.** After the first daily completion, unlock one of three reversible cosmetic effects. Keep XP and craft inventory separate. Pass: the chosen effect is visible, can be changed, and survives reload without awarding extra XP. Purpose: close the action → reward → creation loop.
2. **Progress backup and restore — implemented in v0.3.3.** Add explicit JSON export/import with validation, a preview and overwrite confirmation. Pass: origin, name, events and craft restore faithfully. Purpose: protect browser-local progress before expanding content. This is not cloud synchronization.
3. **A meaningful evolution milestone — implemented for Earth in v0.4.0; mobile acceptance pending.** Added two silhouette artwork layers for an Earth Soul at 40/80 XP while preserving XP, craft and backups. Pass still requires a user recognizing the form without reading XP, correct rendering in a share card and successful restore.
4. **A short usability trial.** Ask a few consenting testers to complete the daily loop and return voluntarily over several days. Record comprehension, naming/craft use, and return reasons, with no sensitive diary collection. Purpose: test usefulness and friction before investing in backend and AI.
5. **One limited Companion and Spark preview.** Build only after Creator feedback, with explicit privacy and content boundaries. Introduce server-side persistence when cross-device use is demonstrated as necessary; estimate hosting before enabling database or AI usage.

Later: 3-of-5 fusion, humanoid guide animation, card/battle experiments, GFLO/OctoPush adapters. These do not block the first useful Creator experience.

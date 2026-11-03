# Guardian Cockpit / Armor Paths — scoped next milestone (proposal)

**Not yet implemented.** The active v0.4.1 code renders the Soul with separate crystal silhouette and optional right-side shield, not a giant exosuit.

## Visual rule

ONE Evolve Soul remains identifiable, seated or floating inside a transparent **cockpit spanning the upper chest, neck and head** of an external guardian suit. A single, consistent cockpit frame is reused across these five mutually exclusive Earth armor identities:

| Armor path | Recognizable body shape |
| --- | --- |
| Balanced Guardian | Proportional body; all-round silhouette |
| Heavy Bastion | Broad chest and massive forearms |
| Tall Sentinel | Slender elongated legs and upright crown |
| Compact Striker | Small agile, compact proportions |
| Broad Titan | Monumental wide shoulders and thick feet |

## Separation of concerns

- Armor Path = stable long-term visual identity; **not** one of the five shields.
- Shield Form = freely changeable, mood-independent cosmetic stance from v0.4.1.
- The player retains the right to override Companion suggestions; no mood information saved.
- No XP is spent; preserve existing name, Earth origin, earned XP, craft, equipped shield and private goals.
- A preview-and-choose UI is preferred. Whether changing the armor later has a cost or cooldown requires a separate product decision, so do not implement locks now.

## Implementation and acceptance gates

1. One visually complete Earth Guardian shell and transparent cockpit with clearly recognizable StoneR inside (not two separate Souls).
2. Five distinct silhouette artwork assets using the same cockpit coordinate system.
3. A reversible visual preview and one selected Armor Path, with a deliberately reviewed backup migration.
4. New share PNG and in-app preview match; five shield choices continue to work.
5. Android/PWA visual and Save/Restore acceptance, accessibility and reduced-motion checks.

Avoid promising gameplay/shield statistics, additional elemental armor or AI features in this scope.

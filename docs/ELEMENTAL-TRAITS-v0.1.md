# SoulCraft — Elemental Trait System v0.1

Status: DESIGN SPECIFICATION — not implemented. Date: 2026-11-02.

## Identity
One Evolve Soul per player. Five elemental entities modify one soul, not five separate player avatars. Up to three active elements (3/5). Essence Soul is a separate humanoid frontend guide / symbol of shared essence, not an element.

## Five semantic traits per element

| Element | Traits |
| --- | --- |
| Fire (Ignis) | energy, courage, passion, transformation, initiative |
| Water (Aqua) | flow, adaptability, sensitivity, calm, depth |
| Earth (Terra) | stability, persistence, protection, patience, structure |
| Air (Aeri) | freedom, curiosity, lightness, exploration, agility |
| Wood (Sylva) | growth, renewal, connection, creativity, regeneration |

Names are provisional. Traits describe narrative and visuals, NOT user psychology or capabilities.

## Five renderer channels
1. Shape: silhouette, ears, crown, appendages
2. Texture: fur, liquid, rock, leaves
3. Motion: float, wave, bounce, unfold
4. Light and particles: aura palette, embers, droplets, pollen
5. Reactive animation: gestures and responses to game actions

Element presets:
- Fire: amber flames, ember motes, quick rising motion.
- Water: cyan translucent edges, bubbles, wave cycles.
- Earth: moss/crystal accents, grounded broad posture, slow rhythmic motion.
- Air: silver/lavender wind trails, levitation, buoyant motion.
- Wood: green sprout/leaf motifs, branching growth, blossoms.

## Fusion rules (proposed)

* The root character remains one Evolve Soul.
* Origin is preserved. New elements add parameters; do not delete history.
* Active elements: unique IDs, max 3.
* Priority: origin shape, second element movement, third element accents is a FIRST TEST RULE, not canonical law.
* Fire + Water: steam/geyser motif (creative tension, no penalty).
* Fire + Water + Wood: Geyser Rose, one prototype hybrid.
* No personality diagnosis, superiority hierarchy, combat attributes or health claims.
* XP is earned for concrete actions, not sharing emotional or spiritual details.
* The historical Greek four-element model and Chinese five phases are distinct traditions. SoulCraft's five choices are a creative fictional taxonomy, not a faithful historical reconstruction.

## MVP acceptance criteria

- Five element presets change visible parameters.
- Origin bubble matches chosen color and pulses.
- Soul evolves into one recognizable shared character family.
- Adding a second element changes at least two renderer channels.
- A third element cannot be added after three are active.
- Fire + Water + Wood activates named Geyser Rose variant.
- Restart restores initial state and does not leak local user data.

## Implementation boundary

Genesis v0.1 is an interactive HTML proof of concept, not an Expo app; this file is a design spec. AI dialogue, accounts, persistent profiles, collective Essence and GFLO/OctoPush adapters remain later.

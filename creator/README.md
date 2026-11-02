# SoulCraft — Creator v0.3

Craft update v0.3.2: one self-reported completed goal unlocks Soft Halo, Starlight and Light Ribbon. Equip one at a time, switch freely, or remove it. Cosmetic selection is independent of XP and persists using the existing state key. Existing players with a completed goal unlock the choices immediately. Effects use CSS and respect both reduced-motion preferences and the in-app Motion control. No additional image generation, AI service or database is involved.

Naming update v0.3.1: optionally name your Soul at awakening or use “Name your Soul” / “Rename” on its card later. Names are plain text, up to 24 Unicode code points, with normalized spacing; an empty name uses the elemental default. Existing v0.3 saves retain their goals, XP, and origin. Name changes do not award XP. See ROADMAP.md for the proposed next gates.

## Language

English is the default product language for international accessibility, including Essence narration, controls, stage labels, validation, and accessibility labels. Existing user-written goals remain exactly as entered. The storage key and state schema are unchanged by this language update.

Browser-local vertical slice based on the SoulCraft v0.2 interaction model and newly generated elemental character references. This is a separate private demonstration, not an update to the public GitHub project.

Choose one of five origins, awaken one Evolve Soul, write a daily goal, self-report completion and receive 40 local XP once per device-local calendar day. Progress persists in localStorage under `soulcraft.creator.v03`; tabs synchronize through storage events. Skipped days do not reduce XP. A reset requires confirmation. Reduced-motion preferences are respected. XP 40 and 80 unlock a glow and additional sparkle; these are provisional visual states, not complete character evolutions.

No backend, identity, external AI, GFLO rewards, sensitive journaling, or automatic proof verification. Local storage can be cleared or edited and the device clock can be changed; this is not a secure reward ledger. Earth and Essence artwork retain some generated halo. Art poses and canvases are not a finalized animation sheet.

Run the model checks: `node --test model.test.mjs`. Serve `dist/` with any static HTTP server. Code uses ES modules.

Original model reference: https://github.com/elanmust-GFLOer/SoulCraft/blob/main/prototypes/evolve-soul-elemental-renderer-v0.2.html


## Portability update v0.3.3

Save my Soul downloads a versioned JSON backup containing all supported browser-local state, including private goals. Files are not encrypted. Restore my Soul checks the format, calendar dates, state version, field lengths, known origins/effects, and reward uniqueness before showing a preview. Confirmation replaces rather than merges current progress; a download of the current state is offered first. Storage must accept the imported state before the displayed Soul changes. No file is uploaded.

Share my Soul creates a local 900×1200 PNG using an explicit allowlist of name, element, XP, effect and the standard Site URL. The app can download the image, invoke the device share sheet where supported, or copy the standard link. Private goals and progress events are never passed to the card renderer or share sheet. The link opens the private prototype; it is not a restore link or an access grant. No email service or cloud sync has been introduced.

Checks: `node --test model.test.mjs portability.test.mjs`.

# Soul Care v0.5.0 acceptance record

Date: 2026-11-03. Scope: Creator daily rhythm, local data only.

## Completed checks

- All 46 Node tests pass: existing Creator, PWA, evolution, armor, shield and portability tests plus five Soul Care integration/validation cases.
- Full daily loop: plan → smaller task → note → main goal completion → evening reflection → repeat reflection → reload/backup round trip. Exactly one +40 XP reward; at most three Bond moments per day.
- Backward compatibility: legacy v1 save and backup without care retain XP/name/equipment.
- Strict import rejection of invalid dates, duplicate days/phases, oversized notes/reflections, unknown fields, invalid task types. Share payload excludes private care content.
- Real browser UI on the local preview: Earth test Soul awakened, main priority set, two smaller steps saved, one checked, note saved, spark tapped three times, evening goal confirmed, reflection saved twice. Reload retained the reflection, task progress, 40 XP and three Bond moments. Completed-goal confirmation is hidden after reward.
- Module syntax checks and git whitespace checks.

## Verification limits

Browser check used a separate local test Soul, not the user's saved StoneR. No user-device Android/PWA acceptance, midnight-in-open-form browser test, multi-tab editing test, full security audit, AI integration or cloud synchronization was performed. Midnight drafts keep their original record date by form metadata; this rule is not an automatic migration of yesterday's goal. Existing daily reward is still self-reported and device-clock-based.

## Device acceptance still needed

1. Open v0.5.0 in the existing Android/PWA environment; verify current Soul, XP, armor and shield.
2. Use Feed to save smaller steps, Play to save a note and play, Rest to save a reflection. Confirm all phases remain accessible at any hour.
3. Reload and confirm task/note/reflection retention. Confirm main goal grants at most +40 for the day, including repeated evening save.
4. Download a backup. Restore with the existing pre-check/confirmation, verify private records are retained, and check that Share PNG excludes private text.
5. Try Motion off and check small-screen layout, focus and on-screen keyboard.

## Out of scope

Generative dialogue, hobbies, a full minigame, notifications, passive monitoring, punitive needs, streaks, external storage and token rewards. Soul reactions are scripted visual/text feedback.

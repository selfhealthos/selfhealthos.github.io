---
sidebar_position: 2
---

# The Health dashboard

Health is the app's home page. The sidebar is organised into four sections:

## Day

- **Entries** — every hand-logged entry (diet, exercise, gym, gut, vitals, notes, documents, body measurements, fitness tests) flattened into one chronological timeline, paged a day at a time. Entries render as cards left to right, earliest to latest, and wrap onto new rows as the window narrows.

  A meal or document photographed on the phone shows its **thumbnail** on the card once the image has finished uploading — the entry itself lands with the rest of the sync batch well before the picture does, so a card is never hidden waiting for one.

  **Gym sets group into one card per exercise**, listing each set as `80 kg x 10 reps` in the order it was performed. A leg day is thirty individual sets, and thirty cards would bury everything else logged that day. Deleting a gym card removes that exercise's whole set list for the day.

  Anything logged in error can be **deleted from the card** — the × in its top-right corner, then a confirm. It's the only write this timeline has. Deletions are tombstoned rather than erased, so a row that came from the phone doesn't simply reappear at the next sync.
- **Today** — the most recent day holding data (not literally today; if your watch hasn't synced yet this morning, showing an empty "today" would be less useful than showing last night's real numbers, with the header stating which day it actually is).
- **Trends** — several metrics plotted over a 30/90/365-day window, each with a trailing moving average.
- **Heatmap** — see [Heatmap & scoring](./heatmap-scoring.md).

## Wearable

Pulled in automatically once [Fitbit is connected](../getting-started/fitbit-setup.md):

- **Sleep** — see [Sleep](./sleep.md).
- **Heart** — resting heart rate and HRV over time (each plotted against a trailing 30-day baseline), a per-day heart rate trace with Fitbit's own zone boundaries, and a scored table (resting HR, HRV, VO2max, active/vigorous minutes).
- **Activity** — see [Activity](./activity.md).

## Fitness

- **Gym** — tonnage per session over time, and a grid of working weights with exercises down and sessions across, newest first. See [Gym](./gym.md).
- **Workout** — pick one of two curated exercise-video playlists (an OPEX Fitness mobility library, a Darebee bodyweight library) and step through it one clip at a time, in a random order. The player shows a muted, looping video, a per-clip timer with 30/60/90-second audio cues, and Complete/Skip actions. Completing a clip logs it as an exercise session — the same record the Activity page's logged-sessions table and the MCP tools read.
- **Tests** — the functional self-tests: grip strength, single-leg balance, sit-to-stand reps, dead hang time. Deliberately uncoloured — higher is better for all four, but there's no literature threshold for a dead hang, and grip norms vary by age, sex, hand and dynamometer by more than the difference the page is for. These are lines against your own history.

## Logged

Everything you record by hand:

- **Habits** — see [Habits](./habits.md).
- **Diet** — a food log with keyword-based flagging (caffeine, high-sugar, good-protein, LDL-lowering) and a "most eaten" view. There's no macro/calorie tracking — this logs *what* you ate, not a nutrition breakdown.
- **Gut** — Bristol stool scale entries, plus a correlation view suggesting foods eaten before a bad day. This is explicitly framed as association, not causation — the view carries how many days each suspect food was actually eaten, specifically so a food you eat constantly (like breakfast) doesn't look falsely indicted just because it precedes everything.
- **Blood pressure** — systolic and diastolic on one chart (one reading taken together, overlapping scales), against the 120/80 clinical thresholds rather than your own average. Was called "BP + Weight" until weight moved to Body; `/vitals` still redirects there.
- **Body** — body composition, and the one page here you can write to from the browser. Record a weight, a waist (plus hips, neck, body fat %), your height and an optional target weight; backdate any of them, because the day an entry is filed under is stored rather than computed.

  Weight and BMI share a chart on two axes — honest here only because they're the same quantity in two units at a fixed height, so the mapping between the axes is arithmetic rather than a flattering choice. The BMI axis is widened to fit the WHO 18.5–25 band, which is what the second axis buys and also why its line reads gentler.

  Underneath is a colour-banded table — weight, BMI, waist, waist-to-height — scored the same way the [heatmap](./heatmap-scoring.md) is, one row per day something was actually recorded. Nothing is carried forward: a weight repeated down the column would colour days nobody stood on the scales.

  **Waist-to-height leads the page and stays off the chart.** It needs no scales, it catches central adiposity that BMI misses entirely in someone of normal weight, and the healthy limit is one number worth remembering — keep your waist under half your height. It's in the table rather than the chart because it moves over months: eleven coloured cells render it better than a line of eleven points across two years.
- **Labs** — blood marker results, grouped by marker name.
- **Notes** — a searchable diary.
- **Docs** — photographed documents.
- **WFH** — tap a day on a month calendar to mark it as worked in the office. Absence means "unknown," not "worked from home" — the app never infers this.
- **Reports** — cross-metric views over the whole dataset. Everywhere else in the app, one page answers one question about one signal; a report asks something that only makes sense sliced across several at once, which is why they get their own list rather than more sidebar entries. There are three:

  **Work From Home** averages every tracked metric by day type (WFH, office, weekend) over a 90-day/1-year/all-time window, with a biggest-swings chart and a full comparison table. A weekday only counts toward WFH or office inside the range your office-day record actually covers — outside it, it's excluded rather than assumed WFH. The office calendar itself (yearly totals, a per-month breakdown, a heatmap) is still reachable from the WFH and Reports pages.

  **Seasons** averages every metric by season instead, for the shifts that only show up across a year — how much less you move in winter, what the light does to your sleep.

  **AI Prompt Report** renders your whole record as one markdown document, with a range picker and a copy box, meant to be pasted into ChatGPT, Gemini or Claude for your own health insight. **No LLM is called by the app or the server** — nothing here talks to an AI provider. The bet is that you're going to paste this somewhere external anyway, so the page's only job is to make that paste complete and unambiguous. It defaults to all time rather than a recent slice, since a model asked for insight does better with more history. (If you'd rather a model read your data directly and interactively, that's what [MCP integration](./mcp-integration.md) is for.)

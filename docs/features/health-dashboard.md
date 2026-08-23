---
sidebar_position: 2
---

# The Health dashboard

Health is the app's home page. The sidebar is organised into four sections:

## Day

- **Entries** — every hand-logged entry (diet, exercise, gut, vitals, notes, documents, body measurements, fitness tests) flattened into one chronological timeline, paged a day at a time. Entries render as cards left to right, earliest to latest, and wrap onto new rows as the window narrows.
- **Today** — the most recent day holding data (not literally today; if your watch hasn't synced yet this morning, showing an empty "today" would be less useful than showing last night's real numbers, with the header stating which day it actually is).
- **Trends** — several metrics plotted over a 30/90/365-day window, each with a trailing moving average.
- **Heatmap** — see [Heatmap & scoring](./heatmap-scoring.md).

## Wearable

Pulled in automatically once [Fitbit is connected](../getting-started/fitbit-setup.md):

- **Sleep** — see [Sleep](./sleep.md).
- **Heart** — resting heart rate and HRV over time (each plotted against a trailing 30-day baseline), a per-day heart rate trace with Fitbit's own zone boundaries, and a scored table (resting HR, HRV, VO2max, active/vigorous minutes).
- **Activity** — see [Activity](./activity.md).

## Fitness

- **Workout** — pick one of two curated exercise-video playlists (an OPEX Fitness mobility library, a Darebee bodyweight library) and step through it one clip at a time, in a random order. The player shows a muted, looping video, a per-clip timer with 30/60/90-second audio cues, and Complete/Skip actions. Completing a clip logs it as an exercise session — the same record the Activity page's logged-sessions table and the MCP tools read.

## Logged

Everything you record by hand:

- **Habits** — see [Habits](./habits.md).
- **Diet** — a food log with keyword-based flagging (caffeine, high-sugar, good-protein, LDL-lowering) and a "most eaten" view. There's no macro/calorie tracking — this logs *what* you ate, not a nutrition breakdown.
- **Gut** — Bristol stool scale entries, plus a correlation view suggesting foods eaten before a bad day. This is explicitly framed as association, not causation — the view carries how many days each suspect food was actually eaten, specifically so a food you eat constantly (like breakfast) doesn't look falsely indicted just because it precedes everything.
- **BP + Weight** — blood pressure and weight entries.
- **Body** — tape-measure body measurements (waist, hips, neck, body fat %) and periodic fitness tests (grip strength, sit-to-stand reps, dead hang time).
- **Labs** — blood marker results, grouped by marker name.
- **Notes** — a searchable diary.
- **Docs** — photographed documents.
- **WFH** — tap a day on a month calendar to mark it as worked in the office. Absence means "unknown," not "worked from home" — the app never infers this.
- **Reports** — cross-metric views over the whole dataset. Currently one report: **Work From Home**, which averages every tracked metric by day type (WFH, office, weekend) over a 90-day/1-year/all-time window, with a biggest-swings chart and a full comparison table. A weekday only counts toward WFH or office inside the range your office-day record actually covers — outside it, it's excluded rather than assumed WFH. The office calendar itself (yearly totals, a per-month breakdown, a heatmap) is still reachable from the WFH and Reports pages.

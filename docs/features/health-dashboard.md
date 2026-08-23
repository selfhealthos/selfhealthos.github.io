---
sidebar_position: 2
---

# The Health dashboard

Health is the app's home page. The sidebar is organised into three sections:

## Day

- **Today** — the most recent day holding data (not literally today; if your watch hasn't synced yet this morning, showing an empty "today" would be less useful than showing last night's real numbers, with the header stating which day it actually is).
- **Trends** — several metrics plotted over a 30/90/365-day window, each with a trailing moving average.
- **Heatmap** — see [Heatmap & scoring](./heatmap-scoring.md).

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
- **Office days** — a simple calendar of which days you worked from an office. Absence means "unknown," not "worked from home" — the app never infers this.

## Wearable

Pulled in automatically once [Fitbit is connected](../getting-started/fitbit-setup.md):

- **Sleep** — see [Sleep](./sleep.md).
- **Heart** — resting heart rate and HRV over time (each plotted against a trailing 30-day baseline), a per-day heart rate trace with Fitbit's own zone boundaries, and a scored table (resting HR, HRV, VO2max, active/vigorous minutes).
- **Activity** — see [Activity](./activity.md).

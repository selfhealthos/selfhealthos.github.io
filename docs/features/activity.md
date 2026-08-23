---
sidebar_position: 4
---

# Activity

Two resolutions:

- **Day view** — a cumulative step-climb chart for a single day (only the minutes where the count actually changed are plotted, so the chart isn't thousands of flat points), hourly step buckets, and the time you crossed your daily step goal.
- **History view** — steps per day over a window, an intensity band per day, a 7-day trailing mean (once at least 4 of the last 7 days have data), and a scored table.

Logged workouts (recorded separately from step-derived activity) appear grouped both by type and by week.

## What's deliberately left out of scoring

Fitbit reports `floors` and `active_zone_minutes` as `0` on days it simply didn't measure them — not just on days you were genuinely inactive. Scoring those numbers directly would make an untracked day look identical to (or worse than) a lazy one. The app sums only the sub-fields it can confirm were actually reported and shows "no data" rather than a false zero when nothing was.

The step goal shown is 10,000 — a round, commonly-cited target — but the scoring curve plateaus at that number rather than requiring it exactly, and gives most of its credit by around 8,000.

---
sidebar_position: 9
---

# Gym

Weight-training sets logged on your phone, summarised two ways: one chart for whether the work is going up, one grid for what you actually lifted.

## Tonnage

The chart is **tonnage per session** — every set's weight multiplied by its reps, summed across the day.

Tonnage is the headline number because session count and top weight both fail at the same question: *am I doing more work than I was?* A week of heavy triples and a week of light high-rep work can show an identical number of sessions and an identical best lift while differing by half in total work done. Tonnage separates them.

Three figures sit above the chart: total tonnage for the window, sessions, and mean tonnage **per session**. Per session, not per day — dividing a month's work by thirty would count every rest day as a training day and make consistent training look like decline.

## Working weights

Under the chart is a grid: one row per exercise, one column per session, **newest session on the left**.

That orientation is the point. The question this page exists for is "what was I squatting three weeks ago", and answering it wants the dates side by side on one row rather than a card per day you have to page through.

Each cell shows the day's tonnage for that movement, with the sets beneath it:

| Exercise | Aug 26 | Aug 24 | Aug 22 |
| --- | --- | --- | --- |
| Bench Press | **960 kg**<br />60x8 60x8 | **920 kg**<br />57.5x8 57.5x8 | — |
| Squat | **1,350 kg**<br />90x5 90x5 90x5 | — | **1,275 kg**<br />85x5 85x5 85x5 |
| Chin Ups | 10 reps | — | 9 reps 8 reps |

Rows are ordered by total work carried over the window, so the movements your training is actually built on sit at the top rather than whatever sorts first alphabetically.

## Two things the page deliberately does not do

**Rest days are absent, not zero.** A day you didn't train has no bar and no column. Padding the gaps with zeroes would flatten the chart with troughs you never lived and imply sessions that never happened — and dropping them keeps the chart's bars and the grid's columns on identical dates, so the two read as one picture.

**Bodyweight work shows reps, not "0 kg".** Chin-ups and press-ups carry no external load, so their tonnage genuinely is zero. Printing `0 kg` over a set of chin-ups reads as a failed entry, so those cells drop the tonnage line and show the sets alone.

## Where the data comes from

Sets are logged in the Android app's Gym tab and sync to the portal over its own endpoint, separately from every other entry type — a set has to be merged after the exercise it links to, and nothing else has that ordering problem.

Individual sets also appear on [Entries](./health-dashboard.md) for the day they were done, grouped into one card per exercise.

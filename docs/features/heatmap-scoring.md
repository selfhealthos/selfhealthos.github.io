---
sidebar_position: 6
---

# Heatmap & scoring

The heatmap is every tracked metric, one row per day, colour-banded by how good or bad that day's value was. It's the one page in the app where colour carries a judgement, so it's worth explaining how that judgement is made.

## Piecewise, not linear

Every scored metric uses a curve through explicit, cited anchor points — not a simple "min is bad, max is good" ramp. A straight ramp can't express:

- **Two-sided optima** — sleep duration, blood pressure, BMI, and Bristol stool score are all bad too low *and* too high, with a good middle. A linear ramp only has one good end.
- **Plateaus** — step count credit rises quickly and then flattens; there's no extra credit for 20,000 steps over 12,000.
- **"Not scored, on purpose"** — raw weight is deliberately never colour-scored on its own (only BMI is, and only once your profile has a height set) — a lower number isn't inherently "better," and scoring it would imply otherwise.

Every threshold on the heatmap carries a cited evidence string, visible in the cell — the app's position is that a colour that can't say why it's red is decoration, not information.

## Personalised thresholds

Two thresholds adjust to you specifically:

- **VO2max** is banded against age and sex, shifting from a 40-year-old-male reference baseline once your profile has a birth date and sex set.
- **BMI** is only shown as a scored cell at all once your profile has a height set — unscored otherwise, rather than silently using a wrong assumption.

Set both on your [profile page](../getting-started/installation.md).

## Recovery: worst-wins, not averaged

The dashboard's daily "recovery" indicator takes the *worst* of HRV, resting heart rate, and sleep efficiency — not their average. Averaging a bad HRV reading against an otherwise-good night's sleep would hide exactly the day worth flagging; worst-wins surfaces it instead. An input that's missing simply isn't counted — it's never treated as a zero.

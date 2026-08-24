---
sidebar_position: 6
---

# Heatmap & scoring

The heatmap is every tracked metric, one row per day, colour-banded by how good or bad that day's value was. It's the one page in the app where colour carries a judgement, so it's worth explaining how that judgement is made.

## Piecewise, not linear

Every scored metric uses a curve through explicit, cited anchor points — not a simple "min is bad, max is good" ramp. A straight ramp can't express:

- **Two-sided optima** — sleep duration, blood pressure, BMI, and Bristol stool score are all bad too low *and* too high, with a good middle. A linear ramp only has one good end.
- **Plateaus** — step count credit rises quickly and then flattens; there's no extra credit for 20,000 steps over 12,000.
- **"Not scored, on purpose"** — raw weight is never colour-scored against a population threshold, because there isn't one: a lower number isn't inherently "better," and scoring it would imply otherwise. On the heatmap it stays plain, and BMI beside it carries the colour once your height is set. On the Body page it bands only if you set a *target weight* — the column header names the target, so the colour means "against the number you chose," never "against health."

Every threshold on the heatmap carries a cited evidence string, visible in the cell — the app's position is that a colour that can't say why it's red is decoration, not information.

## Personalised thresholds

Two thresholds adjust to you specifically:

- **VO2max** is banded against age and sex, shifting from a 40-year-old-male reference baseline once your profile has a birth date and sex set.
- **BMI** is only shown as a scored cell at all once you've set a height — unscored otherwise, rather than silently using a wrong assumption.
- **Waist circumference** (Body page) bands against the WHO cut-offs, which are sex-specific and 14 cm apart. Without a sex on your profile it stays uncoloured rather than picking one on a coin toss.
- **Weight** (Body page) bands only against a target weight you set yourself, and not at all otherwise.

Birth date and sex are on your **Profile** page. Height and target weight are on the **Body** page, next to the numbers they're the denominator of.

## Waist-to-height

The Body page adds one threshold the heatmap doesn't carry: waist ÷ height, banded 0.4–0.49 healthy, 0.5–0.59 increased, 0.6+ high (NICE NG246; Ashwell boundary values). It's scored from *both* ends — a ratio under 0.4 is underweight or a mis-read tape, not a better result than 0.45.

It's not on the heatmap on purpose. A waist is measured every few weeks, so it would be two columns that are blank on most days — the shape the heatmap already drops empty columns to avoid.

## Recovery: worst-wins, not averaged

The dashboard's daily "recovery" indicator takes the *worst* of HRV, resting heart rate, and sleep efficiency — not their average. Averaging a bad HRV reading against an otherwise-good night's sleep would hide exactly the day worth flagging; worst-wins surfaces it instead. An input that's missing simply isn't counted — it's never treated as a zero.

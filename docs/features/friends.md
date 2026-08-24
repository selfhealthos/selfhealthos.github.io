---
sidebar_position: 8
---

# Friends & shared workouts

Two people in the same room, one screen, one press of **Complete** — and the exercise lands on both dashboards, with both charts counting the minutes.

That's the whole feature. Everything below is how you get there and what it can and can't do.

## Adding a friend

Go to **Friends** in the sidebar. You can add someone two ways:

- **By username** — type it exactly. There's no user search or browsable member list, on purpose (see [Why there's no user directory](#why-theres-no-user-directory)).
- **By friend code** — a short code shown on your own Friends page, like `KM4RTQ9HDX`. Read it out, text it, paste it in chat. You can generate a new one at any time, which immediately stops the old one working.

They'll see the request on their own Friends page and can accept or decline. Nothing is shared until they accept.

You can also turn off **"Let people add me by username"**, which makes your friend code the only way to reach you.

## Choosing who shows up in the player

You might have ten friends and only ever train with one. **Settings → Working out with friends** lists everyone you know with a checkbox each; only the ticked ones appear in the workout player.

This is purely about keeping the player tidy. **It is not a privacy setting** — unticking someone does not stop them adding a shared workout to your log. The setting that controls *that* is directly above it, and it's covered next.

## Working out together

Open any playlist under **Workout**. Above the video you'll see a chip for each friend you ticked in Settings. Tap the ones who are actually with you, then use the player as normal.

Every time you press **Complete**, that clip is written to your log *and* theirs — each with their own entry, their own timestamp, and their own chart. They don't need the page open, and they don't need to do anything.

A few details worth knowing:

- **You both get one entry, not two.** If you're both looking at your own phones and you both press Complete on the same exercise, the second press is recognised as the same workout rather than logged again. Nobody's minutes get doubled.
- **Entries say who added them.** A workout somebody else logged for you shows "with *their username*" in your recent-sessions list, so an entry you don't remember doing is never a mystery.
- **You can delete any of them**, the same as any other entry. They're your rows.
- **Time zones are handled per person.** If you're training with someone in another country over video, late-evening-for-you can be a different calendar day for them, and each entry is filed under the right day for whoever it belongs to.
- **If someone can't be logged for**, the whole press is refused with an explanation and nothing is recorded — rather than quietly skipping them and leaving you thinking it worked.

## Turning it off

**Settings → Working out with friends → "Let my friends add shared workouts to my log"**. Turn it off and nobody can write to your log but you. Friends will still see your name in their picker, greyed out, so they know why they can't tick you rather than wondering where you went.

Removing a friend also stops any future shared workouts. It does **not** delete past ones — a workout you did together happened, and unfriending someone doesn't un-happen it.

## What friends can and can't see

This is the important part, and it's deliberately narrow.

A friend can do **exactly one thing**: add an exercise entry to your log when you work out together.

A friend **cannot**:

- see your entries, metrics, charts, days, food log, weight, sleep, or anything else
- see who else you're friends with
- read anything at all through the API or MCP

There is no shared timeline, no profile, no feed. Those are [planned](../roadmap.md), and when they arrive they'll be opt-in per category with their own visibility controls. The friend graph exists today only to make shared workouts work.

Access tokens follow the same rule: the **Claude / MCP** token presets deliberately don't include the friends permissions, so an MCP client connected to your instance can't enumerate who you know or write into anyone else's log.

## Why there's no user directory

On an instance with a few hundred accounts, a searchable member list is a scrape target — and for a health app, "who has an account here" is itself something worth not publishing.

So username lookup is exact-match only, and a request for a name that doesn't exist, a name belonging to someone who's turned off username discovery, and a name belonging to someone who's blocked you all get the **same** response: *"If that account exists and accepts requests, they'll see yours."*

That's intentionally unhelpful. If the app said "no such user" it would confirm the accounts that *do* exist, one guess at a time. Friend codes exist so you can be found deliberately without being findable by anyone typing likely names.

## Blocking

If someone shouldn't be able to reach you at all, **Block** them. That ends any friendship, stops all future requests, and — because it's enforced in one place — will cover the timeline and comments too when those arrive. A blocked person isn't told they were blocked; their requests simply go nowhere.

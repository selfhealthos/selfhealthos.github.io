---
sidebar_position: 4
---

# Connect Withings

Withings scales sync weight, body composition and — if you own a blood pressure monitor on the same account — blood pressure readings. Once connected, a background job pulls new measurements in the same way the Fitbit integration does.

## What your scale actually measures

Withings scales differ enormously, and only weight is common to all of them. Before you set this up, it's worth knowing what your own hardware will produce:

| Scale | Weight | Body fat | Muscle / bone / water | Heart rate | Skin temperature |
|---|---|---|---|---|---|
| Body / WS-30 | ✅ | — | — | — | — |
| Smart Body Analyzer (WS-50) | ✅ | ✅ | — | ✅ | — |
| Body+ | ✅ | ✅ | ✅ | — | — |
| Body Cardio | ✅ | ✅ | ✅ | ✅ | — |
| Body Smart | ✅ | ✅ | ✅ | ✅ | — |
| Body Comp | ✅ | ✅ | ✅ | ✅ | ✅ |
| BodyScan | ✅ | ✅ | ✅ | ✅ | ✅ |

**No Withings scale measures blood oxygen (SpO2).** That sensor lives on the ScanWatch line and on the BodyScan 2, not on the scales. If you're looking for overnight oxygen data, it has to come from a watch.

Of these, SelfHealthOS currently stores **weight**, **body fat percentage**, and **blood pressure**. Muscle mass, bone mass, hydration and visceral fat are read from the API but have nowhere to go yet — they need metric keys that don't exist, which is a deliberate step rather than a side effect (see the [roadmap](../roadmap.md)).

Not sure which scale you have? The Withings app lists it under **Devices**. The model number is also printed on the underside — `WBS13` is a Body Smart, `WBS12` a Body Comp, `WBS05` a Body+, `WBS04` a Body Cardio.

## Before you start: HTTPS is required

Withings only accepts an **https** callback URL when you register an application. Fitbit is more relaxed about this; Withings is not.

If your instance serves plain HTTP — the default — you need TLS in front of it before Withings can be connected at all. Either:

- put it behind your own reverse proxy (see [Reverse proxy](../self-hosting/reverse-proxy.md)), or
- use the bundled `compose.tls.yaml` overlay, which adds a Caddy container holding a certificate you supply.

Withings never actually *fetches* the callback URL — it returns a redirect your own browser follows — so the hostname doesn't have to be public or resolvable from the internet. The https requirement is enforced at registration time, not at redirect time. A certificate for a LAN hostname or IP is fine, as long as your browser accepts it.

Your instance's Settings page shows a warning on the Withings card if the callback it would send is still `http://`.

## 1. Register a Withings application

Go to **[developer.withings.com/dashboard](https://developer.withings.com/dashboard/)**, create a free account, and register an application:

- Choose the **Public API** tier — it's free and it's what the measure API needs.
- **Callback URI**: exactly the callback URL shown on your instance's Settings page. It must match character-for-character, including scheme and any trailing slash.

## 2. Copy the credentials in

On your instance, go to **Settings → Wearables → Withings**, and:

1. Copy the **Callback URI** shown there into your Withings application (step 1), if you haven't already.
2. Copy the **Client ID** and **Consumer Secret** from the Withings dashboard into the form.
3. Click **Save credentials**.
4. Click **Connect Withings** — this sends you to Withings to authorize, then back to your instance.

As with Fitbit, the client secret is write-only: once saved the form always shows it blank, because the server genuinely can't show it back to you.

## 3. Import your history

Connecting only syncs recent measurements. If you've been weighing yourself on a Withings scale for years, that history is worth bringing in all at once — and you don't need to wait for the connection to catch up.

Export your data from the Withings app (**Profile → Download my data**), which arrives as a zip of CSV files, then:

```bash
docker compose exec django python manage.py import_withings \
  --user yourusername --dry-run /path/to/weight.csv
```

`--dry-run` parses the file and reports what it found without writing anything. Run it first on a real export — it will tell you the date range, the number of readings, and a sample of what it parsed. Drop the flag to write:

```bash
docker compose exec django python manage.py import_withings \
  --user yourusername /path/to/weight.csv /path/to/bp.csv
```

The import is **idempotent**: readings are keyed on the instant they were taken, so running it twice, or importing a period the live sync has already covered, adds nothing the second time. Import years of history once, then let the ordinary sync keep up — the two overlap at the join without doubling anything.

The command also accepts a `getmeas` JSON dump if you have one, which is preferable when your history spans a move between timezones — see below.

## 4. Sync

Once connected, sync runs as a background job. A **Sync now** control is available from the dashboard, the same as for Fitbit.

Weight readings land as ordinary weight entries — the same kind of record you'd create by typing a weight into the app — so they appear on the entries timeline, feed the weight/BMI chart, and can be corrected or deleted individually. They are not a separate, read-only class of data.

## Notes and troubleshooting

- **Units.** Withings exports CSV in whatever unit your account is set to, so the same file is `Weight (kg)` for one person and `Weight (lb)` for another. The importer reads the unit from the column header and converts. If a mass column has no unit in its header, the import stops rather than guessing — reading pounds as kilograms is an error of 2.2x that looks entirely plausible on a chart.
- **Timezones.** Measurements pulled through the API carry the timezone they were taken in, so a weigh-in on holiday is filed under the calendar day it was actually morning on. CSV exports carry no timezone at all — those are interpreted in your profile's timezone. If your history spans a move between timezones, prefer a JSON dump over the CSV.
- **Blank cells are "not measured", not zero.** Withings leaves body-composition columns empty on a weigh-in that took no impedance reading. Those are skipped rather than recorded as 0.
- **"Needs reconnecting" status.** Withings refresh tokens rotate on every use and expire after a year. If a refresh fails — for instance because you revoked access from your Withings account — the connection is marked expired and you'll need to click **Connect Withings** again.
- **Callback URI mismatch.** Withings rejects the OAuth flow if the registered Callback URI doesn't match exactly. Re-check it against what's shown in Settings, including `http` vs `https` and any trailing slash.

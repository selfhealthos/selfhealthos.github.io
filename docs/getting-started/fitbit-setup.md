---
sidebar_position: 3
---

# Connect Fitbit

Fitbit is one of two wearable integrations — see [Connect Withings](./withings-setup.md) for scales. Once connected, a background job pulls your sleep sessions (with hypnogram detail), heart rate, and activity data in.

## 1. Register a Fitbit app

Go to **[dev.fitbit.com/apps/new](https://dev.fitbit.com/apps/new)** and register an app with:

- **OAuth 2.0 Application Type: Personal** — this is what grants intraday heart rate data for your own account without Fitbit's approval process. "Server" or "Client" app types will not give you minute-level heart rate.
- **Redirect URL**: exactly the callback URL shown on your instance's Settings page (see below) — it must match character-for-character, including scheme.

## 2. Copy the credentials in

On your instance, go to **Settings → Wearables → Fitbit**, and:

1. Copy the **Redirect URL** shown there into your Fitbit app registration (step 1), if you haven't already.
2. Copy the **OAuth 2.0 Client ID** and **Client Secret** from your Fitbit app registration into the form.
3. Click **Save credentials**.
4. Click **Connect Fitbit** — this sends you to Fitbit to authorize, then back to your instance.

The client secret is write-only: once saved, the form always shows it blank. There's no "reveal" button, because the server genuinely can't show it back to you — only re-enter and re-save it if you need to change it.

## 3. Sync

Once connected, sync runs as a background job — you don't need to trigger it by hand, though a **Sync now** control is available from the dashboard. A full history backfill (rather than the incremental daily sync) can also be run from the command line if you're bringing in months of existing Fitbit history at once:

```bash
docker compose exec django python manage.py backfill_fitbit --user yourusername --days 365
```

This uses Fitbit's range endpoints where they exist, so it costs a fraction of the API requests a day-by-day sync would — Fitbit's rate limit is 150 requests/hour, and range backfills use roughly 30 requests for a 90-day window instead of the ~1,300 a naive per-day sync would need.

## Troubleshooting

- **"Needs reconnecting" status**: Fitbit access tokens expire and are refreshed automatically on sync; if a refresh fails (e.g. you revoked access from Fitbit's side), the connection is marked expired and you'll need to click **Connect Fitbit** again.
- **Redirect URL mismatch**: Fitbit rejects the OAuth flow with an error if the registered Redirect URL doesn't match exactly. Re-check it against what's shown in Settings, including trailing slashes and `http` vs `https`.

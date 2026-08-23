---
sidebar_position: 1
---

# Feature overview

## Account & access

- **Multi-user, self-serve signup** — username and password only, no complexity rules imposed. This is your own server; `admin`/`admin` is a legitimate choice if that's what you want.
- **Profile page** — a photo, your birth date, and sex. Birth date and sex feed the age/sex-personalised scoring bands used across the dashboard (VO2max, heart rate) — see [Heatmap & scoring](./heatmap-scoring.md).
- **Settings page** — manage your Fitbit connection, generate scoped API access tokens, and get a ready-to-run command to connect the instance to Claude Code over MCP.
- **A friendly, interactive API** — every endpoint documented and callable from a Swagger UI at `/api/docs` on your own instance.
- **An MCP endpoint** — Claude Code (or any MCP client) can query your data directly. See [MCP integration](./mcp-integration.md).

## The Health dashboard

Health is the home page — not one app among several, the whole point. See [The Health dashboard](./health-dashboard.md) for the full page-by-page tour; in short:

- **Daily summary & trends** — a day view, and multi-metric trend charts over 30/90/365-day windows.
- **[Scored heatmap](./heatmap-scoring.md)** — every tracked metric, every day, colour-banded against literature-backed thresholds.
- **[Sleep](./sleep.md)** — hypnogram, sleep architecture (onset, REM latency, wake episodes, cycles), overnight oxygen, and a plain-language verdict per night.
- **Heart rate** — resting HR, HRV, heart rate zones, baselines.
- **[Activity](./activity.md)** — step count, cumulative climb, logged workouts.
- **Food diary** — with keyword-based flagging (caffeine, high-sugar, good-protein, etc.) and a gut-correlation view.
- **[Habits](./habits.md)** — a completion grid with streaks and completion rates.
- **Body measurements, lab results, notes, documents, office days** — the rest of what a health record needs, all searchable.

## Deployment

- **One `docker compose up`** — Postgres, Redis, the API, the MCP server, a background worker, and the frontend, all in one stack.
- **No bundled reverse proxy** — plain HTTP by default (the MCP endpoint doesn't need TLS to work); front it with your own reverse proxy if you want public HTTPS. See [Self-hosting](../self-hosting/docker-compose.md).

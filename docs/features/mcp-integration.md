---
sidebar_position: 7
---

# MCP integration

selfhealthos exposes an [MCP](https://modelcontextprotocol.io/) endpoint at `/mcp` on your instance, backed by the same service layer as the REST API — so Claude Code (or any MCP client) can query your own health data directly, in conversation.

## Connecting Claude Code

1. Go to **Settings** on your instance and create a new access token (the **Claude Code / MCP** kind is preselected sensibly, but any kind works). Pick the scopes you want it to hold — `health:read` is enough for asking questions; add `health:write` only if you also want Claude to be able to log entries on your behalf.
2. The moment the token is created, a ready-to-run command appears alongside it — this is the only time the token is shown, so copy it now:

   ```bash
   claude mcp add --transport http selfhealthos http://<your-instance>/mcp \
     --header "Authorization: Bearer <your-token>" --scope local
   ```

3. Run that command wherever you use Claude Code. No TLS or certificate setup is needed — Claude Code connects to plain `http://` MCP endpoints without complaint, which is exactly what a LAN-only or localhost instance serves by default.
4. Confirm it connected: `claude mcp list` should show the server as connected.

## What Claude can see

Six tools, shaped around the questions people actually ask rather than one per REST endpoint:

| Tool | Scope | Answers |
|---|---|---|
| `health_describe` | `health:read` | What data exists, and over what period — call this first. |
| `health_day` | `health:read` | Everything recorded for one day: sleep, activity, heart, food, training, gut, habits, notes. |
| `health_trend` | `health:read` | One metric over a date range, with a moving average and a rising/falling/flat direction. |
| `health_correlate` | `health:read` | Two metrics compared over the days both were recorded, with an explicit caution that this is association, not causation. |
| `health_search` | `health:read` | Free-text search across notes and the food diary. |
| `health_log` | `health:write` | Record a new entry (weight, blood pressure, a Bristol score, a food, a note). |

A token holding only `health:read` cannot see `health_log` in its tool list at all — not just "cannot call it," genuinely hidden from discovery. Scopes are enforced at two layers: the connection itself is rejected without a valid token, and each tool call is checked against what that specific token was issued with.

## Multiple people, multiple tokens

Every token is tied to the account that created it — Claude answers "my" questions using whoever's token is presented, never anyone else's data. If more than one person uses the same selfhealthos instance, each person creates their own token from their own Settings page and connects their own Claude Code with it.

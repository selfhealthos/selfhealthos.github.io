---
sidebar_position: 1
---

# Docker Compose

selfhealthos is one `compose.yaml`, six services:

| Service | What it does |
|---|---|
| `db` | Postgres 17 |
| `redis` | Celery broker, and Django's cache |
| `django` | The REST API |
| `mcp` | The MCP endpoint — same service layer as `django`, its own container so it can be reached over the [Streamable HTTP](https://modelcontextprotocol.io/) transport |
| `worker` | A Celery worker for background jobs — Fitbit sync/backfill and metric rollups, kept out of request handlers because a Fitbit backfill is dozens of HTTP round trips |
| `next` | The frontend, and the only service that publishes a port — it proxies `/api`, `/admin`, `/media`, `/static` and `/mcp` to their own containers over the internal compose network |

`compose.dev.yaml` is an overlay, not a separate stack — it bind-mounts your working copy over each backend container and switches on hot reload, layered on top of `compose.yaml` via `COMPOSE_FILE` in `.env`. Delete that line for a stack that runs the built images as-is.

## Data

Three named volumes: `pgdata` (the database), `redisdata`, and `media` (uploaded photos — avatars, diet/document photos). Back up `pgdata` and `media` if you care about not losing your data; `redisdata` is disposable cache/queue state.

## Updating an existing instance

See [Upgrading](./upgrading.md).

## Running it somewhere other than localhost

See [Reverse proxy & HTTPS](./reverse-proxy.md) for exposing this beyond your own machine, and [Configuration → Site identity](../getting-started/configuration.md#site-identity) for the four variables that need to agree with wherever you're reaching it from.

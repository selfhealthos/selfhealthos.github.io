---
sidebar_position: 1
---

# Installation

selfhealthos ships as a single Docker Compose stack: Postgres, Redis, the Django API, the MCP server, a Celery worker, and the Next.js frontend. There's no bundled reverse proxy — the stack serves plain HTTP by default, which is genuinely fine for a homelab: nothing here, including the MCP endpoint, needs TLS to work.

## Prerequisites

- Docker and Docker Compose (the `docker compose` plugin, not the old standalone `docker-compose`)
- Nothing else — no external database, no external Redis, no reverse proxy required

## Quick start

```bash
git clone https://github.com/selfhealthos/selfhealthos.git
cd selfhealthos
cp .env.example .env
docker compose up -d
docker compose exec django python manage.py migrate
```

Then open **http://localhost** and sign up. The first account you create is a normal account — there's no separate "create an admin" step; if you want an account with access to Django's admin site too, create a superuser instead:

```bash
docker compose exec django python manage.py createsuperuser
```

## What just happened

`.env.example`'s defaults work as-is for running this on the same machine you're browsing from. Two things are worth understanding before you go further:

- **`COMPOSE_FILE=compose.yaml:compose.dev.yaml`** is set by default. That layers the *dev* overlay on top — bind-mounted source and hot reload — which is what you want if you're also going to edit the code. If you just want to run the app, delete that line (and `COMPOSE_PATH_SEPARATOR`) from `.env` so only the production-shaped `compose.yaml` applies.
- **Migrations aren't run automatically.** `docker compose up` brings the containers up; `manage.py migrate` is a separate, deliberate step, the same way it would be if you ran this without Docker at all. Run it again after any update that includes a migration (see [Upgrading](../self-hosting/upgrading.md)).

## Reaching it from another device

`SITE_URL`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS` and `NEXT_PUBLIC_SITE_URL` in `.env` all default to `localhost` — fine for the machine running Docker, not reachable from your phone on the same network. If you want to reach it from elsewhere on your LAN, set all four to match your machine's actual address, e.g.:

```bash
SITE_URL=http://192.168.1.50
DJANGO_ALLOWED_HOSTS=192.168.1.50
DJANGO_CSRF_TRUSTED_ORIGINS=http://192.168.1.50
NEXT_PUBLIC_SITE_URL=http://192.168.1.50
```

**`127.0.0.1` must stay in `DJANGO_ALLOWED_HOSTS` alongside whatever you add** — Docker's own healthcheck for the `django`/`mcp` containers calls itself over the loopback address, and if that check can never pass, the frontend container waits for it forever and never starts.

Then `docker compose up -d` again to pick up the change, and see [Reverse proxy & HTTPS](../self-hosting/reverse-proxy.md) if you want a real domain and public HTTPS instead of a bare LAN IP.

## Next steps

- [Configuration reference](./configuration.md) — every `.env` variable, what it does
- [Connect Fitbit](./fitbit-setup.md) — sync sleep, heart rate and activity from a Fitbit account
- [Feature overview](../features/overview.md) — what's actually on the dashboard

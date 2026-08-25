---
sidebar_position: 2
---

# Configuration reference

Everything is set in `.env` at the repo root (copied from `.env.example`). This page explains every variable; `.env.example` itself carries a shorter version of the same notes.

## Compose

| Variable | Default | What it does |
|---|---|---|
| `COMPOSE_FILE` | `compose.yaml:compose.dev.yaml` | Layers the dev overlay (bind-mounted source, hot reload) on top of the base stack. Delete this line (and `COMPOSE_PATH_SEPARATOR`) for a production-shaped deploy running only `compose.yaml`. Also how you opt into the two ingress overlays below. |
| `HTTP_PORT` | `80` | The host port the app is published on. Change if `80` is already taken. Accepts a bind address too — `127.0.0.1:8080` publishes to loopback only, which is what you want when something else is terminating TLS in front. |
| `INGRESS_NETWORK` | — | Only with `compose.proxy.yaml`. The existing Docker network your reverse proxy runs on; `next` joins it so the proxy can reach the container directly. |

### TLS terminator

Only read this row group if `COMPOSE_FILE` names `compose.tls.yaml` — the overlay that serves HTTPS when you *don't* already run a reverse proxy. See [Reverse proxy & HTTPS](../self-hosting/reverse-proxy.md#https-without-a-proxy-of-your-own-composetlsyaml) for the full picture.

| Variable | Default | What it does |
|---|---|---|
| `TLS_SITE_ADDRESS` | *(required)* | Comma-separated addresses the terminator answers on, e.g. `https://192.168.1.50, https://selfhealth.example.com`. A bare IP is fine and is usually the point. |
| `TLS_SNI` | *(required)* | The certificate to fall back to when a client sends no SNI — which is always the case when connecting to an IP, since that field carries a hostname and never an address. Without it the handshake aborts. |
| `TLS_CERT_FILE` | *(required)* | Absolute host path to the certificate. Mounted as a single file, not its directory. |
| `TLS_KEY_FILE` | *(required)* | Absolute host path to the private key. Same. |
| `TLS_HTTP_PORT` | `80` | Host port for the terminator's HTTP listener, which redirects to HTTPS. |
| `TLS_HTTPS_PORT` | `443` | Host port for the terminator's HTTPS listener. |

## Site identity

These four need to agree with each other and with however you actually reach the instance in a browser:

| Variable | Default | What it does |
|---|---|---|
| `SITE_URL` | `http://localhost` | The full URL you'll type into a browser. |
| `DJANGO_ALLOWED_HOSTS` | `localhost` | Comma-separated hosts Django will accept a request addressed to — same host as `SITE_URL`, without the scheme. You don't need to add `127.0.0.1` or `django` yourself — those are internal compose-network hostnames the backend always accepts, regardless of what's set here. |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | `http://localhost` | Comma-separated origins (with scheme) allowed to make unsafe requests — same value as `SITE_URL`. |
| `NEXT_PUBLIC_SITE_URL` | `http://localhost` | Browser-visible origin, must match `SITE_URL`. Only used as a last-resort fallback when a request arrives with no usable `Host` header at all — in practice this rarely matters. |

If you change these to reach the app from another device, see [Installation → Reaching it from another device](./installation.md#reaching-it-from-another-device).

## Django

| Variable | Default | What it does |
|---|---|---|
| `DJANGO_SETTINGS_MODULE` | `selfhealthos.settings.dev` | Set to `selfhealthos.settings.prod` for a production-style deploy — enables secure cookies and HSTS. |
| `DJANGO_SECRET_KEY` | placeholder, **must be changed** | Django's signing key. Generate one with `python -c "import secrets; print(secrets.token_urlsafe(64))"`. |
| `DJANGO_DEBUG` | `true` | Set `false` for a production-style deploy. |
| `DJANGO_LOG_LEVEL` | `INFO` | Standard Python logging level. |
| `DJANGO_TIME_ZONE` | `UTC` | Server-side time zone. Per-account display time zone is separate and lives on the account. |

## Database & cache

| Variable | Default | What it does |
|---|---|---|
| `POSTGRES_DB` / `POSTGRES_USER` / `POSTGRES_PASSWORD` | `selfhealthos` / `selfhealthos` / placeholder | Credentials for the bundled Postgres container. Change the password before deploying anywhere but your own machine. |
| `DATABASE_URL` | `postgresql://selfhealthos:dev-only-insecure-password@db:5432/selfhealthos` | Must match the three `POSTGRES_*` values above — this isn't derived automatically, so if you change the password, update this too. |
| `REDIS_URL` | `redis://redis:6379/0` | Celery broker/result backend. No reason to change this unless you're running Redis outside the compose stack. |

## Wearable connections

| Variable | Default | What it does |
|---|---|---|
| `CREDENTIAL_ENCRYPTION_KEY` | empty | Encrypts Fitbit OAuth credentials at rest. Optional — falls back to `DJANGO_SECRET_KEY` if unset, at the cost of every Fitbit connection needing to be re-authorised if you ever rotate that key. Generate the same way as `DJANGO_SECRET_KEY`. |

See [Connect Fitbit](./fitbit-setup.md) for the OAuth app registration steps this key protects.

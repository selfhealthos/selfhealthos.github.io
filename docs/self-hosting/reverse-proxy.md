---
sidebar_position: 2
---

# Reverse proxy & HTTPS

selfhealthos doesn't bundle a reverse proxy. That's a deliberate choice, not a missing feature: plenty of self-hosters already run one (Traefik, nginx, Cloudflare Tunnel, a Tailscale/Nginx Proxy Manager setup) in front of everything else on their box, and a second one baked into this stack would just be in the way. Two modes are supported:

## Plain HTTP (the default)

`docker compose up` serves plain HTTP on `HTTP_PORT` (default `80`). This is the whole story for running it on your own machine or LAN — and it's genuinely fine, not a compromise: **Claude Code's MCP client connects to plain `http://` endpoints with no special configuration**, so even the MCP integration works out of the box with no TLS setup at all.

## Fronting it with your own reverse proxy

If you want a real domain and public HTTPS, put your own reverse proxy in front of the `next` service (the only one that publishes a port) and let it handle TLS termination. selfhealthos doesn't need to know anything special about this — it's a normal HTTP backend from the proxy's point of view. What you *do* need to update is [Site identity](../getting-started/configuration.md#site-identity) in `.env`, so Django accepts requests addressed to your real domain and issues CSRF/session cookies correctly for it:

```bash
SITE_URL=https://selfhealth.example.com
DJANGO_ALLOWED_HOSTS=selfhealth.example.com,127.0.0.1
DJANGO_CSRF_TRUSTED_ORIGINS=https://selfhealth.example.com
NEXT_PUBLIC_SITE_URL=https://selfhealth.example.com
```

(`127.0.0.1` stays in `DJANGO_ALLOWED_HOSTS` regardless — see the note on that variable in the configuration reference.)

A minimal example nginx server block, terminating TLS and forwarding to the `next` container's published port:

```nginx
server {
    listen 443 ssl;
    server_name selfhealth.example.com;

    ssl_certificate     /etc/letsencrypt/live/selfhealth.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/selfhealth.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:80;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
    }
}
```

Forwarding `Host` (or `X-Forwarded-Host`) is the part that matters — Django's `USE_X_FORWARDED_HOST` setting is already on, so whichever your proxy sends is what gets validated against `DJANGO_ALLOWED_HOSTS` and used to build absolute URLs (like the Fitbit OAuth callback). A proxy that rewrites the `Host` header to something else will break both.

## MCP through your own proxy

If your reverse proxy fronts the whole app on one domain (the normal case), `/mcp` is already reachable at `https://your-domain/mcp` with no extra configuration — it's proxied the same way `/api` is. Generate the install command from Settings as usual; it'll use your real domain automatically.

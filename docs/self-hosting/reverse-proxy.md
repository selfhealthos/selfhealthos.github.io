---
sidebar_position: 2
---

# Reverse proxy & HTTPS

selfhealthos doesn't bundle a reverse proxy. That's a deliberate choice, not a missing feature: plenty of self-hosters already run one (Traefik, nginx, Cloudflare Tunnel, a Tailscale/Nginx Proxy Manager setup) in front of everything else on their box, and a second one baked into this stack would just be in the way. Three modes are supported:

## Plain HTTP (the default)

`docker compose up` serves plain HTTP on `HTTP_PORT` (default `80`). This is the whole story for running it on your own machine or LAN — and it's genuinely fine, not a compromise: **Claude Code's MCP client connects to plain `http://` endpoints with no special configuration**, so even the MCP integration works out of the box with no TLS setup at all.

## Fronting it with your own reverse proxy

If you want a real domain and public HTTPS, put your own reverse proxy in front of the `next` service (the only one that publishes a port) and let it handle TLS termination. If your proxy runs in Docker, `compose.proxy.yaml` is an opt-in overlay that joins `next` to your proxy's existing network so it can reach the container directly, rather than hairpinning back through a published host port:

```bash
COMPOSE_FILE=compose.yaml:compose.proxy.yaml
COMPOSE_PATH_SEPARATOR=:
INGRESS_NETWORK=my-ingress-net
```

Point the proxy at `selfhealthos-next-1:3000` — the *container* name, not the service name `next`, which other Compose projects commonly use too. selfhealthos doesn't need to know anything special about this — it's a normal HTTP backend from the proxy's point of view. What you *do* need to update is [Site identity](../getting-started/configuration.md#site-identity) in `.env`, so Django accepts requests addressed to your real domain and issues CSRF/session cookies correctly for it:

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

## HTTPS without a proxy of your own (`compose.tls.yaml`)

There's a third case the two modes above don't cover: you don't run a reverse proxy, but plain HTTP isn't good enough. The usual reason is a phone on the LAN. The Android client sends a `shos_pat_` bearer token on every sync, and over plain HTTP that token and the health payload behind it are readable by anything else on the wifi.

Neither selfhealthos image can serve TLS — `next` speaks plain HTTP on 3000, Django on 8000 — so this needs one more container. `compose.tls.yaml` is an opt-in overlay that adds exactly that and nothing else: a single `caddy:2-alpine` holding a certificate you supply, forwarding to `next`.

```bash
COMPOSE_FILE=compose.yaml:compose.tls.yaml
COMPOSE_PATH_SEPARATOR=:

TLS_SITE_ADDRESS=https://192.168.1.50
TLS_SNI=selfhealth.example.com
TLS_CERT_FILE=/path/to/server.crt
TLS_KEY_FILE=/path/to/server.key

# so the app isn't *also* reachable unencrypted
HTTP_PORT=127.0.0.1:8080
```

There's no ACME here — the certificate is supplied, not issued. That's what makes this work for a name or address no public CA will ever sign, which is the whole point on a LAN.

Update [Site identity](../getting-started/configuration.md#site-identity) to match the address you chose, exactly as with any other proxy.

:::warning Use one overlay or the other
`compose.proxy.yaml` and `compose.tls.yaml` are mutually exclusive — both want `:443`. The first hands `next` to a proxy you already run; the second *is* the proxy.
:::

### Reaching it by IP

This overlay exists mostly for the case where DNS doesn't reach the client — a phone won't use your LAN resolver unless the router advertises it, and neither iOS nor Android has a hosts file you can edit. So the address is usually a bare IP, and two things follow that are easy to miss:

**`TLS_SNI` is required, not tuning.** A client connecting to `https://192.168.1.50` sends no SNI at all — that field carries a hostname, never an address. With no name to select a certificate by, the handshake aborts before any routing happens. `TLS_SNI` names the certificate to fall back to.

**The certificate must carry the IP in its SANs**, or the client refuses what it's served even though the server offered it happily. Check before you go hunting for a proxy bug that isn't there:

```bash
openssl x509 -in server.crt -noout -ext subjectAltName
# X509v3 Subject Alternative Name:
#     DNS:selfhealth.example.com, IP Address:192.168.1.50
```

If you're issuing from your own CA, add the IP as a SAN at issue time. A certificate with only a `DNS:` entry will never validate over an IP.

### Certificate file mounts

Point `TLS_CERT_FILE` and `TLS_KEY_FILE` at the two files directly, not at the directory holding them. The overlay bind-mounts each file individually, on purpose: a certificate directory on a homelab box usually also contains your CA's private key and every other host's key, and mounting the folder would put all of them one path-traversal bug away from being served.

## MCP through your own proxy

If your reverse proxy fronts the whole app on one domain (the normal case), `/mcp` is already reachable at `https://your-domain/mcp` with no extra configuration — it's proxied the same way `/api` is. Generate the install command from Settings as usual; it'll use your real domain automatically.

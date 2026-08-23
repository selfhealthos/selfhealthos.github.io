---
sidebar_position: 1
---

# API overview

Every endpoint is documented and directly callable from your own instance — there's no separate API reference to keep in sync here, because it would just drift from the real thing.

- **Interactive docs (Swagger UI)**: `http://<your-instance>/api/docs`
- **OpenAPI schema**: `http://<your-instance>/api/v1/openapi.json`

## Authentication

Two ways to authenticate, and every endpoint accepts either:

- **Session cookie** — what the web app itself uses. Not useful for a script, since it requires a browser-based login flow and a CSRF token on unsafe methods.
- **Bearer token** — generate one from **Settings**, then send it as `Authorization: Bearer <token>` on every request. This is what you want for a script, a cron job, or anything outside the browser. Tokens are scoped (`health:read` / `health:write`) — generate one with only the scope your script actually needs.

```bash
curl http://<your-instance>/api/v1/health/summary \
  -H "Authorization: Bearer <your-token>"
```

## Design

The API is one endpoint per page, not a generic CRUD surface — `/health/heatmap`, `/health/sleep`, `/health/trend` each return a purpose-built, pre-aggregated shape rather than raw rows you'd need to join and compute over yourself client-side. If you're scripting against this API, look at what the equivalent dashboard page requests (visible in Swagger UI, or your browser's network tab against the running app) rather than assuming a generic list/detail pattern.

## MCP vs. REST

If what you actually want is to ask Claude questions about your data rather than write a script, the [MCP integration](../features/mcp-integration.md) is the more direct path — it's the same service layer, shaped as tools instead of endpoints.

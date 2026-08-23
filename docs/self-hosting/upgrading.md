---
sidebar_position: 3
---

# Upgrading

Every push to `main` builds and publishes new `backend` and `frontend` images to GHCR (see the [changelog](/blog) for what changed in each). Nothing deploys automatically — pulling and restarting is a deliberate step you control:

```bash
cd selfhealthos
git pull
docker compose pull
docker compose up -d
docker compose exec django python manage.py migrate
```

Run the migration step every time, even if you're not sure this release included one — an unapplied migration is silent until something that depends on it breaks, and `migrate` is a no-op (prints "No migrations to apply") when there's genuinely nothing to do.

## Check the changelog first

Read the [changelog](/blog) entries between your current version and the one you're upgrading to before running the commands above — a release that changes a required `.env` variable or removes one will say so there, and that's the kind of thing worth knowing before restarting a running instance rather than after.

## Rolling back

Images are tagged with the short commit SHA in addition to `latest` (see [Docker Compose](./docker-compose.md)), so pinning `compose.yaml` to a specific `image:` tag instead of building from source is the way to roll back to a known-good version if an upgrade goes wrong. Restore the `pgdata`/`media` volumes from backup too if the upgrade you're rolling back from included a migration that changed data, not just schema.

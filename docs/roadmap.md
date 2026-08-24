---
sidebar_position: 6
---

# Roadmap

What's built, and what's planned next. Nothing here is a committed date — this is the order we're thinking about, not a promise.

## Shipped

- **v0.2.0** — [Friends & shared workouts](./features/friends.md): add a friend by username or friend code, and log an exercise you did together onto both dashboards at once.
- **v0.1.0** — Multi-user accounts, the full Health dashboard, Fitbit sync, the REST API, MCP integration, and a one-command Docker Compose deploy.

See the [feature list](./features/overview.md) for the full breakdown, and the [changelog](/blog) for release-by-release detail.

## Planned

- **Shared timeline** — the friend graph that powers [shared workouts](./features/friends.md) is the foundation for this, and was designed with it in mind. An opt-in, per-category sharing model (choose in Settings whether your food log, weight entries, etc. are visible to friends or publicly), with likes and comments. Deliberately not built yet: sharing *reads* is a much bigger step than the one narrow write shared workouts need, and it deserves its own visibility model rather than a flag bolted onto this one.
- **Community forum** — a global space to ask questions, with likes, comments, and replies, independent of any one person's data.
- **Data export & import** — export your full account as a zip from the UI or the API, and re-import it into a fresh instance to restore your data and settings. Also useful for populating a test instance without re-entering everything by hand.
- **Dummy data seeding for local development** — a management command that populates a fresh dev database with realistic sample data, so contributors (and this project's own CI) don't need a real Fitbit history to work against.

## Have a request?

Open an issue on the [app repository](https://github.com/selfhealthos/selfhealthos/issues) — feature requests and bug reports both help shape what moves up this list.

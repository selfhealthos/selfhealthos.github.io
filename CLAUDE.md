# CLAUDE.md

Guidance for Claude Code (and future contributors) working in this repo.

## What this repo is

The documentation site for the `selfhealthos` app repo, built with Docusaurus's `classic` preset (gives the left-nav / content / right-TOC three-column layout for free — don't build custom layout components to achieve this). Deployed to GitHub Pages via GitHub Actions on every push to `main`; since this repo is named `<org>.github.io`, Pages serves directly from the Actions artifact with no `gh-pages` branch involved.

## Structure

- `docs/` — versioned, left-nav documentation: getting started, feature reference, self-hosting guides, API pointer. Each page needs frontmatter `sidebar_position` or an entry in `sidebars.ts`.
- `blog/` — **this is the changelog**, not a general blog. One post per release, named `YYYY-MM-DD-vX.Y.Z.md`. Keep entries short and user-facing (what changed, not commit-log detail). Truncate marker is `{/* truncate */}`, not the classic `<!--truncate-->` HTML comment — these `.md` files compile as MDX by default here, and MDX parses a raw `<!--` as a broken JSX tag rather than a comment.
- `src/pages/index.tsx` — the landing page, separate from `docs/intro.md`.
- `static/img/` — brand assets exported from the app repo's `selfhealthos-style.png` style sheet (logo, favicon, social card).

## Conventions

- This repo gets updated **alongside** the app repo, not after it — see the app repo's CLAUDE.md ("Workflow: push as you go"). A feature isn't done when the code merges; it's done when the docs describing it are pushed too.
- Keep `docs/getting-started/installation.md` in sync with the app repo's actual `compose.yaml`/`.env.example` — this is the single most load-bearing page on the site; a stale install doc breaks new users' first experience. If you change the app repo's compose file, update this page in the same body of work.
- `docs/features/overview.md` is the canonical feature list — update it when a feature ships, not after the fact.
- Every code block in the docs is free to copy without attribution (see LICENSE) — don't add license headers to snippets.
- Run `npm run build` before committing content changes; Docusaurus fails the build on broken internal links, which is the cheapest way to catch a renamed/moved page.

## Content license

Site prose is CC BY 4.0 (see [LICENSE](./LICENSE)); this is separate from the app repo's AGPLv3 code license. Don't mix the two up in headers or attribution text.

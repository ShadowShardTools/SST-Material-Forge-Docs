# Maintaining the documentation site

Notes for whoever updates the site. The user guide and node reference for SST Material Forge are built with [Docusaurus](https://docusaurus.io/) and published to GitHub Pages at <https://shadowshardtools.github.io/SST-Material-Forge-Docs/>.

## Where the content comes from

Almost nothing here is written by hand, so that the site cannot disagree with the editor:

| Content | Source of truth | How it gets here |
| --- | --- | --- |
| `docs/guide/*.md` | `docs/user-guide.md` in the application repository — the same file the editor shows under **Help** (<kbd>F1</kbd>) | `scripts/import-user-guide.mjs` splits it into pages. Tracked in git. |
| `docs/nodes/*.md` | The editor's node registry | The application's `build/exportNodeReference.mjs` writes `data/nodes.json`; `scripts/generate-node-docs.mjs` turns it into pages before every `start` and `build`. Not tracked. |
| `static/img/nodes/*.png` | The editor itself, running | The application's `npm run docs:shots` builds a small example graph for every node and saves a picture of it (`<type>.png`) and of what it makes (`<type>-result.png`); the node pages show them. Tracked in git. |
| `docs/intro.md`, `src/pages/index.tsx` | This repository | Written here. |

So to change the guide or a node's description, change the **application**, then refresh this repository from it. Edits made directly to `docs/guide/` or `docs/nodes/` are overwritten.

## Refreshing from the application

With this repository cloned inside the application's folder (as `SST-Material-Forge-Docs/`):

```sh
# From the application repository: re-export the node registry, and when a
# node or its look changed, retake the pictures (NODES=a,b retakes only those).
# It needs a GPU and opens a browser window for a few minutes.
npm run docs:nodes
npm run docs:shots

# From this repository: re-import the user guide.
node scripts/import-user-guide.mjs ../docs/user-guide.md
```

Then commit `data/nodes.json`, `docs/guide/` and `static/img/nodes/`. What feeds each node in its picture is chosen in the application's `tests/docs/nodeRecipes.ts`. If a guide section was renamed, the importer stops and names it; update the page list in `scripts/import-user-guide.mjs`.

## Versions

The site documents one release of SST Material Forge at a time, and says which: every page carries a **Version** badge, and the navbar has a version menu. The label is the version in `data/nodes.json` — the release the node reference was exported from — so it changes when the site is refreshed from a new release, and never says one version while the pages describe another. The current release is served at the root.

When a new release comes out, archive the documentation of the one before it **before** refreshing:

```sh
# 1. In this repository, while data/nodes.json still names the old release.
npm run archive-version

# 2. Then refresh from the new release, as above.
```

`archive-version` generates the node reference, snapshots every page into `versioned_docs/version-<version>/` with Docusaurus's own `docs:version`, and copies the node pictures into `static/img/versions/<version>/nodes/`, pointing the archived pages at that copy — so retaking the pictures for the new release leaves the old one as it was published. An archived version is served under its number (`/2027.0.0b/…`), with a banner pointing readers to the current one. Commit `versioned_docs/`, `versioned_sidebars/`, `versions.json` and the copied pictures.

## Working on the site

```sh
npm install
npm start          # local preview with live reload
npm run build      # production build into build/; fails on broken links
npm run serve      # serve the production build
npm run typecheck
```

## Publishing

Every push to `main` builds and deploys through `.github/workflows/deploy.yml`. Pull requests are built and checked but not deployed.

One-time setup in the GitHub repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Notes

- On Windows, the build uses the JavaScript HTML minifier instead of SWC's (see `docusaurus.config.ts`). SWC refuses to load its native binary from folders that grant other accounts write access, which is common on Windows data drives. CI on Linux is unaffected.
- The site is public. It carries only what the editor already shows a user — names, descriptions, ports and settings — and nothing from the installer's protected internals.

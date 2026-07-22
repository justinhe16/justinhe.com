# Site Versions

A running log of major design iterations of justinhe.com, and how to restore an earlier one.

---

## v2 — "Deep Research" refresh (current)

**Date:** 2026-07-21

A complete visual rehash. The goal: make the homepage read like a sophisticated
AI research company's site — extremely plain, straight to the point.

**Design system (3 colors):**

| Role | Color | Name |
| --- | --- | --- |
| Background | `#EAE3DD` | Alabaster grey |
| Text | `#222222` | Carbon black |
| Hover / highlight | `#758ECD` | Wisteria blue |

**Layout:**
- Left column: a small portrait photo (placeholder for now) plus name.
- Right column, two sections:
  - **Engineering** — links to plain article pages for *Claude Surf* and *Miu's Custom Website*.
  - **Elsewhere** — bubble links to LinkedIn and GitHub.
- Article pages (`/projects/[id]`) restyled to the same plain aesthetic.
- Global grain texture, animated gradient layers, and the signature-drawing
  intro animation were removed in favor of a flat alabaster canvas.

**Font:** kept the existing Fraunces (serif) + Schibsted Grotesk (sans).

**Files touched:** `src/app/page.tsx`, `src/app/globals.css`,
`src/app/components/ClientLayout.tsx`, `src/app/projects/[id]/page.tsx`.

---

## v1 — Original animated portfolio

The original site: a signature-drawing intro animation, animated multi-color
gradient backgrounds, grain texture, hover "trigger words" that spotlight
cards, and a masonry card grid across Projects / Hobbies / Blog categories.

**How to restore v1:**

1. **From git (canonical):** the full v1 tree is at commit
   `0cba0dd` ("resume"). Restore individual files with
   `git checkout 0cba0dd -- <path>`, or the whole tree with
   `git checkout 0cba0dd`.
2. **From the local backup folder:** a verbatim copy of `src/` at v1 lives in
   `backups/v1-original/src/` (git-ignored, on disk only). Copy files back as
   needed, e.g. `cp -R backups/v1-original/src/. src/`.

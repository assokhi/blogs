# blogs

Content-only repo. Every `.md` file in the **repo root** is a post. My portfolio
(`assokhi/myPortfolio`) reads them at build time and renders them at `/blog/<slug>`.
No build step here.

## Rules
- One post = one `.md` file in the repo root. Subfolders and `README.md` are ignored, so
  drafts, notes, and templates go in a subfolder.
- Frontmatter: `title` and `date` (`YYYY-MM-DD`) are required. A post without them
  fails the portfolio build. Optional: `slug` (defaults to the file name) and `tags`
  (comma-separated).
- The first paragraph becomes the summary on the post card.
- Images: use absolute URLs. Relative paths won't resolve on the portfolio.

## Post template
```md
---
title: Your title
slug: your-slug
date: 2026-10-09
tags: testing, programming
---

Intro paragraph, used as the summary.

## Section

Body.
```

## Publishing
1. Push the post to `main`.
2. Rebuild the portfolio: push to `myPortfolio`, or click **Retry build** on the latest
   build in the Cloudflare dashboard (Workers → assokhi → Builds).

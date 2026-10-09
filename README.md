# blogs

Content-only repo synced to Hashnode via the Hashnode GitHub app. No build step, no site generator.

## Setup
1. Hashnode → Dashboard → your blog → GitHub → install the app on this repo, pick the branch.
2. Push posts. Hashnode publishes them; edits in its web editor commit back here.

## Rules (from Hashnode docs; verify against the app's setup screen)
- One post = one `.md` file in the **repo root**. Subfolders are ignored, so anything that is
  not a post (drafts, notes, templates) goes in a subfolder.
- Frontmatter: `title`, `slug`, `tags` (comma-separated tag slugs, max 5), `domain`
  (your `*.hashnode.dev` or custom domain), optional `cover` (image URL).
- Same `slug` = update the existing post. Change both file path and slug = new post.
- Images: Hashnode's docs say to use URLs from its uploader. Relative paths into `images/`
  are unverified. Test with one post before relying on them.
- Unverified: whether Hashnode renders `mermaid` blocks and `> [!NOTE]` callouts. Check the preview.

## Post template
```md
---
title: Your title
slug: your-slug
tags: testing, programming
domain: assokhi.hashnode.dev
cover: https://cdn.hashnode.com/...
---

Intro paragraph.

## Section

Body.
```

## Workflow
One Claude session per post. Pull facts from the source repo (sLime Meet, Noona,
Maven/SeaTunnel), draft here, push.

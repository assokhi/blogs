---
title: "How This Blog Works: One Markdown File per Post"
slug: how-this-blog-works
date: 2026-10-09
tags: blogging, github, markdown, nextjs
---

Every post on this blog is a single Markdown file in a GitHub repo. There's no CMS, database, or paid platform. I push a file, and my portfolio turns it into a page.

## The pipeline

```text
blogs repo (one .md file per post)
   │  push, then rebuild the portfolio
   ▼
portfolio build (Next.js static export on Cloudflare Workers)
   │  GitHub API: list the .md files, download each one
   │  marked: Markdown → HTML
   ▼
/blog              list of every post
/blog/<slug>       one static page per post
```

1. I write a post as a `.md` file in the root of the `blogs` repo.
2. When the portfolio builds, it reads every `.md` file from that repo.
3. Each post becomes a plain HTML page. Nothing runs when someone reads it.

## One file = one post

The frontmatter at the top of the file is all the configuration a post needs:

```yaml
---
title: Your title
slug: your-slug
date: 2026-10-09
tags: testing, programming
---
```

| Field   | What it does                                                 |
| ------- | ------------------------------------------------------------ |
| `title` | Post title (required)                                        |
| `date`  | Publish date, `YYYY-MM-DD` (required); newest posts go first |
| `slug`  | URL path. Defaults to the file name.                         |
| `tags`  | Comma-separated tags shown under the title                   |

The first paragraph becomes the summary on the post card.

## Why this setup

- **Git history is the edit history.** Every change to a post is a commit I can diff or revert.
- **Writing in my editor.** Same tools I use for code.
- **Free and portable.** No blogging platform to pay for or migrate off. The posts are plain Markdown files I already own.

Next post: the code that turns this repo into pages on my portfolio.

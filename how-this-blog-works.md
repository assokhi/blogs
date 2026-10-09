---
title: "How This Blog Works: Markdown in Git, Published by Hashnode"
slug: how-this-blog-works
tags: blogging, github, hashnode, markdown
domain: assokhi.hashnode.dev
---

Every post on this blog is a single Markdown file in a GitHub repo. There's no CMS, build step, or site generator. I push a file, and it shows up here and on my portfolio.

## The pipeline

```text
blogs repo (.md file)
   │  push
   ▼
Hashnode GitHub app  ──publishes──▶  assokhi.hashnode.dev
                                          │  rss.xml
                                          ▼
                              portfolio /blog page (read at build time)
```

1. I write a post as a `.md` file in the root of the `blogs` repo.
2. The Hashnode GitHub app watches the branch and publishes the file.
3. My portfolio reads the Hashnode RSS feed when it builds and lists the post.

## One file = one post

The frontmatter at the top of the file is all the configuration a post needs:

```yaml
---
title: Your title
slug: your-slug
tags: testing, programming
domain: assokhi.hashnode.dev
---
```

| Field    | What it does                                        |
| -------- | --------------------------------------------------- |
| `title`  | Post title                                          |
| `slug`   | URL path. The same slug updates the existing post.  |
| `tags`   | Up to 5 Hashnode tag slugs, comma-separated         |
| `domain` | Which Hashnode blog to publish to                   |
| `cover`  | Optional cover image URL                            |

## Why this setup

- **Git history is the edit history.** Every change to a post is a commit I can diff or revert.
- **Writing in my editor.** Same tools I use for code.
- **No lock-in.** If I leave Hashnode, the posts are plain Markdown files I already own.

Next post: the ~20 lines of TypeScript that pull these posts onto my portfolio.

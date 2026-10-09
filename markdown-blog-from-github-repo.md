---
title: Rendering a Markdown Blog from a Separate GitHub Repo in a Next.js Static Export
slug: markdown-blog-from-github-repo
date: 2026-10-09
tags: nextjs, typescript, github, markdown
---

My portfolio is a Next.js static export served from Cloudflare Workers. My posts live in a separate `blogs` repo as plain Markdown files. Joining the two takes about 50 lines of TypeScript and one dependency, with no CMS, blogging platform, or runtime server.

## Reading the repo at build time

With `output: "export"`, server components run once, during `next build`. So the build can fetch the posts from GitHub, and the result is plain HTML:

```ts
async function load(): Promise<Post[]> {
  const res = await fetch("https://api.github.com/repos/assokhi/blogs/contents?ref=main", { headers });
  if (!res.ok) throw new Error(`GitHub listing failed: ${res.status}`);
  const files: { name: string; type: string; download_url: string }[] = await res.json();

  const posts = await Promise.all(
    files
      .filter((f) => f.type === "file" && f.name.endsWith(".md") && f.name !== "README.md")
      .map(async (f) => {
        const r = await fetch(f.download_url);
        if (!r.ok) throw new Error(`${f.name}: ${r.status}`);
        const [meta, body] = parse(await r.text());
        if (!meta.title || !meta.date) throw new Error(`${f.name}: frontmatter needs title and date`);
        // ...build { slug, title, date, tags, brief, html: await marked.parse(body) }
      }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}
```

The contents API gives one listing call for the whole repo, and each file comes with a `download_url` on `raw.githubusercontent.com`.

## Choices worth explaining

- **Failures throw.** If GitHub is down, the build fails and Cloudflare keeps serving the last good deploy. Returning `[]` would have shipped an empty blog.
- **No frontmatter library.** The frontmatter is flat `key: value` lines, so a regex parses it. The only dependency is [`marked`](https://marked.js.org) for Markdown to HTML.
- **One fetch per build worker.** The homepage, `/blog`, and every `/blog/<slug>` page all need the posts, so the promise is cached once per build worker:

```ts
let cached: Promise<Post[]> | undefined;
export const getPosts = () => (cached ??= load());
```

- **One static page per post.** `generateStaticParams` returns every slug, so each post is prerendered:

```tsx
export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}
```

- **Styling without a typography plugin.** `marked` outputs bare HTML tags, so a dozen `.post h2`, `.post pre` rules with Tailwind's `@apply` style them, dark mode included.

## Limits

- **A new post needs a rebuild.** Pushing to `blogs` doesn't redeploy the portfolio. I trigger a build after publishing.
- **Rate limit.** Unauthenticated GitHub API calls are capped at 60 per hour per IP. If shared build machines hit that, a `GITHUB_TOKEN` in the build environment raises it.
- **No sanitizing.** The HTML comes from my own repo, so I trust it. If anyone else could write posts, I'd sanitize the HTML first.

---
title: Showing Hashnode Posts on a Next.js Portfolio Without an API Key
slug: hashnode-rss-in-nextjs
tags: nextjs, typescript, hashnode, rss
domain: assokhi.hashnode.dev
---

I wanted my portfolio's `/blog` page to list my Hashnode posts. You could do this with an SDK, a GraphQL client, or a separate microservice, but you don't need any of them. Every Hashnode blog serves an RSS feed at `/rss.xml`, and a Next.js server component can read it directly.

## The fetch

```ts
export type Post = { title: string; url: string; brief: string; date: string };

export const HASHNODE_URL = "https://assokhi.hashnode.dev";

const tag = (xml: string, name: string) =>
  xml.match(new RegExp(`<${name}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${name}>`))?.[1].trim() ?? "";

export async function getPosts(limit?: number): Promise<Post[]> {
  try {
    const res = await fetch(`${HASHNODE_URL}/rss.xml`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].slice(0, limit).map(([, item]) => ({
      title: tag(item, "title"),
      url: tag(item, "link"),
      brief: tag(item, "description"),
      date: tag(item, "pubDate"),
    }));
  } catch {
    return [];
  }
}
```

A few choices worth explaining:

- **`revalidate: 3600`**: Next.js caches the feed for an hour, so Hashnode gets at most one request per hour, not one per visitor.
- **Failures return `[]`**: if Hashnode is down, the page shows "No posts yet" and the rest of the site still loads.
- **Regex instead of an XML parser**: the feed's shape is fixed, so a regex avoids adding a dependency. If the shape ever changes, I'll swap in a parser.

## One component, two pages

The same server component shows the 3 latest posts on the homepage and every post on `/blog`:

```tsx
export async function Blog({ limit = 3 }: { limit?: number }) {
  const posts = await getPosts(limit);
  // ...render cards linking to each post
}
```

```tsx
// src/app/blog/page.tsx
export default function BlogPage() {
  return <Blog limit={Infinity} />;
}
```

## Limits

The RSS feed only returns the most recent ~20 posts. Past that, I'll switch to Hashnode's public GraphQL API (`gql.hashnode.com`), which supports pagination. Until then, this is the whole integration: no API key and no extra service to deploy.

# blogs

Static blog, deployed to [assokhi.github.io/blogs](https://assokhi.github.io/blogs/).
No backend, no database — Next.js (`output: "export"`) renders a folder of `.mdx`
files to static HTML, and GitHub Actions publishes `out/` to GitHub Pages on every
push to `main`.

## Writing a post

1. Add `posts/your-slug.mdx`
2. Add frontmatter:
   ```md
   ---
   title: "Your title"
   date: "2026-10-03"
   description: "One line for the index page."
   ---
   ```
3. Write the post below the frontmatter in Markdown/MDX.
4. `git push` — the post is live at `/blogs/your-slug/` once the workflow finishes.

## Local dev

```bash
npm install
npm run dev
```

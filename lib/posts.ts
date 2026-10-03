import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { data } = matter(fs.readFileSync(path.join(postsDirectory, file), "utf8"));
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        description: data.description as string | undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const meta: PostMeta = {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string | undefined,
  };
  return { meta, content };
}

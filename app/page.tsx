import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-6 text-slate-500">No posts yet.</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/${post.slug}`} className="text-xl font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="mt-1 text-sm text-slate-500">{post.date}</p>
              {post.description && <p className="mt-2 text-slate-600 dark:text-slate-400">{post.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

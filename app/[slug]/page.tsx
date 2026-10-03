import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:underline">
        ← Back
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{meta.title}</h1>
      <p className="mt-2 text-sm text-slate-500">{meta.date}</p>
      <article className="prose prose-slate mt-8 max-w-none dark:prose-invert">
        <MDXRemote source={content} />
      </article>
    </main>
  );
}

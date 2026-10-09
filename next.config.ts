import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages: no server, `out/` is the whole site.
  output: "export",
  // Served at https://assokhi.github.io/blogs/, a project page, not the domain root.
  basePath: "/blogs",
  // Directory-style URLs (my-post/index.html) so GitHub Pages can resolve
  // /blogs/my-post/ without a server rewrite.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

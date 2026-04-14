import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/tl-site",
  assetPrefix: "/tl-site/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

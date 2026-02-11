import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@rx/ui",
    "@rx/utils",
    "@rx/types",
    "@rx/schemas",
    "@rx/auth",
  ],
};

export default nextConfig;

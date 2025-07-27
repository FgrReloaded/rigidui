import type { NextConfig } from "next";
import { createMDX } from 'fumadocs-mdx/next';
const withMDX = createMDX();

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://us.i.posthog.com/decide",
      },
    ];
  },
};

export default withMDX(nextConfig);

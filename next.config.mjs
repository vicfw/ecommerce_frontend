import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  cacheHandler: require.resolve("./cache-handler.js"),
  // Redis handler is the shared ISR store; disable the in-process LRU.
  cacheMaxMemorySize: 0,
  experimental: {
    // Client navigations must not reuse a prefetched RSC payload after stock updates.
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "storage.khanoumi.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;

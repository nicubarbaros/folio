/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async rewrites() {
    return [{ source: "/okie/updates", destination: "/okie/updates/index.html" }];
  },
  async headers() {
    return [
      {
        source: "/okie/updates",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
      {
        source: "/okie/updates/:path*",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
    ];
  },
};

module.exports = nextConfig

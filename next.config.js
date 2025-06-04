/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [{ key: "referrer-policy", value: "no-referrer" }],
      },
    ];
  },
  images: { domains: ["lh3.googleusercontent.com"] },
  experimental: { serverActions: true },
};

module.exports = nextConfig;

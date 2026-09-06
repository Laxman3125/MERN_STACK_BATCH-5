/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // allow remote product images (demo uses unsplash)
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;

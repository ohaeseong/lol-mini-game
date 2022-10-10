/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  experimental: {
    externalDir: true,
  },
  optimization: {
    minify: false,
  },
};

module.exports = nextConfig;

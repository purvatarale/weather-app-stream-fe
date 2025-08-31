/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: []
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL
  }
};

module.exports = nextConfig;

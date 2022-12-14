/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = nextConfig;

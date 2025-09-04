/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // enables static export automatically
  images: { unoptimized: true }, // avoid next/image issues
  trailingSlash: true,       // optional, helps with routing in static hosting
  distDir: 'dist/web',       // optional: set custom build folder
};

module.exports = nextConfig;

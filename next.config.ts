import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
// next.config.js
module.exports = {
  output: 'export',
  images: {
    domains: ['img.a.transfermarkt.technology'],
  },
};

export default nextConfig;

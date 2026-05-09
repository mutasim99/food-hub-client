import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },

      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
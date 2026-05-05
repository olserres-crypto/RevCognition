import type { NextConfig } from "next";

const APP_URL = "https://app.revcognition.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/analisis",
        destination: APP_URL,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const APP_URL = "https://app.revcognition.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {source: "/analisis", destination: APP_URL, permanent: false},
      {source: "/:locale(en|fr)/analisis", destination: APP_URL, permanent: false},
    ];
  },
};

export default withNextIntl(nextConfig);

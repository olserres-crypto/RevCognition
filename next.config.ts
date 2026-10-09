import type {NextConfig} from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();
const APP_URL = "https://app.revcognition.com";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {source: "/analisis", destination: APP_URL, permanent: false},
      {source: "/:locale(en|fr)/analisis", destination: APP_URL, permanent: false},
      // B-2228: servicios-b2b se fusiono en la home. 301 clasico (permanent:true daria 308).
      {source: "/soluciones/servicios-b2b", destination: "/", statusCode: 301},
      {source: "/es/soluciones/servicios-b2b", destination: "/", statusCode: 301},
      {source: "/:locale(en|fr)/soluciones/servicios-b2b", destination: "/:locale", statusCode: 301},
    ];
  },
};

export default withNextIntl(nextConfig);

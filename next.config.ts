import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    NEXT_PUBLIC_SIGNALR_HUB_URL: "https://localhost:5001/hub/game",
  },
};

export default nextConfig;

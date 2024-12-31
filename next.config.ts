import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  env: {
    NEXT_PUBLIC_SIGNALR_HUB_URL:
      process.env.SIGNALR_HUB_URL || "https://localhost:5001/hub/game",
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://localhost:5001/api",
    AUTH0_CLIENT_ID:
      process.env.AUTH0_CLIENT_ID || "CQrMn6WGkCBNLAcEAE7GaS3BsbKyNoku",
    AUTH0_CLIENT_SECRET:
      process.env.AUTH0_CLIENT_SECRET ||
      "JdEp_sX-R-fBdIOFywSQRybRgF7O4V17tKfsEvnxdVjT9DVVMkQMe5xudT7ik6jx",
    AUTH0_AUDIENCE:
      process.env.AUTH0_AUDIENCE ||
      "https://dev-llzbopidy6i26kov.us.auth0.com/api/v2/",
    AUTH0_SECRET:
      process.env.AUTH0_SECRET || "b1olgkTipi5KD01x8ksKDTGrU7UdQjhr",
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL || "http://localhost:3000",
    AUTH0_SCOPE: process.env.AUTH0_SCOPE || "openid profile email",
    AUTH0_TOKEN_URL:
      process.env.AUTH0_TOKEN_URL ||
      "https://dev-llzbopidy6i26kov.us.auth0.com/oauth/token",
    AUTH0_ISSUER_BASE_URL:
      process.env.AUTH0_ISSUER_BASE_URL ||
      "https://dev-llzbopidy6i26kov.us.auth0.com",
  },
};

export default nextConfig;

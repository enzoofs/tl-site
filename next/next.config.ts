import type { NextConfig } from "next";

/* Headers de segurança aplicados a todas as rotas.
   CSP fica de fora por enquanto — requer nonce em todos inline scripts/styles
   e o site usa <style>{...}</style> e o bootstrap de tema inline no <head>. */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok.io", "*.ngrok.app"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes in the application
        source: '/(.*)',
        headers: [
          {
            // Blocks the website from being embedded into an iframe (Clickjacking defense)
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            // Prevents browsers from incorrectly parsing non-executable MIME types as javascript (XSS defense)
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Restricts the tracking data passed when users click outbound links
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            // Globally blocks malicious scripts from requesting camera, microphone, or tracking telemetry
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
          {
            // Forces strict HTTPS encryption at the hardware level
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          }
        ],
      },
    ];
  },
};

export default nextConfig;

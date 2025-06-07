/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "ucarecdn.com",
      },
    ],
  },
  experimental: {
    serverActions: true,
    instrumentationHook: true,
  },
  output: 'standalone',
};

// Only apply OpenTelemetry in production
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_OTEL_ENABLED === 'true') {
  const { withOtel } = require('@vercel/otel');
  module.exports = withOtel(nextConfig);
} else {
  module.exports = nextConfig;
}

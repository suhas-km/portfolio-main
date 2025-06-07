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
  // Enable Webpack 5
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
};

// Only apply OpenTelemetry in production
if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_OTEL_ENABLED === 'true') {
  try {
    const { withOtel } = require('@vercel/otel');
    module.exports = withOtel(nextConfig);
  } catch (error) {
    console.error('Failed to load @vercel/otel', error);
    module.exports = nextConfig;
  }
} else {
  module.exports = nextConfig;
}

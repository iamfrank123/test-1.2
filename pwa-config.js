/**
 * PWA Configuration for Pentagramma
 * Ensures proper caching and offline support across all devices
 */

const withPWA = require('next-pwa')({
  dest: 'public',
  register: false, // We handle registration manually
  skipWaiting: false, // Users must approve updates
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'https-calls',
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 4 * 60 * 60, // 4 hours
        },
      },
    },
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-static',
        expiration: {
          maxEntries: 64,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    {
      urlPattern: /\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'others',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
  ],
  buildExcludes: [/middleware-manifest.json$/],
  publicExcludes: ['!noprecache/**/*'],
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withPWA({
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.worker\.ts$/,
      use: { loader: 'worker-loader' },
    });
    return config;
  },
});

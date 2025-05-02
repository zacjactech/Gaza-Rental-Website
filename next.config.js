/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 3600 * 24 * 7, // 7 days cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { dev, isServer }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Add terser for better JS minification
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }

    return config;
  },
  experimental: {
    optimizeCss: true,
    optimisticClientCache: true,
    scrollRestoration: true,
    serverActions: true,
    webVitalsAttribution: ['CLS', 'LCP'],
    // Enable memory usage optimization
    memoryUsageTracking: true,
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Performance optimizations
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 15 * 1000, // Reduce to 15 seconds for faster development
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2, // Reduce to 2 for more efficient memory usage
  },
  productionBrowserSourceMaps: false, // disable source maps in production
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  output: 'standalone',
};

module.exports = nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256],
    minimumCacheTTL: 3600 * 24 * 7, // 7 days cache for images
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  webpack: (config, { dev, isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // Add terser for better JS minification
    if (!dev && !isServer) {
      config.optimization.minimize = true;
    }
    
    // Add module concatenation for better tree-shaking
    if (!dev) {
      config.optimization.concatenateModules = true;
      
      // Add additional webpack optimizations for production
      if (!isServer) {
        // Optimize chunk size and splitting
        config.optimization.splitChunks = {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|next|@next)[\\/]/,
              priority: 40,
              chunks: 'all',
              enforce: true,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: 20,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // Safely extract the package name
                const packageNameMatch = module.context && module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                return packageNameMatch 
                  ? `npm.${packageNameMatch[1].replace('@', '')}` 
                  : 'npm.unknown';
              },
              priority: 10,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        };
      }
    }

    // Optimize the development build with caching
    if (dev) {
      // Force the Next.js HMR to track fewer modules
      config.watchOptions = {
        ignored: ['**/node_modules', '**/.git', '**/.next'],
        aggregateTimeout: 300,
        poll: 1000,
      };
      
      // Use persistent caching in development to speed up builds
      config.cache = true;
      
      // Reduce re-compilation by disabling hot module replacement for certain folders
      if (!isServer) {
        config.module.rules.forEach(rule => {
          if (rule.oneOf) {
            rule.oneOf.forEach(oneOfRule => {
              if (
                oneOfRule.issuer && 
                oneOfRule.issuer.and && 
                oneOfRule.issuer.and.length > 0 && 
                oneOfRule.issuer.and[0] && 
                oneOfRule.issuer.and[0].source &&
                oneOfRule.issuer.and[0].source.includes('pages')
              ) {
                if (!oneOfRule.include) {
                  oneOfRule.include = [];
                }
                // Limit the files that trigger recompilation
                if (!Array.isArray(oneOfRule.include)) {
                  oneOfRule.include = [oneOfRule.include];
                }
                oneOfRule.include.push(/app\/.*\.(js|jsx|ts|tsx)$/);
              }
            });
          }
        });
      }
    }

    return config;
  },
  experimental: {
    // Server Actions are now enabled by default
  },
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  // Performance optimizations
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000, // Increase to 60 seconds to reduce recompilation
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5, // Increase to 5 for better caching
  },
  productionBrowserSourceMaps: false, // disable source maps in production
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  output: 'standalone',
  // HTTP response headers configuration
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Cache-Control',
          value: 'public, max-age=3600, must-revalidate',
        },
      ],
    },
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, max-age=0, must-revalidate',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
    {
      source: '/_next/static/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=86400, immutable',
        },
      ],
    },
  ],
};

module.exports = nextConfig;
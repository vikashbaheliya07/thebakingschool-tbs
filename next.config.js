/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],

    // ✅ Allow ALL external HTTPS images (for dev / testing)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],

    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons', 'swiper'],
  },
}

module.exports = nextConfig

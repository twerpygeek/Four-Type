/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['127.0.0.1'],
  devIndicators: process.env.FIELD_GUIDE_E2E === '1' ? false : undefined,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  turbopack: {
    root: process.cwd(),
  },
  // Force clean build - updated timestamp: 2026-03-20
  cleanDistDir: true,
}

export default nextConfig

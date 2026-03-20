/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Force clean build - updated timestamp: 2026-03-20
  cleanDistDir: true,
}

export default nextConfig

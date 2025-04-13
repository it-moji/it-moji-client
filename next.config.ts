import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
  async rewrites() {
    return [
      {
        source: '/server/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SERVER_DOMAIN_ADDRESS}/api/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/admin/docs/storybook',
        destination: process.env.STORYBOOK_DOMAIN_ADDRESS!,
        permanent: true,
      },
      {
        source: '/admin/docs/swagger',
        destination: process.env.SWAGGER_DOMAIN_ADDRESS!,
        permanent: true,
      },
    ]
  },
}

export default nextConfig

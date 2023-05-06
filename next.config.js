/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    headers: () => [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store',
          },
        ],
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i2.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'www.sabornamesa.com.br',
      },
      {
        protocol: 'https',
        hostname: 'vxegwttiptzqzytzwlhx.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

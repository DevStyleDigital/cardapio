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
        hostname: 'ujtbuayqudabkjeehyli.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;

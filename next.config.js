/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    siteName: 'La Palme Verte',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;

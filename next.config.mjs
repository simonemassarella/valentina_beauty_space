/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'www.figma.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/bookings',
        destination: '/api/bookings',
      },
    ];
  },
};

export default nextConfig;

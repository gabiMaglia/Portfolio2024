
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin(); 

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@portfolio/db'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' }
    ]
  }
};

export default withNextIntl(nextConfig);
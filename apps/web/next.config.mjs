
import createNextIntlPlugin from 'next-intl/plugin';
import { appsRewrites } from './lib/apps.mjs';
const withNextIntl = createNextIntlPlugin(); 

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@portfolio/db'],
  // Las landings usan URLs con slash final (/legal/): sin esto Next las redirige a /legal y
  // GH Pages vuelve a /legal/ en github.io -> loop con el redirect de host de la landing
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return appsRewrites();
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '**' }
    ]
  }
};

export default withNextIntl(nextConfig);
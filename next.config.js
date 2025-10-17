/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: [
      'uploadthing.com',
      'utfs.io',
      'cloud.appwrite.io',
      'subdomain',
      'files.stripe.com',
    ],
  },
  reactStrictMode: false,
  trailingSlash: true,
}

module.exports = nextConfig

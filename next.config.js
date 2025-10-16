/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'utfs.io',
      'cloud.appwrite.io',
      'subdomain',
      'files.stripe.com',
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig

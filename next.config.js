/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return ['contact', 'reviews', 'email-subject-lines'].map(page => ({
      source: `/${page}.html`,
      destination: `/${page}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig

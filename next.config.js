/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [...['contact', 'reviews', 'email-subject-lines'].map(page => ({
      source: `/${page}.html`,
      destination: `/${page}`,
      permanent: true,
    })), ...['all-eyes-email-campaign', 'all-eyes-welcome-sequence'].map(slug => ({
      source: `/work/${slug}`,
      destination: '/work',
      permanent: false,
    }))]
  },
}

module.exports = nextConfig

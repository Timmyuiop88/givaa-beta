const nextConfig = {
  images: {
    domains: [
      'files.edgestore.dev' // Add EdgeStore domain for image hosting
    ],
  },
  typescript: {
    ignoreBuildErrors: true
  },
  swcMinify: true
}

module.exports = nextConfig

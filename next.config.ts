const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "static.nike.com",
    },
  ],
},

});

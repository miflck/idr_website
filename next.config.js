const { i18n } = require("./next-i18next.config");

module.exports = {
  trailingSlash: false,
  i18n,
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/projekte",
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    domains: ["www.datocms-assets.com"],
    deviceSizes: [640, 768, 900, 1280],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },
};

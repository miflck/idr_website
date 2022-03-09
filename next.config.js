const { i18n } = require("./next-i18next.config");

module.exports = {
  trailingSlash: true,
  i18n,
  /*async redirects() {
    return [
      {
        source: '/',
        destination: '/projekte',
        permanent: true,
      },
    ]
  },*/
  images: {
    domains: ["www.datocms-assets.com"],
  },
};

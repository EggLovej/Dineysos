/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: "https://dineysos.com",
  generateRobotsTxt: true,
  exclude: ["/404", "/*/404"],
  transform: async (config, path) => {
    let priority = 0.7;
    if (path === "/") priority = 1.0;
    else if (path.startsWith("/events/")) priority = 0.8;
    else if (path === "/events") priority = 0.9;
    else if (path === "/events/past") priority = 0.7;
    return {
      loc: path,
      changefreq: "weekly",
      priority,
      lastmod: new Date().toISOString(),
    };
  },
  sitemapSize: 5000,
  alternateRefs: [
    {
      href: "https://dineysos.com/de",
      hreflang: "de",
    },
    {
      href: "https://dineysos.com/en",
      hreflang: "en",
    },
  ],
};

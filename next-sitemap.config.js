/** @type {import('next-sitemap').IConfig} */

const SITE_URL = "https://dineysos.com";

// The default locale (de) is served without a prefix, English under /en.
function localizedUrls(path) {
  const basePath = path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
  const suffix = basePath === "/" ? "" : basePath;
  return { basePath, de: `${SITE_URL}${suffix}`, en: `${SITE_URL}/en${suffix}` };
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ["/404", "/*/404"],
  transform: async (config, path) => {
    const { basePath, de, en } = localizedUrls(path);

    let priority = 0.7;
    if (basePath === "/") priority = 1.0;
    else if (basePath.startsWith("/events/")) priority = 0.8;
    else if (basePath === "/events") priority = 0.9;

    return {
      loc: path,
      changefreq: "weekly",
      priority,
      // Absolute hrefs: next-sitemap would otherwise append the (already localized) path.
      alternateRefs: [
        { href: de, hreflang: "de", hrefIsAbsolute: true },
        { href: en, hreflang: "en", hrefIsAbsolute: true },
        { href: de, hreflang: "x-default", hrefIsAbsolute: true },
      ],
    };
  },
  sitemapSize: 5000,
};

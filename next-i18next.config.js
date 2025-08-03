const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'de',
    locales: ['en', 'de'],
  },
  localePath: path.resolve(__dirname, 'public/locales'),
};
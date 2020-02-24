const favicon = require('serve-favicon');
module.exports = app => {
  app.use(favicon('./src/public/favicon.ico'));
};

const favicon = require('serve-favicon');
module.exports = function(app) {
  app.use(favicon('./src/public/favicon.ico'));
};

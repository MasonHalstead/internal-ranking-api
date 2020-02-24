const favicon = require('serve-favicon');
module.exports = app => {
  app.use(favicon('./public/favicon.ico'));
};

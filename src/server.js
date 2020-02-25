require('dotenv').config();
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const { PRIVATE_KEY, NODE_ENV } = process.env;

// require('./startup/config')(PRIVATE_KEY);
// require('./startup/favicon')(app);
// require('./startup/errors')(app);
// require('./startup/routes')(app);
// require('./startup/lookups')();

if (NODE_ENV !== 'development') {
  // eslint-disable-next-line global-require
  require('./startup/prod')(app);
}

const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Listening on port ${port}...`));

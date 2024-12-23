const cors_proxy = require('./lib/cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
require('dotenv').config();


// Replace 'your-api-token' with your actual API token
const apiToken = process.env.API_Token;

cors_proxy.createServer({
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,
  requireHeader: ['origin', 'x-requested-with', 'authorization'],
  setHeaders: {"authorization": "Bearer AstraCS:bBavfXQKWSlLdoFvJmPTujXU:5b6b5810e8ae911816f12298dfb4b28a3d5a85d957f95405c818d65891c81e96"},
  checkRateLimit: checkRateLimit,
  removeHeaders: [
    'cookie',
    'cookie2',
    // Strip Heroku-specific headers
    'x-request-start',
    'x-request-id',
    'via',
    'connect-time',
    'total-route-time',
    // Other Heroku added debug headers
    // 'x-forwarded-for',
    // 'x-forwarded-proto',
    // 'x-forwarded-port',
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku already adds it.
    xfwd: false,
  },
}).listen(port, host, function() {
  console.log('Running CORS Anywhere on ' + host + ':' + port);
});

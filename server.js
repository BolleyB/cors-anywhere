const cors_proxy = require('./lib/cors-anywhere');

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 8080;
require('dotenv').config();


// Replace 'your-api-token' with your actual API token
const apiToken = process.env.API_Token;

cors_proxy.createServer({
  originWhitelist: [], // Allow all origins
  requireHeader: ['origin', 'x-requested-with'],
  removeHeaders: ['cookie', 'cookie2'],
  setHeaders: {
    Authorization: `Bearer ${apiToken}`, // Add your Authorization header here
  },
  handleInitialRequest: (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Authorization, Accept',
      });
      res.end();
      return true; // Stop further processing
    }
    return false;
  },
}).listen(port, host, () => {
  console.log(`CORS Anywhere is running on ${host}:${port}`);
});

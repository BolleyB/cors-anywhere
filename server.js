const functions = require("firebase-functions");
const cors_proxy = require("cors-anywhere");
require("dotenv").config();

// Authorization token
const apiToken = process.env.API_Token;

const proxyServer = cors_proxy.createServer({
  requireHeader: ["origin", "x-requested-with", "authorization"],
  setHeaders: {
    authorization: `Bearer ${apiToken}`,
  },
  removeHeaders: [
    "cookie",
    "cookie2",
    "x-request-start",
    "x-request-id",
    "via",
    "connect-time",
    "total-route-time",
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    xfwd: false,
  },
});

exports.proxy = functions.https.onRequest((req, res) => {
  console.log("Incoming request:", req.url);
  proxyServer.emit("request", req, res);
});

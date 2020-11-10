const responseTime = require("response-time");

module.exports = responseTime((request, _response, time) => {
  console.log(`${request.method} ${request.url} ${time}`);
});

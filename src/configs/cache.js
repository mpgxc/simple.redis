require("dotenv/config");

module.exports = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};

const { RateLimiterRedis } = require("rate-limiter-flexible");
const redis = require("redis");
const redisConfig = require("../configs/cache");

class RateLimit {
  constructor({ seconds = 1, maxSolicitations = 50 }) {
    this.seconds = seconds;
    this.maxSolicitations = maxSolicitations;

    this.redisClient = redis.createClient({
      port: redisConfig.port,
      host: redisConfig.host,
      enable_offline_queue: false,
    });

    this.rateLimiterRedis = new RateLimiterRedis({
      storeClient: this.redisClient,
      points: this.maxSolicitations, //Maximo de solicitações
      duration: seconds, //Por Segundo
    });
  }
}

module.exports = RateLimit;

const { RateLimiterRedis } = require("rate-limiter-flexible");
const redis = require("redis");
const redisConfig = require("../configs/cache");

class RateLimit {
  constructor({ seconds = 60, maxSolicitations = 1 }) {
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
      duration: this.seconds, //Por Segundo
      keyPrefix: "limiter-timeout",
    });
  }
}

module.exports = RateLimit;

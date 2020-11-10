const Redis = require("ioredis");
const redisConfig = require("../configs/cache");

class CacheRedis {
  static client;

  constructor() {
    this.client = new Redis({
      port: redisConfig.port,
      host: redisConfig.host,
    });
  }

  async save(key, value) {
    this.client.set(key, JSON.stringify(value));
  }

  async recovery(key) {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  }

  //Invalida um object especifico
  async invalidate(key) {
    await this.client.del(key);
  }

  //Invalida grupos
  async invalidatePrefix(prefix) {
    const keys = await this.client.keys(`${prefix}:*`);

    const pipeline = this.client.pipeline();

    keys.forEach((key) => pipeline.del(key));

    await pipeline.exec();
  }
}

module.exports = CacheRedis;

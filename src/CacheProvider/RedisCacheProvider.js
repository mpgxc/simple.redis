const Redis = require("ioredis");
const configRedis = require("../configs/cache");

class CacheRedis {
    static client;

    constructor() {
        this.client = new Redis(configRedis);
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
    async invalidate(key) {}
}

module.exports = CacheRedis;

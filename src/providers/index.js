const RedisCacheProvider = require('./cache.provider');

module.exports = {
    redis: new RedisCacheProvider(),
};

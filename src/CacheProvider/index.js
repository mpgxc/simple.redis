const RedisCacheProvider = require("./RedisCacheProvider");

const providers = {
    redis: new RedisCacheProvider(),
};

module.exports = providers;

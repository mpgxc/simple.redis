const RateLimit = require('../../../middlewares/RateLimiter');

const limiter = new RateLimit({
    seconds: 5,
    maxSolicitations: 3,
});

const rateLimit = async (request, response, next) => {
    try {
        await limiter.rateLimiterRedis.consume(request.ip);
        return next();
    } catch (error) {
        return response.status(429).json({
            type: 'Many Requests',
            label: 'timeout',
            message: 'Sua conexão recebeu timeout por acesso excesivo da api!',
        });
    }
};

module.exports = rateLimit;

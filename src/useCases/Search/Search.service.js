const apiRepository = require('../../services/external/api');

class ManageCacheService {
    constructor(cacheProvider) {
        this.cacheProvider = cacheProvider;
    }

    async insertExecute({ limit }) {
        await this.cacheProvider.redis.invalidatePrefix('pokemon-list');

        const response = await apiRepository.get(`?limit=${limit}&offset=100`);

        await this.cacheProvider.redis.save(
            `pokemon-list:${limit}`,
            response.data,
        );

        return response.data;
    }

    async searchExecute({ limit }) {
        let data = await this.cacheProvider.redis.recovery(
            `pokemon-list:${limit}`,
        );

        if (!data) {
            const response = await apiRepository.get(
                `?limit=${limit}&offset=100`,
            );
            data = response.data;
            await this.cacheProvider.redis.save(`pokemon-list:${limit}`, data);
        }

        return data;
    }
}

module.exports = ManageCacheService;

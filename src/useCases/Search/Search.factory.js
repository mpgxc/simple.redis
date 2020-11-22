const CacheProvider = require('../../providers');
const SearchController = require('./Search.controller');
const CacheManagerService = require('./Search.service');

const generateInstance = () => {
    const cacheManagerService = new CacheManagerService(CacheProvider);

    const searchController = new SearchController(cacheManagerService);

    return searchController;
};

module.exports = { generateInstance };

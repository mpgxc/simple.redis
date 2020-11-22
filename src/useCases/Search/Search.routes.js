const { Router } = require('express');

const SearchFactory = require('./Search.factory');
const rateLimit = require('./middlewares/rateLimiter.middleware');

class Routes {
    constructor() {
        this.SearchController = SearchFactory.generateInstance();
        this.appRouter = Router();
        this.loadRoutes();
    }

    loadRoutes() {
        this.appRouter.post('/insert/:limit', rateLimit, (request, response) =>
            this.SearchController.create(request, response),
        );
        this.appRouter.get('/search/:limit', rateLimit, (request, response) =>
            this.SearchController.index(request, response),
        );
    }

    getInstance() {
        return this.appRouter;
    }
}

module.exports = new Routes();

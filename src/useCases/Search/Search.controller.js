class Controller {
    constructor(cacheManagerService) {
        this.cacheManagerService = cacheManagerService;
    }

    async index(request, response) {
        const { limit } = request.params;

        const data = await this.cacheManagerService.searchExecute({ limit });

        return response.status(200).json(data);
    }

    async create(request, response) {
        const { limit } = request.params;

        const data = await this.cacheManagerService.insertExecute({ limit });

        return response.status(201).json(data);
    }
}

module.exports = Controller;

const SessionRouter = require('./useCases/Search/Search.routes');

class useRoutes {
    constructor(AppRouter) {
        this.appRouter = AppRouter;
        this.loadRoutes();
    }

    loadRoutes() {
        this.appRouter.use('/api/search', SessionRouter.getInstance());

        this.appRouter.use('/api/hello', (_request, response) => {
            return response.status(200).json({
                message: 'Opa, meu patrão, tamo on!',
            });
        });
    }
}

module.exports = useRoutes;

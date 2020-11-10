const { Router } = require("express");
const api = require("./services/api");
const CacheProvider = require("./CacheProvider");
const rateLimit = require("./middlewares/rateLimiter.pokemon");

const routes = Router();
routes.use(rateLimit);

routes.get("/insert/:limit", async (request, response) => {
  const { limit } = request.params;

  const data = await api.get(`?limit=${limit}&offset=100`).data;

  await CacheProvider.redis.invalidatePrefix("pokemon-list");

  await CacheProvider.redis.save(`pokemon-list:${limit}`, data);

  return response.status(201).send();
});

routes.get("/search/:limit", async (request, response) => {
  const { limit } = request.params;

  let responseData = await CacheProvider.redis.recovery(
    `pokemon-list:${limit}`
  );

  if (!responseData) {
    responseData = await api.get(`?limit=${limit}&offset=100`);
    responseData = responseData.data;

    await CacheProvider.redis.save(`pokemon-list:${limit}`, responseData);
  }

  return response.status(200).json(responseData);
});

module.exports = routes;

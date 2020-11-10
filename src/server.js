require("dotenv/config");
const express = require("express");
const api = require("./services/api");
const cors = require("cors");
const responseTime = require("response-time");
const CacheProvider = require("./CacheProvider");

const app = express();
const port = process.env.PORT_SERVER;

app.use(express.json());
app.use(cors());

app.use(
    responseTime((request, _response, time) => {
        console.log(`${request.method} ${request.url} ${time}`);
    })
);

app.get("/:limit", async (request, response) => {
    const { limit } = request.params;

    let responseData = await CacheProvider.redis.recovery(
        `pokemons-list:${limit}`
    );

    if (!responseData) {
        responseData = await api.get(`?limit=${limit}&offset=100`);
        responseData = responseData.data;

        await CacheProvider.redis.save(`pokemons-list:${limit}`, responseData);
    }

    return response.status(200).json(responseData);
});

app.listen(port, () => console.log(`O Pai ta on!:  http://localhost:${port}`));

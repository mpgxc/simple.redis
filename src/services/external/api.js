const axios = require('axios');

module.exports = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/pokemon',
});

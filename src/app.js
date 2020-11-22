require('dotenv/config');

const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const UseRoutes = require('./useRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

new UseRoutes(app);

module.exports = { app };

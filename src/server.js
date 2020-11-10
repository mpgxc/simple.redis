require("dotenv/config");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const routesTime = require("./middleware.timer");

const app = express();
const port = process.env.PORT_SERVER;

app.use(express.json());
app.use(cors());
app.use(routesTime);
app.use("/api", routes);

app.listen(port, () => console.log(`O Pai ta on!:  http://localhost:${port}`));

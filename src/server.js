const { app } = require('./app');

const port = process.env.PORT_SERVER;

app.listen(port, () => {
    console.log(`O Pai ta on!:  http://localhost:${port}`);
});

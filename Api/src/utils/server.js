const http = require("http");
const app = require("./app");

require("dotenv").config();

const server = http.createServer(app);

server.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(
        `Servidor executando na porta ${process.env.SERVER_PORT || 3000}`
    );
})
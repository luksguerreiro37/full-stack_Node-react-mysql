const express = require("express");
const cors = require("cors");
const compression = require("compression");

const routes = require("../app/routes/routes");
require("../database/index")

class App{
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(compression());
        this.server.use(express.json());
    }

    routes(){
        this.server.use(routes);
    }
}

module.exports = new App().server
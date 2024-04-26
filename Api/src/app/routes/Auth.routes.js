const express = require("express");
const authController = require("../controllers/Auth.controller");

const routes = express.Router();

routes.post("/client", authController.loginClient);
routes.post("/admin", authController.loginAdmin);


module.exports = routes;
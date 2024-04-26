const { Router } = require("express");
const routes = Router();

const ClientUsersController = require("../controllers/ClientUsers.controller")
const isClientAuthenticated = require("../middlewares/isClientAuthenticated");
const EmailController = require("../controllers/Email.controller");

routes.post("", ClientUsersController.createUser);
routes.post("/send-recovery-code", EmailController.sendRecoveryCodeClient);
routes.post("/update-password", EmailController.updatePasswordWithRecoveryCodeClient);

routes.get("", isClientAuthenticated, ClientUsersController.getUserDataTokenBased);
routes.get("/orders/:userId", ClientUsersController.getAllUserOrders);

routes.put("", isClientAuthenticated, ClientUsersController.updateUser);

routes.delete("", isClientAuthenticated, ClientUsersController.deleteUser);

module.exports = routes;
const { Router } = require("express");
const routes = Router();

const AdminUsersController = require("../controllers/AdminUsers.controller")
const isAdminAuthenticated = require("../middlewares/isAdminAuthenticated");
const EmailController = require("../controllers/Email.controller");


routes.post("", AdminUsersController.createUser);
routes.get("", isAdminAuthenticated, AdminUsersController.getUserDataTokenBased);
routes.put("", isAdminAuthenticated, AdminUsersController.updateUser);
routes.delete("", isAdminAuthenticated, AdminUsersController.deleteUser);
routes.post("/send-recovery-code", EmailController.sendRecoveryCodeAdmin);
routes.post("/update-password", EmailController.updatePasswordWithRecoveryCodeAdmin)

module.exports = routes;
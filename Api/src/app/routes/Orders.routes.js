const { Router } = require("express");
const OrdersController = require("../controllers/Orders.controller");
const isClientAuthenticated = require("../middlewares/isClientAuthenticated");
const isAdminAuthenticated = require("../middlewares/isAdminAuthenticated");

const routes = Router();

routes.post("", isClientAuthenticated, OrdersController.createOrder);

routes.get("", isAdminAuthenticated, OrdersController.getAllOrders);
routes.put("/:id", isAdminAuthenticated, OrdersController.acceptOrder);
routes.delete("/finalize/:id", isAdminAuthenticated, OrdersController.finalizeOrder);

routes.delete("/:id", (req, res, next) => {
    isAdminAuthenticated(req, res, (error) => {
        if (!error) {
            next();
        } else {
            isClientAuthenticated(req, res, next);
        }
    });
}, OrdersController.cancelOrder);



module.exports = routes;

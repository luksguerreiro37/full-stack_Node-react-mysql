const { Router } = require("express");
const routes = Router();

const AuthRoutes = require("./Auth.routes");
const AdminUserRoutes = require("./AdminUsers.routes");
const ClientUserRoutes = require("./ClientUsers.routes")
const ProductRoutes = require("./Products.routes");
const OrderRoutes = require("./Orders.routes");
const CategoryRoutes = require("./Category.routes")

routes.use("/auth", AuthRoutes);
routes.use("/adm", AdminUserRoutes);
routes.use("/client", ClientUserRoutes);
routes.use("/product", ProductRoutes);
routes.use("/order", OrderRoutes);
routes.use("/category", CategoryRoutes);

module.exports = routes;
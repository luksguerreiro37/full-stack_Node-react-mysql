const { Router } = require("express");
const routes = Router();

const ProductsController = require("../controllers/Products.controller");
const isAdminAuthenticated = require("../middlewares/isAdminAuthenticated");
const isClientAuthenticated = require("../middlewares/isClientAuthenticated");

routes.post("", isAdminAuthenticated, ProductsController.createProduct);
routes.put("/:id", isAdminAuthenticated, ProductsController.updateProduct);
routes.put("/forsale/:id", ProductsController.toggleProductForSale);
routes.delete("/:id", isAdminAuthenticated, ProductsController.deleteProduct);

routes.get("", isAdminAuthenticated, ProductsController.getAllProducts);
routes.get("/forsale", isClientAuthenticated, ProductsController.getProductsForSale);

routes.get("/:id", isAdminAuthenticated, ProductsController.getProductById);

module.exports = routes;

const { Router } = require("express");
const isAdminAuthenticated = require("../middlewares/isAdminAuthenticated");
const CategoriesController = require("../controllers/Categories.controller");

const routes = Router();

routes.post("", isAdminAuthenticated, CategoriesController.createCategory);
routes.get("", CategoriesController.getAllCategories);
routes.delete("/:id", isAdminAuthenticated, CategoriesController.deleteCategory);




module.exports = routes;

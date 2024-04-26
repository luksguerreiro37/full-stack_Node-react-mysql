const CategoriesService = require("../services/Categories.service");
const AppError = require("../errors/AppError");
const CategorySchemas = require("../schemas/Category/Category.schemas");

class CategoriesController {
    async getAllCategories(req, res) {
        try {
            const categories = await CategoriesService.getAllCategories();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async createCategory(req, res) {
        try {
            const { name } = req.body;

            const isInvalid = CategorySchemas.createCategorySchema(name);
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });
                return res.status(400).json({ message: "Erro de validação", errors });
            }

            const newCategory = await CategoriesService.createCategory({ name });
            return res.status(201).json(newCategory);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.id;
            await CategoriesService.deleteCategory(categoryId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
}

module.exports = new CategoriesController();

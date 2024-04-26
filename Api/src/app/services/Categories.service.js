const AppError = require("../errors/AppError");
const Category = require("../models/Categories");

class CategoriesService {
    async getAllCategories() {
        try {
            const categories = await Category.findAll();
            return categories;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async createCategory(data) {
        let transaction;
        try {
            transaction = await Category.sequelize.transaction();

            const newCategory = await Category.create(data, { transaction });

            await transaction.commit();

            return newCategory;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async deleteCategory(id) {
        let transaction;
        try {
            transaction = await Category.sequelize.transaction();

            const category = await Category.findByPk(id, { transaction });
            if (!category) {
                throw new AppError(404, "Categoria não encontrada!");
            }

            await Category.destroy({ where: { id }, transaction });

            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
}

module.exports = new CategoriesService();

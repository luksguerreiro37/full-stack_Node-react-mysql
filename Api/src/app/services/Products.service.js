const AppError = require("../errors/AppError");
const Products = require("../models/Products");
const Orders = require("../models/Orders");

class ProductsService {
    async findProductById(id){
        const product = await Products.findByPk(id);
        return product;
    }

    async createProduct(name, category, price, stock, description, photoStrings) {
        let transaction;
        try {
            transaction = await Products.sequelize.transaction();

            const productAlreadyExist = await Products.findOne({ where: { name }, transaction });
            if (productAlreadyExist) {
                throw new AppError(409, "Produto já cadastrado!");
            }

            const newProduct = await Products.create({
                name,
                category,
                price,
                stock,
                description,
                photoStrings
            }, { transaction });

            await transaction.commit();

            return newProduct;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async getAllProducts() {
        try {
            const products = await Products.findAll();
            return products;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async deleteProduct(id) {
        let transaction;
        try {
            transaction = await Products.sequelize.transaction();

            const product = await Products.findByPk(id, { transaction });
            if (!product) {
                throw new AppError(404, "Produto não encontrado!");
            }

            await Products.destroy({ where: { id }, transaction });

            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async updateProduct(id, newData) {
        let transaction;
        try {
            transaction = await Products.sequelize.transaction();

            const product = await Products.findByPk(id, { transaction });
            if (!product) {
                throw new AppError(404, "Produto não encontrado!");
            }

            if (newData.photoStrings && newData.photoStrings.length > 0) {
                newData.photoStrings = [...product.photoStrings, ...newData.photoStrings];
            }

            await Products.update(newData, { where: { id }, transaction });

            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async getProductOrders(productId) {
        try {
            const product = await Products.findByPk(productId);
            if (!product) {
                throw new AppError(404, "Produto não encontrado!");
            }

            const orders = await Orders.findAll({ where: { productId } });
            return orders;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async toggleProductForSale(productId) {
        let transaction;
        try {
            transaction = await Products.sequelize.transaction();

            const product = await Products.findByPk(productId, { transaction });
            if (!product) {
                throw new AppError(404, "Produto não encontrado!");
            }

            const updatedProduct = await product.update({ forSale: !product.forSale }, { transaction });

            await transaction.commit();

            return updatedProduct;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async getProductsForSale() {
        try {
            const products = await Products.findAll({ where: { forSale: true } });
            return products;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
}

module.exports = new ProductsService();

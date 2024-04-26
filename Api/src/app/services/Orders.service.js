const AppError = require("../errors/AppError");
const Orders = require("../models/Orders");
const Products = require("../models/Products");
const ClientUsers = require("../models/ClientUsers");

class OrdersService {
    async findOrderById(id) {
        const order = await Orders.findByPk(id);
        return order;
    }

    async getAllOrders() {
        try {
            const orders = await Orders.findAll();
            return orders;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async createOrder(name, quantity, productId, clientUserId, clientName) { 
        let transaction;
        try {
            transaction = await Orders.sequelize.transaction();
    
            const product = await Products.findByPk(productId, { transaction });
            if (!product) {
                throw new AppError(404, "Produto não encontrado!");
            }
    
            if (product.stock < quantity) {
                throw new AppError(400, "Quantidade solicitada maior que o estoque disponível!");
            }
    
            const value = quantity * product.price;
    
            const clientUser = await ClientUsers.findByPk(clientUserId, { transaction });
            if (!clientUser) {
                throw new AppError(404, "Usuário cliente não encontrado!");
            }
    
            const newOrder = await Orders.create({
                name,
                value,
                quantity,
                productId,
                clientUserId,
                clientName 
            }, { transaction });
    
            await Products.update({ stock: product.stock - quantity }, { where: { id: productId }, transaction });
    
            await transaction.commit();
    
            return newOrder;
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
    

    async updateOrder(id, newData) {
        let transaction;
        try {
            transaction = await Orders.sequelize.transaction();

            const order = await Orders.findByPk(id, { transaction });
            if (!order) {
                throw new AppError(404, "Ordem não encontrada!");
            }

            await Orders.update(newData, { where: { id }, transaction });

            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async cancelOrder(id) {
        let transaction;
        try {
            transaction = await Orders.sequelize.transaction();

            const order = await Orders.findByPk(id, { transaction });
            if (!order) {
                throw new AppError(404, "Ordem não encontrada!");
            }

            await Products.increment('stock', { by: order.quantity, where: { id: order.productId }, transaction });

            await Orders.destroy({ where: { id }, transaction });

            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async acceptOrder(id) {
        let transaction;
        try {
            transaction = await Orders.sequelize.transaction();

            const order = await Orders.findByPk(id, { transaction });
            if (!order) {
                throw new AppError(404, "Ordem não encontrada!");
            }

            await Orders.update({ accepted: true }, { where: { id }, transaction });

            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async deleteAcceptedOrder(id) {
        let transaction;
        try {
            transaction = await Orders.sequelize.transaction();
    
            const order = await Orders.findByPk(id, { transaction });
            if (!order) {
                throw new AppError(404, "Ordem não encontrada!");
            }
    
            if (!order.accepted) {
                throw new AppError(400, "Esta ordem não foi aceita e não pode ser excluída!");
            }
    
            await Orders.destroy({ where: { id }, transaction });
    
            await transaction.commit();
        } catch (error) {
            if (transaction) await transaction.rollback();
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
}

module.exports = new OrdersService();

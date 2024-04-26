const chalk = require("chalk");
const OrderSchemas = require("../schemas/Order/Order.schemas");
const OrdersService = require("../services/Orders.service");
const AppError = require("../errors/AppError");
const ClientUsers = require("../models/ClientUsers");

class OrdersController {
    async createOrder(req, res) {
        try {
            const { name, quantity, productId, clientUserId } = req.body;
            
            const clientUser = await ClientUsers.findByPk(clientUserId);
            if (!clientUser) {
                throw new AppError(404, "Usuário cliente não encontrado!");
            }
            const clientName = clientUser.name;
            
            const isInvalid = OrderSchemas.createOrderSchema(name, quantity);
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });
    
                return res.status(400).json({ message: "Erro de validação", errors });
            }
            
            const response = await OrdersService.createOrder(
                name,
                quantity,
                productId,
                clientUserId,
                clientName
            );
            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
    
    
    async getAllOrders(req, res) {
        try {
            const orders = await OrdersService.getAllOrders();
            return res.status(200).json(orders);
        } catch(error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async cancelOrder(req, res) {
        try {
            const orderId = req.params.id;
            await OrdersService.cancelOrder(orderId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async acceptOrder(req, res) {
        try {
            const orderId = req.params.id;
            await OrdersService.acceptOrder(orderId);
            return res.status(200).json({ message: "Pedido aceito com sucesso" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async finalizeOrder(req, res) {
        try {
            const orderId = req.params.id;
            await OrdersService.deleteAcceptedOrder(orderId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
}

module.exports = new OrdersController();

const chalk = require("chalk");
const UserSchemas = require("../schemas/User/User.schemas");
const ClientUsersService = require("../services/ClientUsers.service");
const AppError = require("../errors/AppError");

class ClientUsersController {
    async createUser(req, res) {
        try {
            const { mail, password, name, photoString } = req.body;
            const isInvalid = UserSchemas.createUserSchema(
                mail,
                password,
                name,
                photoString
            );
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });

                return res.status(400).json({ message: "Erro de validação", errors });
            }
            const response = await ClientUsersService.createUser(
                mail,
                password,
                name,
                photoString
            );
            return res.status(201).json(response);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message })
        }
    }
    
    async getUserDataTokenBased(req, res) {
        try {
            const userId = req.userId;
            const userData = await ClientUsersService.findUserById(userId);
            return res.status(200).json(userData);
        } catch(error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.userId;
            await ClientUsersService.deleteUser(userId);
            return res.status(204).send();
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.userId;
            const { mail, password, name, photoString } = req.body;
            
            const isInvalid = UserSchemas.createUserSchema(
                mail,
                password,
                name,
                photoString
            );
    
            if (isInvalid) {
                const errors = {};
                Object.entries(isInvalid).forEach(([field, errorMessages]) => {
                    errors[field] = errorMessages.join(", ");
                });
                
                return res.status(400).json({ message: "Erro de validação", errors });
            }
    
            const updatedUser = await ClientUsersService.updateUser(userId, {
                mail,
                password,
                name,
                profilePhoto: photoString
            });
    
            console.log(chalk.blue(updatedUser));
            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async getAllUserOrders(req, res) {
        try {
            const userId = req.params.userId;
            const orders = await ClientUsersService.getAllUserOrders(userId);
            return res.status(200).json(orders);
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }
}

module.exports = new ClientUsersController();

const chalk = require("chalk");
const UserSchemas = require("../schemas/User/User.schemas");
const AdminUsersService = require("../services/AdminUsers.service");
const AppError = require("../errors/AppError");

class AdminUsersController {
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
            const response = await AdminUsersService.createUser(
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
            const userData = await AdminUsersService.findUserById(userId);
            return res.status(200).json(userData);
        } catch(error) {
            return res.status(error.statusCode || 500).json({ message: error.message || "Erro interno do servidor" });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.userId;
            await AdminUsersService.deleteUser(userId);
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
    
            const updatedUser = await AdminUsersService.updateUser(userId, {
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
}

module.exports = new AdminUsersController();

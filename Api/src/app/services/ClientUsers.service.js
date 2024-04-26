const AppError = require("../errors/AppError");
const ClientUsers = require("../models/ClientUsers");
const Orders = require("../models/Orders");

class ClientUsersService {
    async findUserById(id){
        const user = await ClientUsers.findByPk(id);
        return user;
    }
    
    async findUserByMail(mail){
        const user = await ClientUsers.findOne({ where: { mail } });
        return user;
    }

    async createUser(mail, password, name, photoString) {
        try {
            const userAlreadyExist = await this.findUserByMail(mail);
            if (userAlreadyExist) {
                throw new AppError(409, "Email já cadastrado!");
            }

            const profilePhoto = photoString;

            await ClientUsers.create({
                mail,
                password,
                name,
                profilePhoto
            });
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async updateUser(id, newData) {
        try {
            const user = await ClientUsers.findByPk(id);
            
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }
    
            await user.update(newData);
    
            return user;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
    

    async deleteUser(id) {
        try {
            const user = await ClientUsers.findByPk(id);
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }

            await ClientUsers.destroy({ where: { id } });
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async updateUserPassword(id, newPassword) {
        try {
            const user = await ClientUsers.findByPk(id);
            
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }
    
            user.password = newPassword;
            await user.save();
    
            return user;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async getAllUserOrders(userId) {
        try {
            const user = await ClientUsers.findByPk(userId);
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }

            const orders = await Orders.findAll({ where: { clientUserId: userId } });
            return orders;
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }
}

module.exports = new ClientUsersService();

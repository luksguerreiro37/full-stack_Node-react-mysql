const AppError = require("../errors/AppError");
const AdminUsers = require("../models/AdminUsers");

class AdminUsersService {
    async findUserById(id){
        const user = await AdminUsers.findByPk(id);
        return user;
    }
    
    async findUserByMail(mail){
        const user = await AdminUsers.findOne({ where: { mail } });
        return user;
    }

    async createUser(mail, password, name, photoString) {
        try {
            const userAlreadyExist = await this.findUserByMail(mail);
            if (userAlreadyExist) {
                throw new AppError(409, "Email já cadastrado!");
            }

            const profilePhoto = photoString;

            await AdminUsers.create({
                mail,
                password,
                name,
                profilePhoto
            });

            return "Usuário Admin criado com sucesso";
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async updateUser(id, newData) {
        try {
            const user = await AdminUsers.findByPk(id);
            
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
            const user = await AdminUsers.findByPk(id);
            if (!user) {
                throw new AppError(404, "Usuário não encontrado!");
            }

            await AdminUsers.destroy({ where: { id } });
        } catch (error) {
            throw new AppError(error.statusCode || 500, error.message || "Erro interno do servidor");
        }
    }

    async updateUserPassword(id, newPassword) {
        try {
            const user = await AdminUsers.findByPk(id);
            
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
}

module.exports = new AdminUsersService();

const AdminUsersService = require("../services/AdminUsers.service");
const ClientUsersService = require("../services/ClientUsers.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

class AuthController {
    async loginAdmin(req, res) {
        try {
            const { mail, password } = req.body;

            const adminUser = await AdminUsersService.findUserByMail(mail);
            if (!adminUser) {
                throw new AppError(401, "Email não cadastrado!");
            }

            const passwordMatch = await bcrypt.compare(password, adminUser.password);
            if (!passwordMatch) {
                throw new AppError(401, "Senha não corresponde a este email!");
            }

            const token = jwt.sign({ id: adminUser.id, userType: 'admin' }, process.env.JWT_SECRET, {
                expiresIn: '1h' 
            });

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async loginClient(req, res) {
        try {
            const { mail, password } = req.body;

            const clientUser = await ClientUsersService.findUserByMail(mail);
            if (!clientUser) {
                throw new AppError(401, "Email não cadastrado!");
            }

            const passwordMatch = await bcrypt.compare(password, clientUser.password);
            if (!passwordMatch) {
                throw new AppError(401, "Senha não corresponde a este email");
            }

            const token = jwt.sign({ id: clientUser.id, userType: 'client' }, process.env.JWT_SECRET, {
                expiresIn: '1h' 
            });

            return res.status(200).json({ token });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();

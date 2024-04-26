const AdminUsersService = require("../services/AdminUsers.service");
const ClientUsersService = require("../services/ClientUsers.service");
const EmailService = require("../services/Email.service");
const AppError = require("../errors/AppError");

class EmailController {
    async sendRecoveryCodeAdmin(req, res) {
        try {
            const { email } = req.body;

            const adminUser = await AdminUsersService.findUserByMail(email);
            if (!adminUser) {
                throw new AppError(404, "AdminUser não encontrado");
            }

            const recoveryCode = EmailService.generateRandomCode();

            adminUser.recoveryCode = recoveryCode;
            await adminUser.save();

            await EmailService.sendEmailRecoveryCode(email, recoveryCode);

            return res.status(200).json({ message: "Código de recuperação enviado com sucesso" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async updatePasswordWithRecoveryCodeAdmin(req, res) {
        try {
            const { email, recoveryCode, newPassword } = req.body;

            const adminUser = await AdminUsersService.findUserByMail(email);
            if (!adminUser) {
                throw new AppError(404, "AdminUser não encontrado");
            }

            if (adminUser.recoveryCode !== recoveryCode) {
                throw new AppError(400, "Código de recuperação inválido");
            }

            await AdminUsersService.updateUserPassword(adminUser.id, newPassword);

            adminUser.recoveryCode = null;
            await adminUser.save();

            return res.status(200).json({ message: "Senha atualizada com sucesso" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async sendRecoveryCodeClient(req, res) {
        try {
            const { email } = req.body;

            const clientUser = await ClientUsersService.findUserByMail(email);
            if (!clientUser) {
                throw new AppError(404, "ClientUser não encontrado");
            }

            const recoveryCode = EmailService.generateRandomCode();

            clientUser.recoveryCode = recoveryCode;
            await clientUser.save();

            await EmailService.sendEmailRecoveryCode(email, recoveryCode);

            return res.status(200).json({ message: "Código de recuperação enviado com sucesso" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }

    async updatePasswordWithRecoveryCodeClient(req, res) {
        try {
            const { email, recoveryCode, newPassword } = req.body;

            const clientUser = await ClientUsersService.findUserByMail(email);
            if (!clientUser) {
                throw new AppError(404, "ClientUser não encontrado");
            }

            if (clientUser.recoveryCode !== recoveryCode) {
                throw new AppError(400, "Código de recuperação inválido");
            }

            await ClientUsersService.updateUserPassword(clientUser.id, newPassword);

            clientUser.recoveryCode = null;
            await clientUser.save();

            return res.status(200).json({ message: "Senha atualizada com sucesso" });
        } catch (error) {
            return res.status(error.statusCode || 500).json({ message: error.message });
        }
    }
}

module.exports = new EmailController();

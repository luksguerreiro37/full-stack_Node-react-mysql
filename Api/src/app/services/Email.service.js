const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    generateRandomCode() {
        return Math.floor(10000 + Math.random() * 90000);
    }

    async sendEmailRecoveryCode(email, code) {
       try {
            const recoveryCode = code;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Código de Recuperação de Senha',
                text: `Seu código de recuperação de senha é: ${recoveryCode}`
            };

            await this.transporter.sendMail(mailOptions);
            console.log('E-mail de recuperação de senha enviado com sucesso!');

            return recoveryCode;
        } catch (error) {
            console.error('Erro ao enviar e-mail de recuperação de senha:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();

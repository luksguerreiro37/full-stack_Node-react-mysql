const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

class AdminUsers extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                mail: DataTypes.STRING,
                password: DataTypes.STRING,
                name: DataTypes.STRING,
                profilePhoto: DataTypes.STRING,
                recoveryCode: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    defaultValue: null
                }
            },
            {
                sequelize,
            }
        );

        this.addHook("beforeSave", async (user) => {
            user.password = await bcrypt.hash(user.password, 8);
        });

        this.addHook("beforeUpdate", (user, options) => {
            if (options && options.fields && options.fields.includes("id")) {
                throw new Error("Requisição inválida");
            }
        });
    }
}

module.exports = AdminUsers;

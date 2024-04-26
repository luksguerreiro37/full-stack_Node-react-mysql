const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const Orders = require("./Orders");

class ClientUsers extends Model {
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

        this.addHook("beforeSave", async (clientUser) => {
            clientUser.password = await bcrypt.hash(clientUser.password, 8);
        });

        this.addHook("beforeUpdate", (clientUser, options) => {
            if (options && options.fields && options.fields.includes("id")) {
                throw new Error("Requisição inválida");
            }
        });

        this.hasMany(Orders, { foreignKey: "clientUserId", as: "orders", onDelete: "CASCADE" });
    }
}

module.exports = ClientUsers;

const { Sequelize, Model, DataTypes } = require("sequelize");

class Orders extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                name: DataTypes.STRING,
                value: DataTypes.DECIMAL(10, 2),
                quantity: DataTypes.INTEGER,
                accepted: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                clientName: DataTypes.STRING
            },
            {
                sequelize,
            }
        );
    }
}

module.exports = Orders;

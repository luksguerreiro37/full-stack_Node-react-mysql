const { Sequelize, Model, DataTypes } = require("sequelize");

class Categories extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                name: DataTypes.STRING,
            },
            {
                sequelize,
            }
        );
    }
}

module.exports = Categories;

const { Sequelize, Model, DataTypes } = require("sequelize");
const Orders = require("./Orders");

class Products extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true
                },
                photoStrings: DataTypes.STRING,
                name: DataTypes.STRING,
                category: DataTypes.STRING,
                price: DataTypes.DECIMAL(10, 2),
                stock: DataTypes.INTEGER,
                description: DataTypes.TEXT,
                forSale: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true
                },
            },
            {
                sequelize,
            }
        );

        this.hasMany(Orders, { foreignKey: "productId", as: "orders", onDelete: "CASCADE" });
    }
}

module.exports = Products;

const sequelize = require("sequelize");

const connectionDatabase = require("../config/database");

const AdminUser = require("../app/models/AdminUsers");
const ClientUser = require("../app/models/ClientUsers")
const Product = require("../app/models/Products");
const Order = require("../app/models/Orders");
const Category = require("../app/models/Categories");

const models = [AdminUser, Order, Product, ClientUser, Category];

class Database {
    constructor(){
        this.init();
    }

    init(){
        this.connection = new sequelize(connectionDatabase);
        models.map(model => model.init(this.connection));
        models.map(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
        this.connection.sync();
    }
}

module.exports = new Database()
require("dotenv").config();

module.exports = {
    dialect: "mysql",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,

    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
};
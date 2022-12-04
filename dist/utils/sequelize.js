"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const users_1 = require("../models/users");
const servers_1 = require("../models/servers");
exports.sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_BASE,
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    models: [users_1.Users, servers_1.Servers],
});

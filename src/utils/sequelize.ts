import { Sequelize } from 'sequelize-typescript';
import { Users } from "../models/users";
import { Servers } from "../models/servers";

export const sequelize = new Sequelize({
    database: process.env.DB_BASE,
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    models: [Users, Servers],
});

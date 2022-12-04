"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersByCliente = void 0;
const users_1 = require("../../../models/users");
const http_status_codes_1 = require("http-status-codes");
const jet_logger_1 = __importDefault(require("jet-logger"));
const usersByCliente = async (req, res) => {
    try {
        let users = await users_1.Users.findAll({
            where: {
                server_id: req.auth?.id,
                cliente_id: req.params.cliente_id
            }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            data: users
        });
    }
    catch (e) {
        jet_logger_1.default.err(e);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
};
exports.usersByCliente = usersByCliente;

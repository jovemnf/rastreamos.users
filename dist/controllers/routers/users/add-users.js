"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUsers = void 0;
const jet_logger_1 = __importDefault(require("jet-logger"));
const users_1 = require("../../../models/users");
const http_status_codes_1 = require("http-status-codes");
const addUsers = async (req, res) => {
    try {
        jet_logger_1.default.info(req.body, true);
        if (!req.body.cliente_id) {
            return res.status(http_status_codes_1.StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not cliente_id',
            });
        }
        if (!req.body.login_id) {
            return res.status(http_status_codes_1.StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not login_id',
            });
        }
        if (!req.body.empresa_id) {
            return res.status(http_status_codes_1.StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not empresa_id',
            });
        }
        if (!req.body.username) {
            return res.status(http_status_codes_1.StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not username',
            });
        }
        let userExist = await users_1.Users.findOne({
            where: {
                username: req.body.username,
                login_id: req.body.login_id,
                server_id: req.auth?.id
            }
        });
        if (userExist) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                message: 'add user',
                data: userExist
            });
        }
        let user = await users_1.Users.create({
            server_id: req.auth?.id,
            cliente_id: req.body.cliente_id,
            login_id: req.body.login_id,
            empresa_id: req.body.empresa_id,
            username: req.body.username
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'add user',
            data: user
        });
    }
    catch (e) {
        jet_logger_1.default.err(e);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
};
exports.addUsers = addUsers;

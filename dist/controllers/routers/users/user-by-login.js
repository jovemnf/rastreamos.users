"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userByLogin = void 0;
const users_1 = require("../../../models/users");
const http_status_codes_1 = require("http-status-codes");
const jet_logger_1 = __importDefault(require("jet-logger"));
const userByLogin = async (req, res) => {
    try {
        let user = await users_1.Users.findOne({
            where: {
                server_id: req.auth?.id,
                login_id: req.params.login_id
            }
        });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: 'not found',
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
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
exports.userByLogin = userByLogin;

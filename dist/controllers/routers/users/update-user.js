"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const users_1 = require("../../../models/users");
const http_status_codes_1 = require("http-status-codes");
const jet_logger_1 = __importDefault(require("jet-logger"));
const updateUser = async (req, res) => {
    try {
        let user = await users_1.Users.findOne({
            where: {
                login_id: req.params.id,
                server_id: req.auth?.id
            }
        });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: 'not found',
            });
        }
        await user.update({
            server_id: req.auth?.id,
            cliente_id: req.body.cliente_id,
            login_id: req.body.login_id,
            empresa_id: req.body.empresa_id,
            username: req.body.username
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'update_called',
        });
    }
    catch (e) {
        jet_logger_1.default.err(e);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
};
exports.updateUser = updateUser;

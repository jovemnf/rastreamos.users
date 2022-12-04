"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const users_1 = require("../../../models/users");
const http_status_codes_1 = require("http-status-codes");
const jet_logger_1 = __importDefault(require("jet-logger"));
const deleteUser = async (req, res) => {
    try {
        await users_1.Users.destroy({
            where: {
                login_id: req.params.id,
                server_id: req.auth?.id
            }
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'deleted',
        });
    }
    catch (e) {
        jet_logger_1.default.err(e);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
};
exports.deleteUser = deleteUser;

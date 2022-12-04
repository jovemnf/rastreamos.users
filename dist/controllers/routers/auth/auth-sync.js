"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSync = void 0;
const jet_logger_1 = __importDefault(require("jet-logger"));
const http_status_codes_1 = require("http-status-codes");
const servers_1 = require("../../../models/servers");
const jwt = require('jsonwebtoken');
const authSync = async (req, res) => {
    try {
        jet_logger_1.default.info(JSON.stringify(req.headers));
        let access_key = req.headers['accesskey'];
        if (!access_key) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: 'accesskey'
            });
        }
        let uuid = req.headers['token'];
        if (!uuid) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: 'token'
            });
        }
        let server = await servers_1.Servers.findOne({
            where: {
                access_key,
                uuid
            }
        });
        let token = jwt.sign({
            id: server?.id
        }, process.env.APP_KEY, { expiresIn: '1h' });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'auth',
            token
        });
    }
    catch (e) {
        jet_logger_1.default.err(e);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
};
exports.authSync = authSync;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appAuth = void 0;
const jet_logger_1 = __importDefault(require("jet-logger"));
const users_1 = require("../../../models/users");
const http_status_codes_1 = require("http-status-codes");
const servers_1 = require("../../../models/servers");
const axios_1 = __importDefault(require("axios"));
const appAuth = async (req, res) => {
    try {
        jet_logger_1.default.info(JSON.stringify(req.body));
        let user = await users_1.Users.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                code: 401,
            });
        }
        let server = await servers_1.Servers.findByPk(user.server_id);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                code: 401,
            });
        }
        axios_1.default
            .post(String(server?.url_api_mobile) + '/api/app/login/v3', req.body)
            .then((response) => {
            if (process.env.NODE_ENV != 'production') {
                jet_logger_1.default.err(JSON.stringify(response.data));
            }
            response.data.api_url = server?.url_api_mobile;
            return res.status(http_status_codes_1.StatusCodes.OK).json(response.data);
        })
            .catch((e) => {
            if (process.env.NODE_ENV != 'production') {
                jet_logger_1.default.err(e);
            }
            res.sendStatus(http_status_codes_1.StatusCodes.UNAUTHORIZED);
        });
    }
    catch (e) {
        jet_logger_1.default.err(e);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
};
exports.appAuth = appAuth;

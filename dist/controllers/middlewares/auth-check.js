"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCheck = void 0;
const http_status_codes_1 = require("http-status-codes");
const jwt = require('jsonwebtoken');
const authCheck = async (req, res, next) => {
    try {
        let access_key = req.headers['accesskey'];
        if (!access_key) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: 'accesskey'
            });
        }
        let auth = req.headers['authorization'];
        if (!auth) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: 'authorization'
            });
        }
        let token = jwt.verify(auth, process.env.APP_KEY);
        if (!token) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                message: 'token error'
            });
        }
        // @ts-ignore
        req.auth = token;
        next();
    }
    catch (e) {
        return res.status(401).json({
            code: 401
        });
    }
};
exports.authCheck = authCheck;

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IAuthTokenDecoded } from "../../interfaces/i-auth-token-decoded";
const jwt = require('jsonwebtoken');

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let access_key = req.headers['accesskey'];

        if (! access_key) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'accesskey'
            });
        }

        let auth = req.headers['authorization'];

        if (! auth) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'authorization'
            });
        }

        let token = jwt.verify(auth, process.env.APP_KEY) as IAuthTokenDecoded;

        if (! token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'token error'
            });
        }

        // @ts-ignore
        req.auth = token;

        next();
    } catch (e) {
        return res.status(401).json({
            code: 401
        });
    }
}

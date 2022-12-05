import { SecureRequest } from "../../../utils/secure-request";
import { Response } from "express";
import Logger from "jet-logger";
import { Users } from "../../../models/users";
import { StatusCodes } from "http-status-codes";

export const addUsers = async (req: SecureRequest, res: Response) => {
    try {
        Logger.info(req.body, true);

        if (! req.body.login_id) {
            return res.status(StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not login_id',
            });
        }

        if (! req.body.empresa_id) {
            return res.status(StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not empresa_id',
            });
        }

        if (! req.body.username) {
            return res.status(StatusCodes.PAYMENT_REQUIRED).json({
                message: 'not username',
            });
        }

        let userExist = await Users.findOne({
            where: {
                username: req.body.username,
                login_id: req.body.login_id,
                server_id: req.auth?.id
            }
        });

        if (userExist) {
            return res.status(StatusCodes.OK).json({
                message: 'add user',
                data: userExist
            });
        }

        let user = await Users.create({
            server_id: req.auth?.id,
            cliente_id: req.body!.cliente_id,
            login_id: req.body.login_id,
            empresa_id: req.body.empresa_id,
            username: req.body.username
        });

        return res.status(StatusCodes.OK).json({
            message: 'add user',
            data: user
        });
    } catch (e) {
        Logger.err(e);

        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
}

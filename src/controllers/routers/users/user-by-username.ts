import { Users } from "../../../models/users";
import { StatusCodes } from "http-status-codes";
import Logger from "jet-logger";
import { SecureRequest } from "../../../utils/secure-request";
import { Response } from "express";

export const userByUsername = async (req: SecureRequest, res: Response) => {
    try {
        let user = await Users.findOne({
            where: {
                server_id: req.auth?.id,
                username: req.params.username
            }
        });

        if (! user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'not found',
            });
        }

        return res.status(StatusCodes.OK).json({
            data: user
        });
    } catch (e) {
        Logger.err(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
}

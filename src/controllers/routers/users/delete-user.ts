import { Users } from "../../../models/users";
import { StatusCodes } from "http-status-codes";
import Logger from "jet-logger";
import { SecureRequest } from "../../../utils/secure-request";
import { Response } from "express";

export const deleteUser = async (req: SecureRequest, res: Response) => {
    try {
        await Users.destroy({
            where: {
                login_id: req.params.id,
                server_id: req.auth?.id
            }
        })
        return res.status(StatusCodes.OK).json({
            message: 'deleted',
        });
    } catch (e) {
        Logger.err(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
}

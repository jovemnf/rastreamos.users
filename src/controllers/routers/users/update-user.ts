import { Users } from "../../../models/users";
import { StatusCodes } from "http-status-codes";
import Logger from "jet-logger";
import { SecureRequest } from "../../../utils/secure-request";
import { Response } from "express";

export const updateUser = async (req: SecureRequest, res: Response) => {
    try {
        let user = await Users.findOne({
            where: {
                login_id: req.params.id,
                server_id: req.auth?.id
            }
        });

        if (! user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: 'not found',
            });
        }

        await user.update({
            server_id: req.auth?.id,
            cliente_id: req.body!.cliente_id,
            login_id: req.body.login_id,
            empresa_id: req.body.empresa_id,
            username: req.body.username
        })

        return res.status(StatusCodes.OK).json({
            message: 'update_called',
        });
    } catch (e) {
        Logger.err(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
}

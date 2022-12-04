import Logger from "jet-logger";
import { Users } from "../../../models/users";
import { StatusCodes } from "http-status-codes";
import { Servers } from "../../../models/servers";
import axios from "axios";
import { Request, Response } from "express";

export const appAuth = async (req: Request, res: Response) => {
    try {
        Logger.info(JSON.stringify(req.body));

        let user = await Users.findOne({
            where: {
                username: req.body.username
            }
        });

        if (! user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                code: 401,
            });
        }

        let server = await Servers.findByPk(user.server_id);

        if (! user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({
                code: 401,
            });
        }

        axios
            .post(String(server?.url_api_mobile) + '/api/app/login/v3', req.body)
            .then((response) => {
                if (process.env.NODE_ENV != 'production') {
                    Logger.err(JSON.stringify(response.data));
                }
                response.data.api_url = server?.url_api_mobile;
                return res.status(StatusCodes.OK).json(response.data);
            })
            .catch((e) => {
                if (process.env.NODE_ENV != 'production') {
                    Logger.err(e);
                }
                res.sendStatus(StatusCodes.UNAUTHORIZED);
            });

    } catch (e) {
        Logger.err(e);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'error',
        });
    }
}

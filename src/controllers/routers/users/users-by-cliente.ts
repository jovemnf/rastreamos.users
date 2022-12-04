import { Users } from "../../../models/users";
import { StatusCodes } from "http-status-codes";
import { SecureRequest } from "../../../utils/secure-request";
import { Response } from "express";
import Logger from "jet-logger";

export const usersByCliente = async (req: SecureRequest, res: Response) => {
  try {
      let users = await Users.findAll({
          where: {
              server_id: req.auth?.id,
              cliente_id: req.params.cliente_id
          }
      });
      return res.status(StatusCodes.OK).json({
          data: users
      });
  } catch (e) {
      Logger.err(e);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'error',
      });
  }
}

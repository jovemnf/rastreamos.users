import { Request, Response } from "express";
import Logger from "jet-logger";
import { StatusCodes } from "http-status-codes";
import { Servers } from "../../../models/servers";
const jwt = require('jsonwebtoken');

export const authSync = async (req: Request, res: Response) => {
  try {
      Logger.info(JSON.stringify(req.headers));

      let access_key = req.headers['accesskey'];

      if (! access_key) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
              message: 'accesskey'
          });
      }

      let uuid = req.headers['token'];

      if (! uuid) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
              message: 'token'
          });
      }

      let server = await Servers.findOne({
          where: {
              access_key,
              uuid
          }
      });

      let token = jwt.sign({
          id: server?.id
      }, process.env.APP_KEY, { expiresIn: '1h' });

      return res.status(StatusCodes.OK).json({
          message: 'auth',
          token
      });
  } catch (e) {
      Logger.err(e);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'error',
      });
  }
}

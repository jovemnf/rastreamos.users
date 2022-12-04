import { Controller, Get, Post } from "@overnightjs/core";
import Logger from "jet-logger";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Servers } from "../models/servers";

@Controller('api/servers')
export class ServersController {

    @Get('')
    public async all (req: Request, res: Response) {
        try {
            let servers = await Servers.findAll();

            return res.status(StatusCodes.OK).json({
                data: servers,
            });
        } catch (e) {
            Logger.err(e);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'error',
            });
        }
    }

    @Post('')
    public async create (req: Request, res: Response) {

    }

}

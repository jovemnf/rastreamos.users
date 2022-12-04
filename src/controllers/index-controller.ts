import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Servers } from "../models/servers";
import { Users } from "../models/users";

@Controller('')
export class IndexController {

    @Get('')
    public async index(req: Request, res: Response) {
        let servers = await Servers.findAll();
        let arr = [];
        for (let s of servers) {
            arr.push({
                server: s,
                users: await Users.count()
            })
        }
        return res.status(StatusCodes.OK).json({
            message: 'index',
            servers: arr,

        });
    }

}

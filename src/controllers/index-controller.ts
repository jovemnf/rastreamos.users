import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

@Controller('')
export class IndexController {

    @Get('')
    public index(req: Request, res: Response) {
        return res.status(StatusCodes.OK).json({
            message: 'index',
        });
    }

}

import { Controller, Post } from "@overnightjs/core";
import { Request, Response } from "express";
import { appAuth } from "./routers/auth/app-auth";
import { authSync } from "./routers/auth/auth-sync";

@Controller('api/auth')
export class AuthController {

    @Post('')
    public async auth(req: Request, res: Response) {
        await appAuth(req, res);
    }

    @Post('sync')
    public async authSync(req: Request, res: Response) {
        await authSync(req, res);
    }
}

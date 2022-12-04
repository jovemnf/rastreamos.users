import { Controller, Delete, Get, Middleware, Post, Put } from "@overnightjs/core";
import { Response } from "express";
import { authCheck } from "./middlewares/auth-check";
import { SecureRequest } from "../utils/secure-request";
import { addUsers } from "./routers/users/add-users";
import { deleteUser } from "./routers/users/delete-user";
import { updateUser } from "./routers/users/update-user";
import { userByLogin } from "./routers/users/user-by-login";
import { userByUsername } from "./routers/users/user-by-username";
import { usersByCliente } from "./routers/users/users-by-cliente";
import { deleteUserByCliente } from "./routers/users/delete-user-by-cliente";
import { deleteUserByLogin } from "./routers/users/delete-user-by-login";

@Controller('api/users')
export class UsersController {
    @Get(':login_id/login')
    @Middleware([authCheck])
    private async byLogin(req: SecureRequest, res: Response) {
        await userByLogin(req, res);
    }

    @Get(':username/username')
    @Middleware([authCheck])
    private async byUsername(req: SecureRequest, res: Response) {
        await userByUsername(req, res);
    }

    @Get(':cliente_id/client')
    @Middleware([authCheck])
    private async getAll(req: SecureRequest, res: Response) {
        await usersByCliente(req, res);
    }

    @Post()
    @Middleware([authCheck])
    private async add(req: SecureRequest, res: Response) {
        await addUsers(req, res);
    }

    @Put(':id')
    @Middleware([authCheck])
    private async update(req: SecureRequest, res: Response) {
        await updateUser(req, res);
    }

    @Delete(':id')
    @Middleware([authCheck])
    private async delete(req: SecureRequest, res: Response) {
        await deleteUser(req, res);
    }

    @Delete(':cliente_id/client')
    @Middleware([authCheck])
    private async deleteByCliente(req: SecureRequest, res: Response) {
        await deleteUserByCliente(req, res);
    }

    @Delete(':login_id/login')
    @Middleware([authCheck])
    private async deleteByLogin(req: SecureRequest, res: Response) {
        await deleteUserByLogin(req, res);
    }
}

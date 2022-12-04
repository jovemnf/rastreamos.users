import { Request } from "express";
import { IAuthTokenDecoded } from "../interfaces/i-auth-token-decoded";

export interface SecureRequest extends Request {
    auth: IAuthTokenDecoded;
}

import { Request } from "express";
import { IAuthTokenDecoded } from "../interfaces/i-auth-token-decoded";

export class SecureRequest extends Request {
    private _auth: IAuthTokenDecoded | null = null;
    params: any;
    body: any;

    get auth (): IAuthTokenDecoded | null {
        return (this._auth) ? this._auth : null;
    }

    set auth (value) {
        this._auth = value;
    }
}

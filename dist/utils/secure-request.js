"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureRequest = void 0;
class SecureRequest extends Request {
    constructor() {
        super(...arguments);
        this._auth = null;
    }
    get auth() {
        return (this._auth) ? this._auth : null;
    }
    set auth(value) {
        this._auth = value;
    }
}
exports.SecureRequest = SecureRequest;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const core_1 = require("@overnightjs/core");
const auth_check_1 = require("./middlewares/auth-check");
const secure_request_1 = require("../utils/secure-request");
const add_users_1 = require("./routers/users/add-users");
const delete_user_1 = require("./routers/users/delete-user");
const update_user_1 = require("./routers/users/update-user");
const user_by_login_1 = require("./routers/users/user-by-login");
const user_by_username_1 = require("./routers/users/user-by-username");
const users_by_cliente_1 = require("./routers/users/users-by-cliente");
const delete_user_by_cliente_1 = require("./routers/users/delete-user-by-cliente");
const delete_user_by_login_1 = require("./routers/users/delete-user-by-login");
let UsersController = class UsersController {
    async byLogin(req, res) {
        await (0, user_by_login_1.userByLogin)(req, res);
    }
    async byUsername(req, res) {
        await (0, user_by_username_1.userByUsername)(req, res);
    }
    async getAll(req, res) {
        await (0, users_by_cliente_1.usersByCliente)(req, res);
    }
    async add(req, res) {
        await (0, add_users_1.addUsers)(req, res);
    }
    async update(req, res) {
        await (0, update_user_1.updateUser)(req, res);
    }
    async delete(req, res) {
        await (0, delete_user_1.deleteUser)(req, res);
    }
    async deleteByCliente(req, res) {
        await (0, delete_user_by_cliente_1.deleteUserByCliente)(req, res);
    }
    async deleteByLogin(req, res) {
        await (0, delete_user_by_login_1.deleteUserByLogin)(req, res);
    }
};
__decorate([
    (0, core_1.Get)(':login_id/login'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "byLogin", null);
__decorate([
    (0, core_1.Get)(':username/username'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "byUsername", null);
__decorate([
    (0, core_1.Get)(':cliente_id/client'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAll", null);
__decorate([
    (0, core_1.Post)(),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "add", null);
__decorate([
    (0, core_1.Put)(':id'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, core_1.Delete)(':id'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "delete", null);
__decorate([
    (0, core_1.Delete)(':cliente_id/client'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteByCliente", null);
__decorate([
    (0, core_1.Delete)(':login_id/login'),
    (0, core_1.Middleware)([auth_check_1.authCheck]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [secure_request_1.SecureRequest, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteByLogin", null);
UsersController = __decorate([
    (0, core_1.Controller)('api/users')
], UsersController);
exports.UsersController = UsersController;

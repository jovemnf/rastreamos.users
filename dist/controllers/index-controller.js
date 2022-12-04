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
exports.IndexController = void 0;
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const servers_1 = require("../models/servers");
const users_1 = require("../models/users");
let IndexController = class IndexController {
    async index(req, res) {
        let servers = await servers_1.Servers.findAll();
        let arr = [];
        for (let s of servers) {
            arr.push({
                server: {
                    title: s.title,
                    id: s.id
                },
                users: await users_1.Users.count()
            });
        }
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: 'index',
            servers: arr,
        });
    }
};
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IndexController.prototype, "index", null);
IndexController = __decorate([
    (0, core_1.Controller)('')
], IndexController);
exports.IndexController = IndexController;

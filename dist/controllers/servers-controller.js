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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServersController = void 0;
const core_1 = require("@overnightjs/core");
const jet_logger_1 = __importDefault(require("jet-logger"));
const http_status_codes_1 = require("http-status-codes");
const servers_1 = require("../models/servers");
let ServersController = class ServersController {
    async all(req, res) {
        try {
            let servers = await servers_1.Servers.findAll();
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                data: servers,
            });
        }
        catch (e) {
            jet_logger_1.default.err(e);
            return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: 'error',
            });
        }
    }
    async create(req, res) {
    }
};
__decorate([
    (0, core_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServersController.prototype, "all", null);
__decorate([
    (0, core_1.Post)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ServersController.prototype, "create", null);
ServersController = __decorate([
    (0, core_1.Controller)('api/servers')
], ServersController);
exports.ServersController = ServersController;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const core_1 = require("@overnightjs/core");
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const users_controller_1 = require("./controllers/users-controller");
const servers_controller_1 = require("./controllers/servers-controller");
const index_controller_1 = require("./controllers/index-controller");
const sequelize_1 = require("./utils/sequelize");
const servers_1 = require("./models/servers");
const jet_logger_1 = __importDefault(require("jet-logger"));
const auth_controller_1 = require("./controllers/auth-controller");
const users_1 = require("./models/users");
const access_key_generator_1 = require("./utils/access-key-generator");
const logger = require('morgan');
class App extends core_1.Server {
    constructor() {
        super();
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'ejs');
        this.app.use(logger('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(express_1.default.static(path.join(process.cwd(), 'public')));
        this.routers();
        this.loadDatabase().then(() => this.seed()).catch((err) => jet_logger_1.default.err(err));
    }
    routers() {
        super.addControllers([
            new users_controller_1.UsersController(),
            new servers_controller_1.ServersController(),
            new index_controller_1.IndexController(),
            new auth_controller_1.AuthController()
        ]);
    }
    async loadDatabase() {
        await sequelize_1.sequelize.sync({ force: false });
    }
    async seed() {
        if (process.env.NODE_ENV == 'production') {
            return;
        }
        let uuid = 'b9338b66-9d17-4a7e-a015-da0a1c7d4c34';
        let access_key = (0, access_key_generator_1.accessKeyGenerator)();
        let server = await servers_1.Servers.findOne({
            where: {
                uuid
            }
        });
        if (!server) {
            await servers_1.Servers.create({
                uuid,
                access_key,
                title: 'Servidor de Teste',
                url_api_mobile: 'https://mobile-api.rastreamos.app.br'
            });
        }
        let user = await users_1.Users.findOne({
            where: {
                username: 'teste'
            }
        });
        if (!user) {
            await users_1.Users.create({
                username: 'teste',
                server_id: 1,
                cliente_id: 1,
                login_id: 1,
                empresa_id: 1
            });
        }
    }
    start(port) {
        this.app.listen(port, () => {
            console.log('Server listening on port: ' + port);
        });
    }
}
exports.App = App;

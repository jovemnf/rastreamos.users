import { Server } from "@overnightjs/core";

import express from 'express'
import * as path from 'path';
import { UsersController } from "./controllers/users-controller";
import { ServersController } from "./controllers/servers-controller";
import { IndexController } from "./controllers/index-controller";
import { sequelize } from "./utils/sequelize";
import { Servers } from "./models/servers";
import Logger from "jet-logger";
import { AuthController } from "./controllers/auth-controller";
import { Users } from "./models/users";
import { accessKeyGenerator } from "./utils/access-key-generator";
const logger = require('morgan');


export class App extends Server{

  constructor() {
    super();

    this.app.set('views', path.join(__dirname, 'views'));
    this.app.set('view engine', 'ejs');

    this.app.use(logger('dev'));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.static(path.join(process.cwd(), 'public')));

    this.routers();
    this.loadDatabase().then(() => this.seed()).catch((err) => Logger.err(err));
  }

  private routers () {
    super.addControllers([
        new UsersController(),
        new ServersController(),
        new IndexController(),
        new AuthController()
    ]);
  }

  private async loadDatabase() {
    await sequelize.sync({force: false});
  }

  private async seed() {
    if (process.env.NODE_ENV == 'production') {
      return;
    }

    let uuid = 'b9338b66-9d17-4a7e-a015-da0a1c7d4c34';
    let access_key = accessKeyGenerator();
    let server = await Servers.findOne({
      where: {
        uuid
      }
    });

    if (! server ) {
      await Servers.create({
        uuid,
        access_key,
        title: 'Servidor de Teste',
        url_api_mobile: 'https://mobile-api.rastreamos.app.br'
      });
    }

    let user = await Users.findOne({
      where: {
        username: 'teste'
      }
    });

    if (! user) {
      await Users.create({
        username: 'teste',
        server_id: 1,
        cliente_id: 1,
        login_id: 1,
        empresa_id: 1
      });
    }
  }

  public start(port: number) {
    this.app.listen(port, () => {
      console.log('Server listening on port: ' + port);
    })
  }

}

import * as dotenv from 'dotenv'
dotenv.config()

import { App } from "../app";
const port = (Number(process.env.PORT) || 3300);

const server = new App();
server.start(port);

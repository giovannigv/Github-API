import express from "express";
import { env } from "../environment/env";
import router from "./router/router";
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from './swagger.json';
import * as packageJson from '../package.json';

class App{
    public app: express.Application;
    public version = packageJson.version.split('.')

    constructor(){
        this.app = express();
        this.config();
    }

    private config(): void{
        this.app.set("env", env.NODE_ENV);
        this.app.set("port", env.SERVER_PORT);
        this.app.use(`/v${this.version[0]}`,router)
        this.app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.app.listen(env.SERVER_PORT, () => {
            // tslint:disable-next-line:no-console
            console.log(`server started at http://localhost:${env.SERVER_PORT}`);
        });
    }
}

export default new App().app;

import { Server, ServerOptions, createServer, plugins } from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import { repoRoutes } from './routes/repo-routes';

class HubEditor {
    private _instance: Server;
    private _serverOptions: ServerOptions = {};
    private _port = 3000;

    constructor() {
        this._instance = createServer(this._serverOptions);
    }


    public get instance(): Server {
        return this._instance;
    }

    configure() {
        // Todo : Update values for allowHeaders and exposeHeaders
        const corsOptions: corsMiddleware.Options = {
            origins: ['*'],
            allowHeaders: ['*'],
            exposeHeaders: ['*']
        };

        const cors = corsMiddleware(corsOptions);
        this._instance.use(cors.preflight);
        this._instance.use(cors.actual);
        this._instance.use(plugins.queryParser());
        this._instance.use(plugins.bodyParser());
        repoRoutes.applyRoutes(this._instance);
        return this;
    }

    start() {
        this._instance.listen(this._port, this.success.bind(this));
    }

    success() {
        console.log(`Server Running on ${this._port}`);
    }
}

export const HubEditorInstance = new HubEditor();

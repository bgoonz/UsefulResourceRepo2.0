import {
  createServer,
  Next,
  plugins,
  Request,
  Response,
  Server
} from 'restify';
import * as CorsMiddleware from 'restify-cors-middleware';

import { githubDb } from './git/actions';
import { AdminRouter, AdminRouterPrefix } from './routes/admin';
import { CrudRouter, CrudRouterPrefix } from './routes/crud';
import { DataService } from './services/data.service';
import './util/logging';

export class GithubAsJsonServer {
  private server: Server = createServer();
  private CorsMiddlewareOptions: CorsMiddleware.Options = {
    allowHeaders: ['*'],
    exposeHeaders: ['*'],
    origins: ['*']
  };

  constructor() {
    console.log('Getting It');
    const cors = CorsMiddleware.default(this.CorsMiddlewareOptions);
    this.server.pre(cors.preflight);
    this.server.use(cors.actual);

    this.server.use(plugins.bodyParser());
    this.server.use(plugins.queryParser());
  }

  public start() {
    this.configureRoutes();
    console.log('Setting up GitHub Repo');
    const gitSetupSubscription = githubDb.setup().subscribe(
      () => console.green('Success'),
      (...args: string[]) => console.red('Failure', ' ', args),
      () => {
        console.yellow('Git Setup Complete...');
        console.yellow('Caching data...');
        const dataCachingSubscription = DataService.cacheData().subscribe(
          (data: any) => {
            this.server.listen(3000, () =>
              console.log('Server Running on #3000')
            );
          },
          () => console.log('Oops! Something went wrong!'),
          () => {
            dataCachingSubscription.unsubscribe();
            gitSetupSubscription.unsubscribe();
          }
        );
      }
    );
  }

  private configureRoutes() {
    CrudRouter.applyRoutes(this.server, CrudRouterPrefix);
    AdminRouter.applyRoutes(this.server, AdminRouterPrefix);

    this.server.get('/', this.navigateToAdmin);
  }

  private navigateToAdmin(req: Request, res: Response, next: Next) {
    res.redirect('/client/', next);
  }
}

export const githubAsJsonServer = new GithubAsJsonServer();

githubAsJsonServer.start();
